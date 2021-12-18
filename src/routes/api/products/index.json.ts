/** @type {import('@sveltejs/kit').RequestHandler} */
import { getClient } from "$lib/database"

const PRODUCTS_QUERY = `
  SELECT * FROM ecommerce.produto
`

const PRODUCTS_NEW = `
  INSERT INTO ecommerce.produto (nome, especificacao, status) 
  VALUES ($1, $2, $3)
  RETURNING id
`

const PRODUCT_HAS_CATEGORIA = `
  INSERT INTO ecommerce.produto_possui_categoria (categoria_id, produto_id)
  VALUES ($1, $2)
`

export async function get({ params }) {
  const client = await getClient()
  const products = await client.query(PRODUCTS_QUERY)
  
  client.release()

  return {
    status: 200,
    body: {
      data: products.rows
    }
  }
}

export async function post({ body }) {
  const { nome, especificacao, categories_ids } = body 
  const client = await getClient()
  
  await client.query("BEGIN")

  try {
    const product_res = await client.query(
      PRODUCTS_NEW, 
      [nome, especificacao, 'cadastro']
    )
    
    categories_ids.forEach(category_id => {
      return client.query(
        PRODUCT_HAS_CATEGORIA, 
        [category_id, product_res.rows[0].id])
    });

    await Promise.all(categories_ids)

    client.query("COMMIT")
    client.release()

    return { status: 201 }
  } catch (error) {
    client.query("ROLLBACK")
    client.release()
    
    return { 
      status: 500, 
      body: {
        message: error
      } 
    }
  }
}

