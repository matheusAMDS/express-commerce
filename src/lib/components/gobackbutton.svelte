<script lang="ts">
  import { goto } from "$app/navigation"

  export let path = "/products"
</script>

<button on:click={() => goto(path)} class="p-2 rounded-lg hover:bg-gray-300">
  Voltar
</button>