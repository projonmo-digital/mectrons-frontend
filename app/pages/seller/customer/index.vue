<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Customers - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

import ActiveCustomer from '~/components/master-admin/customer/ActiveCustomer.vue'
import InactiveCustomer from '~/components/master-admin/customer/InactiveCustomer.vue'

const selectedTab = ref('active')

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">{{ selectedTab === 'active' ? 'Active Customer' : 'Inactive Customer'}}</h1>
        <!-- <div>
            <button @click="selectedTab = 'active'" :disabled="selectedTab === 'active'" class="bg-primary px-5 py-1 text-white rounded rounded-e-none disabled:bg-orange-300">Active Customer</button>
            <button @click="selectedTab = 'inactive'" :disabled="selectedTab === 'inactive'" class="bg-primary px-5 py-1 text-white rounded rounded-s-none disabled:bg-orange-300">Inactive Customer</button>
        </div> -->
    </div>
    <hr class="my-2">
    <ActiveCustomer v-if="selectedTab === 'active'"></ActiveCustomer>
    <InactiveCustomer v-if="selectedTab === 'inactive'"></InactiveCustomer>
</template>
