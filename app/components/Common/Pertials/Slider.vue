<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ProductGridSkeleton from '@/components/Skeleton/ProductGridSkeleton.vue'

import Next from './swiper/Next.vue'
import Previous from './swiper/Previous.vue'

import 'swiper/css';
import 'swiper/css/bundle';

import Product from './Product.vue'

interface Props {
    products: any[]
    loading: boolean
}

const props = defineProps<Props>()

const breakpoints = {
    '640': {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    '768': {
        slidesPerView: 3,
        spaceBetween: 20,
    },
    '1024': {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    '1280': {
        slidesPerView: 4,
        spaceBetween: 20,
    },
}

</script>

<template>
    <div class="relative p-3 min-h-[300px]">
        <swiper v-if="!loading" :slidesPerView="1" :spaceBetween="10" :pagination="{ clickable: true }" :breakpoints="breakpoints" :modules="[Navigation]">
            <swiper-slide v-for="(product, index) in products" :key="product">
                <Product :product="product"></Product>
            </swiper-slide>
            <template v-slot:container-start><span><Next class="absolute top-0 left-0 z-10" /></span></template>
            <template v-slot:container-end><span><Previous class="absolute top-0 right-0 z-10" /></span></template>
        </swiper>
        <div v-else>
            <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{ clickable: true }" :breakpoints="breakpoints" :modules="[Navigation]">
                <swiper-slide v-for="(item, index) in 5" :key="item">
                    <ProductGridSkeleton />
                </swiper-slide>
            </swiper>
        </div>
        <div v-if="!products.length && !loading" class="flex flex-col justify-center py-9 items-center">
            <img class="w-96 object-cover opacity-30" src="assets/images/no-item-found.webp" alt="nothing_found" />
            <h1 class="text-xl font-bold text-gray-300">No items found </h1>
        </div>
    </div>
</template>