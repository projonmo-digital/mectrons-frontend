<script setup lang="ts">
import SideBar from '@/components/Seller/SideBar.vue'

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
