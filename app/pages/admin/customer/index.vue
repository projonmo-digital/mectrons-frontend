<script setup lang="ts">
import { ref } from 'vue'

import ActiveCustomer from '~/components/Admin/Customer/ActiveCustomer.vue'
import InactiveCustomer from '~/components/Admin/Customer/InactiveCustomer.vue'

definePageMeta({
    middleware: ["auth", "admin"]
})

useHead({
  title: 'Customers - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

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
