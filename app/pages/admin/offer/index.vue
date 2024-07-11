<script setup lang="ts">
import { ref } from 'vue'

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
        <h1 class="text-2xl font-bold">Offer</h1>
    </div>
    <hr class="my-2">
</template>
