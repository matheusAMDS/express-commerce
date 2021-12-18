<script context="module">
  export async function load({ fetch }) {
    const response = await fetch("/api/products.json")
    const { data } = await response.json()

    return {
      props: { 
        products: data
      }
    }
  }
</script>

<script>
  import { goto, prefetch } from "$app/navigation"

  export let products

  const redirectNewProduct = () => {
    goto("/products/new")
  }

  const redirectEditProduct = (id) => {
    goto(`/products/${id}/edit`)
  }

  const removeProduct = async (id) => {
    const response = await fetch(`/api/products/${id}.json`, {
      method: "DELETE"
    })

    if (response.status === 204)
      prefetch("/products")
    else 
      alert("Não foi possível deletar tal produto")
  }
</script>

<main class="container mx-auto my-12">
  <section class="w-full">
    <h1 class="text-5xl font-semibold">
      Todos os produtos
    </h1>
    <button
      class="size-sm bg-black text-white rounded p-2" 
      on:click={redirectNewProduct}
    >
      Novo Produto
    </button>
    <ul class="list-none md:flex flex-row flex-wrap align-center my-8 space-x-4">
      {#each products as product}
        <div class="p-4 rounded border w-80">
          <h2 class="mb-2 text-lg">
            {product.nome}
          </h2>
          <p>{product.status}</p>
          <p>{product.especificacao}</p>
          <div class="mt-4">
            <button
              class="bg-yellow-300 rounded p-1 text-sm" 
              on:click={() => redirectEditProduct(product.id)}
            >
              Editar
            </button>
            <button
              class="bg-red-300 rounded p-1 text-sm" 
              on:click={() => removeProduct(product.id)}
            >
              Remover
            </button>
          </div>
        </div>
      {/each}
    </ul>
  </section>
</main>