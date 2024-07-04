<script setup>
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'

import {
    Button,
} from '@/components/ui/button'
</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex">
            <CategorySideBar></CategorySideBar>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col  ">
                    <h1 class="text-2xl p-4 font-bold text-start">Shop By Categories</h1>
                    <div class="f">
                        <CategoryCaro class="md:w-full w-[400px]"></CategoryCaro>
                    </div>
                </div>
                <div class="">
                    <h4 class=" text-2xl p-4 font-bold">Best Seller Products</h4>
                    <HomeFeaturedProducts></HomeFeaturedProducts>
                </div>
            </div>
        </div>
        <div class=" flex justify-center w-full">
            <div class="flex flex-col gap-8  z-20">
                <div
                    class=" max-w-[800px] lg:h-[71px]   w-full place-content-center   grid grid-cols-2 md:grid-cols-6 p-4 gap-4 bg-primary rounded-2xl ">
                    <select class="h-[35px] rounded h-">
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                    <select class="h-[35px] rounded h-">
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                    <select class="h-[35px] rounded h-">
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                    <select class="h-[35px] rounded h-">
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                    <select class="h-[35px] rounded h-">
                        <option value="" disabled selected>Select your option</option>
                        <option value="hurr">Durr</option>
                    </select>
                    <Button class=" h-[35px] w-16 bg-red-200 ">
                        <Icon class="text-primary text-2xl bg" name="fa:search"></Icon>
                    </Button>

                </div>
                <div class="flex lg:flex-row  flex-col gap-8 lg:text-start text-center justify-between items-center">
                    <div v-for="i in icons" class="flex lg:flex-row flex-col gap-4 items-center">
                        <div class=" h-[68px]">
                            <Icon :name="i.name" class="text-[57px] text-primary"></Icon>
                        </div>
                        <div>
                            <h1 class="font-bold">{{ i.label }}</h1>
                            <p class=" text-slate-400">{{ i.subtext }}</p>
                        </div>

                    </div>

                </div>
                <div class="w-full h-[116px] overflow-hidden">
                    <img src="https://img.freepik.com/free-psd/car-rental-automotive-facebook-cover-template_106176-2473.jpg"
                        class="w-full h-full object-cover">

                </div>
            </div>
        </div>
        <div class="flex lg:flex-row justify-between flex-col">
            <div class="md:block hidden lg:flex flex-col gap-8">
                <div class=" w-[360px] h-[373px] ">
                    <img
                        src="https://img.freepik.com/free-psd/car-rental-instagram-social-media-post-banner_505751-3050.jpg">
                </div>
                <div class=" w-[360px] h-[373px]">
                    <img
                        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cars-design-template-ff53ab6d91a2938b0cbadbc1c00c54e3_screen.jpg?ts=1657693584">
                </div>

            </div>
            <div class=" w-full justify-center">
                <h1 class=" text-2xl font-bold p-4">Other Product</h1>
                <OtherProduct></OtherProduct>
            </div>
        </div>
        <div class="flex justify-center ">

            <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>