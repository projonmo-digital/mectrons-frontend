<script setup lang="ts">
import { ref } from 'vue'
import Invoice from '@/components/User/PurchaseHistory/Invoice.vue'

definePageMeta({
    middleware: ["auth", "buyer"]
})

useHead({
  title: 'Purchased history - Mectrons User',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

</script>

<template>
    <Invoice></Invoice>
</template>
