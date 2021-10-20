<script context="module">
  import { dev } from "$app/env"

  export function load() {
    return { redirect: '/products', status: dev ? 302 : 301 }
  }
</script>
