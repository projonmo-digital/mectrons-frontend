<script setup lang="ts">
import { ref } from 'vue'

import PendingOrder from '~/components/master-admin/order/PendingOrder.vue'
import DeliveredOrder from '~/components/master-admin/order/DeliveredOrder.vue'

useHead({
  title: 'Order - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const selectedTab = ref('pending')

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">{{ selectedTab === 'pending' ? 'Order Pending' : 'Order Delivered'}}</h1>
        <div>
            <button @click="selectedTab = 'pending'" :disabled="selectedTab === 'pending'" class="bg-primary px-5 py-1 text-white rounded rounded-e-none disabled:bg-orange-300">Pending Order</button>
            <button @click="selectedTab = 'delivered'" :disabled="selectedTab === 'delivered'" class="bg-primary px-5 py-1 text-white rounded rounded-s-none disabled:bg-orange-300">Delivered</button>
        </div>
    </div>
    <hr class="my-2">
    <PendingOrder v-if="selectedTab === 'pending'"></PendingOrder>
    <DeliveredOrder v-if="selectedTab === 'delivered'"></DeliveredOrder>
</template>
