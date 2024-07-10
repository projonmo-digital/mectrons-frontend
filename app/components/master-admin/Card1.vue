<script setup>
defineProps({
    icon: String,
    type: String
})

</script>
<template>

    <div class="w-full h-full  flex flex-col gap-2 shadow-lg  p-8 border m-2  rounded-xl   ">
        <div class="flex items-center flex-1 justify-between">
            <h1 class=" text-[40px]">45</h1>
            <Icon :name="icon" class="text-[70px] text-[#C95E08]"></Icon>

        </div>
        <h1 class="text-[20px] text-slate-400 flex-1">Total {{ type }}</h1>
        <slot />
    </div>

</template>