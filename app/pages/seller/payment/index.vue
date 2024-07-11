<script lang="ts">
definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Payments - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>
<template>Payment</template>