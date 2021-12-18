<script context='module'>
  export async function load({ fetch }) {
    const response = await fetch("/api/categories.json")
    const { data } = await response.json()

    return {
      props: {
        available_categories: data
      }
    }
  }
</script>

<script>
  import { goto } from "$app/navigation"

  let nome = ''
  let especificacao = ''
  let category_input = ''

  $: categories = category_input.split(",")

  export let available_categories = []

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

    const response = await fetch("/api/products.json", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ nome, especificacao, categories_ids })
    })

    if (response.ok) goto("/products")
  }
</script>

<main class="container mx-auto my-12 ">
  <div>
    <h1 class="text-3xl font-semibold text-center">
      Cadastrar Produto
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
        Cadastrar
      </button>
    </div>
  </form>
</main>
