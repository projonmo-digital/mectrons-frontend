<script setup lang="ts">
import { ref } from 'vue'

import PendingSeller from '~/components/master-admin/seller/PendingSeller.vue'
import ApprovedSeller from '~/components/master-admin/seller/ApprovedSeller.vue'

useHead({
  title: 'Seller - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const selectedTab = ref('pending')

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">{{ selectedTab === 'pending' ? 'Pending Product' : 'Approved Product'}}</h1>
        <div>
            <button @click="selectedTab = 'pending'" :disabled="selectedTab === 'pending'" class="bg-primary px-5 py-1 text-white rounded rounded-e-none disabled:bg-orange-300">Pending</button>
            <button @click="selectedTab = 'approved'" :disabled="selectedTab === 'approved'" class="bg-primary px-5 py-1 text-white rounded rounded-s-none disabled:bg-orange-300">Approved</button>
        </div>
    </div>
    <hr class="my-2">
    <PendingSeller v-if="selectedTab === 'pending'"></PendingSeller>
    <ApprovedSeller v-if="selectedTab === 'approved'"></ApprovedSeller>
</template>
