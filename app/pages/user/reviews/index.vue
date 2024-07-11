<script setup lang="ts">
definePageMeta({
    middleware: ["auth", "user"]
})

useHead({
  title: 'Reviews - Mectrons User',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>
<template>Payment</template>