import { getClient } from "$lib/database"

const CATEGORIES_GET_BY_ID = `
  SELECT * FROM ecommerce.categoria WHERE id = $1;
`

const CATEGORIES_DELETE_BY_ID = `
  DELETE FROM ecommerce.categoria WHERE id = $1;
`

const CATEGORIES_UPDATE_BY_ID = `
  UPDATE ecommerce.categoria 
  SET nome = $2
  WHERE id = $1;
`

export async function get({ params }) {
  const id = Number(params.id)
  const client = await getClient()

  try {
    const response = await client.query(CATEGORIES_GET_BY_ID, [id])
    client.release()

    return {
      status: 200,
      body: {
        data: response.rows[0]
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
  const { nome } = body
  const client = await getClient()

  try {
    await client.query(CATEGORIES_UPDATE_BY_ID, [id, nome])
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

export async function del({ params }) {
  const id = Number(params.id)
  const client = await getClient()

  try {
    await client.query(CATEGORIES_DELETE_BY_ID, [id])
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