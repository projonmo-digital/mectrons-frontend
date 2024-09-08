<script setup lang="ts">
interface Props {
    modelValue: any,
    class: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="min-w-[200px]">
        <p class="font-bold">{{ modelValue.title }}<span class="text-primary"> ({{ modelValue.price }} {{ modelValue.currency.symbol }})</span></p>
        <div><span class="font-bold">Seller :</span> {{ modelValue.user.name }}</div>
        <div><span class="font-bold">Category :</span> {{ modelValue.category.name }}</div>
        <div><span class="font-bold">Stock :</span> {{ modelValue.stock_amount }}</div>
    </div>
</template>