
import pg from "pg"

const pool = new pg.Pool({
  database: import.meta.env.VITE_POSTGRES_DATABASE as string,
  user: import.meta.env.VITE_POSTGRES_USER as string,
  password: import.meta.env.VITE_POSTGRES_PASSWORD as string,
  host: import.meta.env.VITE_POSTGRES_HOST as string,
  port: Number(import.meta.env.VITE_POSTGRES_PORT)
})

export async function getClient() {
  const client = await pool.connect()

  return client
}