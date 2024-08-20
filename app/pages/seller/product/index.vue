<script setup lang="ts">
import { ref } from 'vue'
import ApprovedProduct from '~/components/seller/product/ApprovedProduct.vue'
import PendingProduct from '~/components/seller/product/PendingProduct.vue'

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Products - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const selectedTab = ref('pending')
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Products</h1>
        <div>
            <button @click="selectedTab = 'pending'" :disabled="selectedTab === 'pending'" class="bg-primary px-5 py-1 text-white rounded rounded-e-none disabled:bg-orange-300">Pending</button>
            <button @click="selectedTab = 'approved'" :disabled="selectedTab === 'approved'" class="bg-primary px-5 py-1 text-white rounded rounded-s-none disabled:bg-orange-300">Approved</button>
        </div>
    </div>
    <hr class="my-2">
    <PendingProduct  v-if="selectedTab === 'pending'"></PendingProduct>
    <ApprovedProduct  v-if="selectedTab === 'approved'"></ApprovedProduct>
</template>
