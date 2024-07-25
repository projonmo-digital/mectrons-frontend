<template>
    <div class="w-[70px]  h-full p-3 flex items-center">
        <button class="skew bg-primary/40 hover:bg-primary hover:text-white -skew-x-12 text-primary px-1 py-2 font-bold text-sm"
            @click="swiper.slideNext()">
            <Icon name="mdi:chevron-right" class="font-bold text-4xl"></Icon>
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