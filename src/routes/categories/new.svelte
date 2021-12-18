
<script>
  import { goto } from '$app/navigation'

  let nome = ''
  
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log({ nome })
    try {
      const response = await fetch("/api/categories.json", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ nome })
      })

      if (response.status === 201) goto("/categories")
    } catch (error) {
      console.log(error)
    }
  }
</script>

<main class="container mx-auto my-12 ">
  <div>
    <h1 class="text-3xl font-semibold text-center">
      Cadastrar Categoria
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
        type="submit">
        Cadastrar
      </button>
    </div>
  </form>
</main>
