<script setup lang="ts">
import { ref } from 'vue'
import Seller from '~/components/master-admin/seller/Seller.vue'

useHead({
  title: 'Order - Mectrons Admin',
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
