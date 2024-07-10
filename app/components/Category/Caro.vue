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

        <div class="flex justify-center w-full">
            <Carousel class="relative w-[70%]" :opts="{
                align: 'start',
            }">
                <CarouselContent>
                    <CarouselItem class=" flex justify-center lg:basis-1/4 md:basis-1/2 b " v-for="(_, index) in 5">
                        <Card class="w-[208px] h-[175px]">
                            <CardContent class="flex w-full h-full text-primary justify-center items-center">
                                <Icon name="mdi:bottle-tonic" class="text-8xl"></Icon>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </div>
</template>
