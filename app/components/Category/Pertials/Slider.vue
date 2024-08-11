<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import Next from './swiper/Next.vue'
import Previous from './swiper/Previous.vue'

import 'swiper/css';
import 'swiper/css/bundle';

import ListItem from './ListItem.vue'

interface Props {
    items: any[]
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
    <div class="relative p-3 min-h-[200px]">
        <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{ clickable: true }" :breakpoints="breakpoints" :modules="[Navigation]">
            <swiper-slide v-for="(item, index) in items" :key="item">
                <ListItem :item="item" />
            </swiper-slide>
            <template v-slot:container-start><span><Next class="absolute top-0 left-0 z-10" /></span></template>
            <template v-slot:container-end><span><Previous class="absolute top-0 right-0 z-10" /></span></template>
        </swiper>
        <div v-if="loading" class="flex items-center justify-center absolute inset-0 z-50 bg-white/50">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl">
            </Icon>
        </div>
        <div v-if="!items.length && !loading" class="flex items-center absolute inset-0 justify-center">
            No item found yet
        </div>
    </div>
</template>