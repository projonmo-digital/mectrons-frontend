<script setup>
defineProps({
    header: String,
    area: String
})
</script>

<template>

    <div class="flex justify-between p-4">
        <h1 class="text-xl font-bold text-primary">{{ header }}</h1>

    </div>
    <hr :class="`h-[2px] ` + ` ${area}`" />




</template>