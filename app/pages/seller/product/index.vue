<script setup lang="ts">
import { ref } from 'vue'

import Product from '~/components/seller/product/Product.vue'

useHead({
  title: 'Products - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

definePageMeta({
    middleware: ["auth", "seller"]
})
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Products</h1>
    </div>
    <hr class="my-2">
    <Product></Product>
</template>
