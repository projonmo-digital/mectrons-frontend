<script setup lang="ts">
import { ref } from 'vue'
import Review from '~/components/seller/review/Review.vue'

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
