<script setup lang="ts">
import { ref } from 'vue'

import PendingProduct from '~/components/master-admin/product/PendingProduct.vue'
import ApprovedProduct from '~/components/master-admin/product/ApprovedProduct.vue'

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
    <PendingProduct v-if="selectedTab === 'pending'"></PendingProduct>
    <ApprovedProduct v-if="selectedTab === 'approved'"></ApprovedProduct>
</template>
