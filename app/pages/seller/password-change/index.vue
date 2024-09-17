<script setup lang="ts">
import ChangePassword from '~/components/Common/ChangePassword.vue';

definePageMeta({
  middleware: ["auth", "seller"]
})

</script>

<template>
  <div class="my-5">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">Password change</h1>
    </div>
    <hr class="my-5">
    <div class="w-full max-w-[400px]">
      <ChangePassword />
    </div>
  </div>
</template>
