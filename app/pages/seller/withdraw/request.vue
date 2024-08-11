<script setup lang="ts">
definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Withdraw Request - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>

<template>Request</template>