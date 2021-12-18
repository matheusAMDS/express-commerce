<script context="module">
  export async function load({ fetch }) {
    const url = '/api/categories.json'
    const res = await fetch(url)
    
    if (res.ok) {
      const { data } = await res.json()
      return {
        props: {
          categories: data
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`)
    }
  }
</script>

<script>
  import { goto, prefetch } from "$app/navigation"

  const redirectNewCategory = () => {
    goto("/categories/new")
  }

  const redirectEditCategory = (id) => {
    goto(`/categories/${id}/edit`)
  }
  
  const removeCategory = async (id) => {
    const res = await fetch(`/api/categories/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })

    if (!res.ok) 
      alert("Não foi possível deletar a categoria!")
    else 
      prefetch("/categories")
  }
  export let categories = []
</script>

<main class="container mx-auto my-12">
  <div class="">
    <h1 class="text-5xl font-semibold text-center">
      Todas as Categorias
    </h1>
    <button 
      class="bg-black text-white rounded p-2" 
      on:click={redirectNewCategory}
    >
      Nova Categoria
    </button>
  </div>
  <section class="flex justify-center space-x-4 my-8">
    {#each categories as category}
      <div class="p-4 rounded border">
        <div class="mb-2 text-lg">
          {category.nome}
        </div>
        <div>
          <button
            class="bg-yellow-300 rounded p-1 text-sm" 
            on:click={() => redirectEditCategory(category.id)}
          >
            Editar
          </button>
          <button
            class="bg-red-300 rounded p-1 text-sm" 
            on:click={() => removeCategory(category.id)}
          >
            Remover
          </button>
        </div>
      </div>
    {/each}
  </section>
</main>