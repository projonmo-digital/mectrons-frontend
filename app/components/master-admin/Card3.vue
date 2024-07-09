<script setup>
defineProps({
    icon: String,
    type: String
})

</script>
<template>

    <div class="w-full flex-1  flex flex-col gap-2 shadow-lg h-full p-4 border   rounded-lg  ">
        <div class="flex items-center justify-between">
            <h1 class=" text-[40px]">45</h1>
            <Icon :name="icon" class="text-[70px] text-[#C95E08]"></Icon>

        </div>
        <h1 class="text-[20px] text-slate-400">Total {{ type }}</h1>
        <slot />
    </div>

</template>