<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// state
const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`, { lazy: true })

// methods
const handleMouseOver = (event) => {
    const target = event.currentTarget;
    target.click();
};
const handleMouseLeave = (event) => {
    document.body.click();
};

const categoryByPage = (id) => {
    navigateTo(`/category/${id}`)
}

const onSwiper = (e) => {
    console.log(e)
}
const onSlideChange = (e) => {
    console.log(e)
}

</script>
<template>
    <div class="flex">
        <aside class="lg:block hidden w-[310px]  bg-gray-200">
            <div class="h-full flex justify-center items-center bg-[#EAE5E2] py-4" v-if="pending">
                <Icon name="fluent:spinner-ios-16-filled" class="h-9 w-9 text-primary animate-spin"></Icon>
            </div>
            <div v-if="!pending" class="h-full">
                <div class="flex w-full">
                    <div class="w-full">
                        <div class="w-full flex flex-col gap-2 px-3">
                            <h1 class="text-center text-xl font-bold text-primary my-2">Categories</h1>
                            <DropdownMenu v-for="(i, j) in data.categories">
                                <DropdownMenuTrigger class="w-full" v-if="j <= 4" as-child
                                    @mouseover="handleMouseOver($event)" @mouseleave="handleMouseLeave($event)">
                                    <Button
                                        class=" flex w-full  justify-between rounded-xl h-auto hover:text-white text-sm bg-white text-black">
                                        <span class="font-bold text-start text-wrap w-full text-xs">
                                            {{ i.name }}
                                        </span>
                                        <Icon name="mdi:chevron-right" class="text-xl font-bold"> </Icon>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent class="w-64 ml-[17rem]">
                                    <div v-for="(j, index2) in i.children">
                                        <DropdownMenuSub class="bg-white" v-if="j.children?.length > 0">
                                            <DropdownMenuSubTrigger v-if="j.children">
                                                <div class="text-wrap text-xs">
                                                    {{ j.name }}
                                                </div>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal v-if="j.children?.length > 0">
                                                <DropdownMenuSubContent v-if="!j.children == []" class="bg-white">
                                                    <DropdownMenuItem v-if="j.children"
                                                        v-for="(k, index2) in j.children"><Button
                                                            @click="categoryByPage(k.id)"
                                                            class=" flex justify-between w-full h-auto text-sm bg-white text-black">
                                                            <div class="text-wrap text-xs">
                                                                {{ k.name }}
                                                            </div>

                                                        </Button></DropdownMenuItem>
                                                    <DropdownMenuSeparator />

                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
            <swiper class="flex-1" :modules="[Autoplay]" :autoplay="{ delay: 5000, disableOnInteraction: false, }" :slides-per-view="1" :space-between="0" @swiper="onSwiper" @slideChange="onSlideChange">
                <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
                <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
                <swiper-slide><img src="assets/images/slide.png" alt=""></swiper-slide>
            </swiper>
    </div>
</template>