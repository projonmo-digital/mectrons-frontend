<script setup>
defineProps({
    header: String
})
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">{{ header }}</h1>

        </div>
        <hr class="h-[2px] bg-slate-400 mt-4">

    </div>

</template>