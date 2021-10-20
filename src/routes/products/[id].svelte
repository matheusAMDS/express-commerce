<script context="module">
  import GoBackButton from "$lib/components/gobackbutton.svelte"
  import productsJSON from "../../../static/products.json"

  export async function load({ page }) {
    const product = productsJSON.data.find(product => {
      return product.id === page.params.id
    })

    return {
      props: { product }
    }
  }
</script>

<script>
  export let product
</script>

<main class="container w-full max-w-5xl mx-auto my-12">
  <GoBackButton/>
  <section class="flex justify-between max-h-90 mx-auto">
    <img 
      src={`/${product.image}`} 
      alt={product.name}
      class="object-contain w-full h-80"
    >
    <div class="w-full">
      <span class="text-blue-600">{product.category}</span>
      <h1 class="text-3xl">{product.name}</h1>
      <span class="text-gray-400">{product.id}</span>
      <div class="mt-4">
        <span class="mr-4">R$ {product.mean_price.toFixed(2)}</span>
        <span class="text-gray-400 text-sm">{product.quantity} unidades</span>
      </div>
    </div>
  </section>
</main>