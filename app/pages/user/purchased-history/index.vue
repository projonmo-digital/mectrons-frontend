<script setup lang="ts">
import { ref } from 'vue'
import Product from '~/components/seller/product/ApprovedProduct.vue'

definePageMeta({
    middleware: ["auth", "user"]
})

useHead({
  title: 'Purchased history - Mectrons User',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})


</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Products</h1>
    </div>
    <hr class="my-2">
    <Product></Product>
</template>
