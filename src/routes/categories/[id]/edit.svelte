<script context="module">
  
  export async function load({ fetch, page }) {
    const id = page.params.id
    const response = await fetch(`/api/categories/${id}.json`)
    const { data } = await response.json()

    return {
      props: {
        id,
        category: data
      }
    }
  }
</script>

<script>
  import { goto } from '$app/navigation'

  export let id
  export let category = {}

  let nome = category.nome
  
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`/api/categories/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ nome })
      })

      if (response.status === 201) goto("/products")
    } catch (error) {
      console.log(error)
    }
  }

</script>

<main class="container mx-auto my-12 ">
  <div>
    <h1 class="text-3xl font-semibold text-center">
      Atualizar Categoria
    </h1>
  </div>
  <form 
    class="max-w-xl mx-auto my-8 flex flex-col justify-center space-y-3" 
    on:submit={onSubmit}
  >
    <fieldset>
      <input 
        class="w-full border p-2" 
        type="text" 
        placeholder="Nome" 
        bind:value={nome}
      >
    </fieldset>
    <div>
      <button 
        class="w-full border p-2 bg-black text-white"
        type="submit"
      >
        Atualizar 
      </button>
    </div>
  </form>
</main>
