<script setup lang="ts">
import SkeletonLoader from '@/components/Common/SkeletonLoader.vue'
import Rating from '@/components/seller/review/Rating.vue'
</script>
<template>
    <SkeletonLoader>
        <div
            class="border relative border-transparent bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden my-5 notranslate">
            <a href="#">
                <img class="h-[200px] w-full object-cover" src="assets/images/dummy-image.jpg" alt="img" />
            </a>
            <span class="w-8 h-8 absolute top-3 left-3 text-gray-300 rounded-full flex justify-center items-center cursor-pointer">
                <Icon name="mdi:heart" class="w-8 h-8">
                </Icon>
            </span>
            <div>
                <div class="flex gap-3 items-center py-2 px-3">
                    <Rating model-value="0"/>
                    <span class="text-gray-700 text-sm">({{ 0 }} Reviews)</span>
                </div>
                <hr>
                <div class="flex items-center px-3 py-2 h-[70px]">
                    <span class="font-bold text-2xl clamp">title</span>
                </div>
                <hr>
                <div class="px-3 py-2">
                    <div class="flex items-center gap-x-1">
                        <span class="text-sm px-1 py-0.5 bg-primary text-white rounded-lg">-{{ 10 }}%</span>
                        <div class="flex items-center flex-wrap gap-x-2">
                            <span class="text-xl font-bold  text-primary">{{ 10 }}</span>
                            <span class="text-lg line-through text-gray-400">BDT 500</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center py-3">
                    <button type="button"
                        class="btn flex items-center rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
                        <div role="status" >
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div class="mx-2">ADD TO CART</div>
                    </button>
                </div>
            </div>
        </div>
    </SkeletonLoader>
</template>