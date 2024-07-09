<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
interface Props {
    modelValue: any,
    class: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="min-w-[200px]">
        <div>
            <AvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="modelValue.profile_picture" alt="Colm Tuite" />
                <AvatarFallback class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-orange-300 text-white text-[15px] font-medium" :delay-ms="600">
                    {{ modelValue.name.split(' ').map((i: string) => i[0].toUpperCase()).join('') }}
                </AvatarFallback>
            </AvatarRoot>
        </div>
        {{ modelValue.name.split(' ').map((i: string) => i[0].toUpperCase()).join('') }}
        {{ modelValue.name }}
        <!-- <div><span class="font-bold">Seller :</span> {{ modelValue.user.name }}</div>
        <div><span class="font-bold">Price :</span> <span class="text-primary">{{ modelValue.price }} {{ modelValue.currency.symbol }}</span></div>
        <div><span class="font-bold">Category :</span> {{ modelValue.category.name }}</div> -->
    </div>
</template>