<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import NavItemsListSkeleton from '@/components/Skeleton/NavItemsListSkeleton.vue'
import 'swiper/css'

// components
import NavItems from '@/components/Common/NavItems.vue'
import { getFileUrl } from '~/helper'

// state
const { categories, loading } = storeToRefs(useAppStore())
const galleryData = ref([])

const mediaType = (url) => {
    if (url.includes('/gallery/image/')) return 'image'
    if (url.includes('/gallery/video/')) return 'video'
}

// methods
const fetchGalleryData = async (params = {}) => {
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/gallery?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json"
            },
        })
        if (response) {
            galleryData.value = response
        }
    } catch (error) {
        console.error(error)
        return []
    }
}

const onSwiper = (e) => {
    // console.log(e)
}
const onSlideChange = (e) => {
    // console.log(e)
}
onMounted(() => {
    fetchGalleryData()
})
</script>
<template>
    <div class="flex">
        <aside class="lg:block hidden w-[310px] bg-gray-200">
            <NavItemsListSkeleton v-if="loading" />
            <div v-if="!loading && categories.length" class="h-full">
                <nav class="nav-side-menu p-5">
                    <NavItems
                        :items="[...categories[0].children, ...categories[1].children, ...categories[2].children]" />
                </nav>
            </div>
        </aside>
        <swiper class="flex-1 bg-blue-300 min-h-[300px] max-h-[520px]" :modules="[Autoplay]"
            :autoplay="{ delay: 5000, disableOnInteraction: false, }" :slides-per-view="1" :space-between="0"
            @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide v-for="(media, index) in galleryData" :key="`media-${index}`">
                <template v-if="mediaType(media) === 'image'">
                    <img class="min-w-full min-h-full object-cover" :src="media ? getFileUrl(media) : ''" />
                </template>
                <template v-if="mediaType(media) === 'video'">
                    <video class="min-w-full min-h-full object-cover" width="100%" muted :src="media ? getFileUrl(media) : ''"
                        autoplay loop></video>
                </template>
            </swiper-slide>
            <!-- <swiper-slide><img class="min-w-full min-h-full object-cover" src="assets/images/slide.png" alt=""></swiper-slide>
            <swiper-slide><img class="min-w-full min-h-full object-cover" src="assets/images/slide.png" alt=""></swiper-slide> -->
        </swiper>
    </div>
</template>