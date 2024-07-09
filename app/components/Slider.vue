<script setup lang="ts">
defineProps({
    product: Array
})
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
</script>

<template>
    <div class="flex flex-col">

        <div class="flex justify-center w-full">
            <Carousel class="relative" :opts="{
                align: 'start',
            }">
                <CarouselContent>
                    <CarouselItem class=" flex justify-center lg:basis-1/4 md:basis-1/2  "
                        v-for="(i, index) in product">
                        <ProductCard :product="i"></ProductCard>
                    </CarouselItem>

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </div>
</template>