<script setup lang="ts">
import Review from '@/components/Seller/Review/Review.vue'

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Review - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>

<template>
    <Review></Review>
</template>
