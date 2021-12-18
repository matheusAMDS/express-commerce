/** @type {import('@sveltejs/kit').RequestHandler} */
import { getClient } from "$lib/database"

const CATEGORIES_QUERY = `
  SELECT * FROM ecommerce.categoria
`

const CATEGORIES_NEW = `
  INSERT INTO ecommerce.categoria (nome) VALUES ($1)
`

export async function get({ params }) {
  const client = await getClient()
  const categories = await client.query(CATEGORIES_QUERY)
  
  client.release()

  return {
    status: 200,
    body: {
      data: categories.rows
    }
  }
}

export async function post({ body }) {
  const { nome } = body 
  const client = await getClient()
  
  try {
    await client.query(CATEGORIES_NEW, [nome])
    client.release()

    return { status: 201 }
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
