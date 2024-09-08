<script setup lang="ts">
interface Props {
    modelValue: any,
    class?: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="flex items-center my-3">
        <Icon name="mdi:star" class="text-xl text-gray-300"
            :class="{ 'text-primary': modelValue >= 1 }"></Icon>
        <Icon name="mdi:star" class="text-xl text-gray-300"
            :class="{ 'text-primary': modelValue >= 2 }"></Icon>
        <Icon name="mdi:star" class="text-xl text-gray-300"
            :class="{ 'text-primary': modelValue >= 3 }"></Icon>
        <Icon name="mdi:star" class="text-xl text-gray-300"
            :class="{ 'text-primary': modelValue >= 4 }"></Icon>
        <Icon name="mdi:star" class="text-xl text-gray-300"
            :class="{ 'text-primary': modelValue >= 5 }"></Icon>
    </div>
</template>