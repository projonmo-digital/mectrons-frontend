<script setup lang="ts">
import Product from './Product.vue'

interface Props {
    products: any[]
    loading: boolean
}

const props = defineProps<Props>()

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

</script>

<template>
    <div class="flex justify-center items-center py-5 min-h-[300px]">
        <div class="flex justify-center items-center w-[calc(100%-160px)]">
            <Carousel :opts="{ align: 'center' }" class="w-full">
                <template v-if="loading">
                    <div class="flex items-center justify-center">
                        <!-- <div class="absolute inset-0 w-full h-full flex justify-center items-center"> -->
                            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl">
                            </Icon>
                        <!-- </div> -->
                    </div>
                </template>
                <template v-else>
                    <CarouselContent class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 my-5">
                        <CarouselItem v-for="(product, index) in products" :key="product">
                            <Product :product="product"></Product>
                        </CarouselItem>
                    </CarouselContent>
                    <div v-if="!products.length" class="flex justify-center">
                        Empty
                    </div>
                </template>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </div>
</template>