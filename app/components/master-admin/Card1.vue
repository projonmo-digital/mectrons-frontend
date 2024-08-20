<script setup>
defineProps({
    icon: String,
    type: String,
    value: Number
})

</script>
<template>
    <div class="w-full flex flex-col gap-2 shadow-lg p-8 border rounded-xl">
        <div class="flex items-center flex-1 justify-between">
            <h1 class="text-6xl font-bold text-gray-700">{{ value || 0 }}</h1>
            <Icon :name="icon" class="text-7xl text-primary"></Icon>
        </div>
        <h1 class="text-[20px] text-gray-700 font-semibold">Total {{ type }}</h1>
        <slot />
    </div>
</template>