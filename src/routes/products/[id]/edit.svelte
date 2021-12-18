<script context="module">
  export async function load({ fetch, page }) {
    const id = page.params.id
    const response = await fetch(`/api/products/${id}.json`)
    const { data } = await response.json()
    const categories_response = await fetch(`/api/categories.json`)
    const { data: categories } = await categories_response.json()

    return {
      props: {
        id,
        product: data,
        available_categories: categories
      }
    }
  }
</script>

<script>
  import { goto } from '$app/navigation'

  export let id
  export let product = {}
  export let available_categories = []

  let nome = product.nome
  let especificacao = product.especificacao
  let status = product.status
  let category_input = product.categorias.map(x => x.nome).join(",")
  $: categories = category_input.split(",")

  const onSubmit = async (e) => {
    e.preventDefault()

    const categories_ids = categories.map(category => {
      const found = available_categories.find(available => {
        return available.nome === category
      })

      if (!found) {
        alert("Categoria não identificada: " + category)
      } else {
        return found.id
      }
    })

    try {
      const response = await fetch(`/api/products/${id}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
          nome,
          especificacao,
          status,
          categories_ids
        })
      })

      if (response.status === 204) goto("/products")
    } catch (error) {
      console.log(error)
    }
  }

</script>

<main class="container mx-auto my-12 ">
  <div>
    <h1 class="text-3xl font-semibold text-center">
      Atualizar Produto
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
    
    <fieldset>
      <textarea 
        class="w-full border p-2"
        cols="30" rows="10" 
        placeholder="Especificação do produto" 
        bind:value={especificacao}
      />
    </fieldset>

    <fieldset>
      <select bind:value={status}>
        <option value="cadastro">Cadastro</option>
        <option value="venda">Venda</option>
        <option value="cancelado">Cancelado</option>
      </select>
    </fieldset>

    <fieldset>
      <input 
        list="categories"
        class="w-full border p-2" 
        type="text" 
        placeholder="Categoria"
        bind:value={category_input}
      />
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
