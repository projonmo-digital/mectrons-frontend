<script setup lang="ts">
import SideBar from '../components/master-admin/SideBar.vue'

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

// definePageMeta({
//   middleware: [
//     function (to, from) {
//       // Custom inline middleware
//     },
//     'auth',
//   ],
// });

</script>
<template>
    <div class="flex w-full">
        <div class="p-5">
            <SideBar></SideBar>
        </div>
        <div class="flex-1 p-5 pl-0">
            <slot />
        </div>
    </div>
</template>
