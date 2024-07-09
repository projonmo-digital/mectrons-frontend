<script setup lang="ts">
const props = defineProps({
    product: Array
})
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

const basis = ref('')
if (props.product?.length === 1) {
    basis.value = '1/1'

}
else if (props.product?.length === 2) {
    basis.value = '1/2'

}
else if (props.product?.length === 3) {
    basis.value = '1/3'

}
else {
    basis.value = '1/4'
}

</script>

<template>
    <div class="flex flex-col">

        <div class="flex justify-center w-full flex-1 px-8 lg:px-16">
            <Carousel class="relative flex-1" :opts="{
                align: 'start',
            }">
                <CarouselContent>
                    <CarouselItem :class="'flex justify-center ' + basis" v-for="(i, index) in product">
                        <ProductCard :product="i"></ProductCard>
                    </CarouselItem>

                </CarouselContent>
                <CarouselPrevious class="flex " />
                <CarouselNext />
            </Carousel>
        </div>

    </div>
</template>