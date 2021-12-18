import { getClient } from "$lib/database"

const PRODUCTS_GET_BY_ID = `
  SELECT produto.id, produto.nome, produto.especificacao, produto.status, produto_categoria.categoria_id, categoria.nome AS categoria_nome FROM ecommerce.produto AS produto
  INNER JOIN ecommerce.produto_possui_categoria AS produto_categoria
  ON produto_categoria.produto_id = produto.id
  JOIN ecommerce.categoria AS categoria
  ON categoria.id = produto_categoria.categoria_id
  WHERE produto.id = $1;
`

const PRODUCTS_DELETE_BY_ID = `
  DELETE FROM ecommerce.produto WHERE id = $1;
`

const PRODUCTS_UPDATE_BY_ID = `
  UPDATE ecommerce.produto
  SET nome = $2, especificacao = $3, status = $4
  WHERE id = $1;
`

const PRODUCTS_CATEGORIES_DELETE = `
  DELETE FROM ecommerce.produto_possui_categoria 
  WHERE produto_id = $1; 
`

const PRODUCTS_CATEGORIES_INSERT = `
  INSERT INTO ecommerce.produto_possui_categoria (produto_id, categoria_id)
  VALUES ($1, $2)
`

export async function get({ params }) {
  const id = Number(params.id)
  const client = await getClient()

  try {
    const response = await client.query(PRODUCTS_GET_BY_ID, [id])
    client.release()

    const product = {
      id: response.rows[0].id,
      nome: response.rows[0].nome,
      especificacao: response.rows[0].especificacao,
      status: response.rows[0].status,
      categorias: []
    }

    response.rows.forEach(row => {
      product.categorias.push({ 
        id: row.categoria_id,
        nome: row.categoria_nome
      })
    })
    return {
      status: 200,
      body: {
        data: product
      }
    }
  } catch (error) {
    client.release()
    
    return {
      status: 500,
      body: {
        message: error
      }
    }
  }
}
export async function put({ params, body }) {
  const id = Number(params.id)
  const { nome, especificacao, status, categories_ids } = body
  const client = await getClient()

  await client.query("BEGIN")

  try {
    await client.query(
      PRODUCTS_UPDATE_BY_ID,
      [id, nome, especificacao, status]
    )

    await client.query(PRODUCTS_CATEGORIES_DELETE,[id])

    const insert_queries = categories_ids.map(category_id => {
      return client.query(
        PRODUCTS_CATEGORIES_INSERT, 
        [id, category_id])
    })

    await Promise.all(insert_queries)

    client.query("COMMIT")
    client.release()

    return { status: 204 }
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

export async function del({ params }) {
  const id = Number(params.id)
  const client = await getClient()

  try {
    await client.query(PRODUCTS_DELETE_BY_ID, [id])
    client.release()

    return { status: 204 }
  } catch (error) {
    client.release()

    return {
      status: 500,
      body: {
        message: error
      }
    }
  }
}