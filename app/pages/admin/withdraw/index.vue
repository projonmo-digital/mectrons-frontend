<script setup lang="ts">
import { ref } from 'vue'
import Seller from '~/components/master-admin/seller/ApprovedSeller.vue'

definePageMeta({
    middleware: ["auth", "admin"]
})

useHead({
  title: 'Widthdraw - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Seller</h1>
    </div>
    <hr class="my-2">
    <Seller></Seller>
</template>
