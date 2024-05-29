<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'


const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
})
</script>

<template>
  <Carousel class="relative w-full max-w-[100%]" :plugins="[plugin]" @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play(), console.log('Running')];">
    <CarouselContent class=" border w-full">
      <CarouselItem v-for="(_, index) in 5" :key="index">
        <div class="p-1 text-black w-full h-[487px] ">
          <img class=" object-cover w-full h-full"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/40e9cd77967627.5c979a697c97b.png">
          </img>

        </div>
      </CarouselItem>
    </CarouselContent>

  </Carousel>
</template>