<script setup lang="ts">
import { ref, watch } from 'vue'
import Modal from "~/components/common/Modal.vue"

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Withdraw - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const isModalOpen = ref(false)

watch(() => isModalOpen.value, (n, o) => {
  console.log(n);
})

</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold">Withdraw History</h1>
  </div>
  <hr class="my-2">
  <div class="my-5 grid grid-cols-2 gap-5">
    <div
      class="shadow-lg bg-gradient-to-tr from-primary to-orange-900 rounded-xl p-3 text-white flex flex-col items-center">
      <p class="my-3 text-5xl font-bold">{{ pending_balance }} BDT</p>
      <p>Pending balance</p>
    </div>
    <Modal v-model="isModalOpen" title="Make an withdraw request">
      <template #btn>
        <div
          class="border text-primary hover:text-white rounded-lg hover:bg-primary cursor-pointer p-5 flex flex-col gap-3 justify-center items-center shadow-lg">
          <div class="w-16 h-16 rounded-full flex items-center justify-center bg-primary p-2">
            <Icon class="text-white w-10 h-10" name="fa:send" />
          </div>
          <p>Send Withdraw request</p>
        </div>
      </template>
      <template #content>
        <div class="border">Content</div>
      </template>
    </Modal>
  </div>
</template>
