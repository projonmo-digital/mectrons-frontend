<template>
    <div class="w-[70px]  h-full p-3 flex items-center">
        <button class="skew bg-primary/40 text-primary hover:bg-primary hover:text-white -skew-x-12 x-1 py-2 font-bold text-sm" @click="swiper.slidePrev()">
            <Icon name="mdi:chevron-left" class="font-bold text-4xl"></Icon>
        </button>
    </div>
</template>
<script>
import { useSwiper } from 'swiper/vue'

export default {
    setup() {
        const swiper = useSwiper();

        return {
            swiper,
        };
    },
};
</script>