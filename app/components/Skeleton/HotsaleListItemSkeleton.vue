<script setup lang="ts">
import SkeletonLoader from '@/components/Common/SkeletonLoader.vue'
</script>

<template>
    <SkeletonLoader>
        <div class="relative border h-[200px] overflow-hidden">
            <div class="absolute inset-0">
                <img class="h-full w-full object-cover" src="assets/images/dummy-image.jpg" alt="Ads" />
            </div>
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <p class="text-2xl font-bold text-white text-stock">Summer Offer</p>
                <p class="text-sm hidden lg:inline-block font-medium text-stock text-white">Aug 11, 2024 - Aug 11, 2024</p>
                <p class="text-3xl font-bold text-primary text-stock">{{ 30 }}% OFF</p>
            </div>
        </div>
    </SkeletonLoader>
</template>
