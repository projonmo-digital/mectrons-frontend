<script setup lang="ts">
import { ref } from 'vue'
import Catogories from '~/components/master-admin/categories/Catagories.vue'

definePageMeta({
    middleware: ["auth", "admin"]
})

useHead({
  title: 'Offers - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Categories</h1>
    </div>
    <hr class="my-2">
    <Catogories/>
</template>
