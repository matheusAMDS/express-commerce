<script context="module">
  import productsJSON from "../../../static/products.json"

  export async function load({ fetch }) {
    return {
      props: { 
        products: productsJSON.data
      }
    }
  }
</script>

<script>
  export let products
</script>

<main class="container mx-auto my-12">
  <section class="w-full">
    <h1 class="text-5xl font-semibold">
      Em destaque
    </h1>
    <ul class="list-none md:flex flex-row flex-wrap align-center my-8">
      {#each products as product}
        <a 
          href={`/products/${product.id}`} 
          class="rounded hover:shadow-xl w-56 mx-auto md:mx-2 md:my-4"
        >
          <article class="flex flex-col justify-between h-full">
            <img 
              src={`/${product.image}`} 
              alt={product.name}
              class="mx-auto h-full flex-1"
            >
            <div class="p-2 bottom-0">
              <h2 class="text-lg">{product.name}</h2>
              <p class="text-base text-blue-600">{product.category}</p>
              <p class="text-sm text-gray-500">{product.id}</p>
            </div>
          </article>
        </a>
      {/each}
    </ul>
  </section>
</main>