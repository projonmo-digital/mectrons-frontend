<script setup lang="ts">
import { ref } from 'vue'
import PendingReport from '~/components/master-admin/report/PendingReport.vue'
import DoneReport from '~/components/master-admin/report/DoneReport.vue'

useHead({
  title: 'Report - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})
const selectedTab = ref('pending')

</script>

<template>
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">{{ selectedTab === 'pending' ? 'Report Pending' : 'Report Dode'}}</h1>
        <div>
            <button @click="selectedTab = 'pending'" :disabled="selectedTab === 'pending'" class="bg-primary px-5 py-1 text-white rounded rounded-e-none disabled:bg-orange-300">Pending Report</button>
            <button @click="selectedTab = 'done'" :disabled="selectedTab === 'done'" class="bg-primary px-5 py-1 text-white rounded rounded-s-none disabled:bg-orange-300">Done Report</button>
        </div>
    </div>
    <hr class="my-2">
    <PendingReport v-if="selectedTab === 'pending'"></PendingReport>
    <DoneReport v-if="selectedTab === 'done'"></DoneReport>
</template>
