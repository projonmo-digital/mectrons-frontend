<script setup lang="ts">
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
        <HomeFeaturedProducts></HomeFeaturedProducts>
        <div class="flex justify-center w-full">
            <Carousel class="relative w-[70%]" :opts="{
                align: 'start',
            }">
                <CarouselContent>
                    <CarouselItem class=" flex justify-center lg:basis-1/4 md:basis-1/2 b " v-for="(_, index) in 5">
                        <ProductCardMe />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </div>
</template>