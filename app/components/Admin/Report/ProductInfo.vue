<script setup lang="ts">
interface Props {
    modelValue: any,
    class: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="min-w-[200px]">
        <div></div>
        <div>{{ modelValue.title}}</div>
        <div><small class="text-gray-500">{{ modelValue.description}}</small></div>
    </div>
</template>