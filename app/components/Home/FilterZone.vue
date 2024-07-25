<script setup lang="ts">
import Filter from '@/components/common/Filter.vue'

const icons = [
    {
        "name": "mdi:gift-outline",
        "label": "Original Product ",
        "subtext": "Parts from trusted brands"
    },
    {
        "name": "mdi:reply-outline",
        "label": "7 Days Return ",
        "subtext": "Easy replacements"
    },
    {
        "name": "mdi:truck-delivery",
        "label": "Fast Delivery ",
        "subtext": "All over Bangladesh"
    }
]

const store = useUtils()
const upperLeftAds = await store.getAds('Home Page - Upper Left')
const upperRightAds = await store.getAds('Home Page - Upper Right')

// methods
const search = (event: any) => {
    console.log(event);
}
</script>

<template>
    <div class="w-full flex justify-between gap-2">
        <div class="min-w-[310px] w-[310px] h-[285px] lg:block hidden">
            <img v-if="upperLeftAds.type === 'image'" class="w-full h-full object-cover" :src="useRuntimeConfig().public.imageUrl + '/' + upperLeftAds.url.replaceAll('public', 'storage')">
        </div>
        <div class="flex-1 mt-auto lg:-mt-8 z-10">
            <Filter @search="search" />
            <div class="flex flex-col lg:flex-row gap-3">
                <div v-for="i in icons" class="flex flex-col lg:flex-row items-center p-3 gap-3 w-3/1">
                    <div>
                        <Icon :name="i.name" class="text-[57px] text-primary"></Icon>
                    </div>
                    <div class="text-center lg:text-left">
                        <h1 class="font-bold">{{ i.label }}</h1>
                        <p class=" text-slate-400">{{ i.subtext }}</p>
                    </div>
                </div>
            </div>
            <div class="w-full h-[160px] overflow-hidden">
                <img src="https://img.freepik.com/free-psd/car-rental-automotive-facebook-cover-template_106176-2473.jpg"
                    class="w-full h-full object-cover">
            </div>
        </div>
        <div class="min-w-[310px] w-[310px] h-[285px] lg:block hidden">
            <img v-if="upperLeftAds.type === 'image'" class="w-full h-full object-cover" :src="useRuntimeConfig().public.imageUrl + '/' + upperRightAds.url.replaceAll('public', 'storage')">
        </div>
    </div>
</template>