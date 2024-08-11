<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// components
import NavItems from '@/components/common/NavItems.vue'

// state
const { categories, loading } = storeToRefs(useAppStore())

// methods
const onSwiper = (e) => {
    // console.log(e)
}
const onSlideChange = (e) => {
    // console.log(e)
}
</script>
<template>
    <div class="flex">
        <aside class="lg:block hidden w-[310px]  bg-gray-200">
            <div class="h-full flex justify-center items-center bg-[#EAE5E2] py-4" v-if="loading">
                <Icon name="fluent:spinner-ios-16-filled" class="h-9 w-9 text-primary animate-spin"></Icon>
            </div>
            <div v-if="!loading && categories.length" class="h-full">
                <nav class="nav-side-menu p-5">
                    <NavItems :items="[...categories[0].children, ...categories[1].children, ...categories[2].children]" />
                </nav>
            </div>
        </aside>
        <swiper class="flex-1" :modules="[Autoplay]" :autoplay="{ delay: 5000, disableOnInteraction: false, }"
            :slides-per-view="1" :space-between="0" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
            <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
            <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
        </swiper>
    </div>
</template>