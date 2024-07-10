<script setup lang="ts">
import RequestModal from './RequestModal.vue'

const pending_balance = ref(3200)

</script>

<template>
    <div class="my-5 grid grid-cols-2 gap-5">
        <div
            class="shadow-lg bg-gradient-to-tr from-primary to-orange-900 rounded-xl p-3 text-white flex flex-col items-center">
            <p class="my-3 text-5xl font-bold">{{ pending_balance }} BDT</p>
            <p>Pending balance</p>
        </div>
        <RequestModal />
    </div>
</template>