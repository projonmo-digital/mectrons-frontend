<script setup lang="ts">
interface Props {
    modelValue: any,
    class: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="min-w-[200px]">
        <div><span class="font-bold">Seller :</span> {{ modelValue.user.name }}</div>
        <div><span class="font-bold">Price :</span> <span class="text-primary">{{ modelValue.price }} {{ modelValue.currency.symbol }}</span></div>
        <div><span class="font-bold">Category :</span> {{ modelValue.category.name }}</div>
    </div>
</template>