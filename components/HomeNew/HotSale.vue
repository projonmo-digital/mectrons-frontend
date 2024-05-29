<script setup>
const panels = [
    {
        series_name: "THE RAINS",
        offer_type: "Best Low Price",
        discount_message: "Sale up to 35% OFF",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVyfn9A04D-XvUpEcXF-Ls-EqREC9NPoh6HHDjAw_6Muj5vcC8BWuSVoB8j5bHjxOx0I&usqp=CAU"
    },
    {
        series_name: "THE RAINS",
        offer_type: "Best Low Price",
        discount_message: "Sale up to 35% OFF",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVyfn9A04D-XvUpEcXF-Ls-EqREC9NPoh6HHDjAw_6Muj5vcC8BWuSVoB8j5bHjxOx0I&usqp=CAU"
    },
    {
        series_name: "THE RAINS",
        offer_type: "Best Low Price",
        discount_message: "Sale up to 35% OFF",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVyfn9A04D-XvUpEcXF-Ls-EqREC9NPoh6HHDjAw_6Muj5vcC8BWuSVoB8j5bHjxOx0I&usqp=CAU"
    },
    {
        series_name: "THE RAINS",
        offer_type: "Best Low Price",
        discount_message: "Sale up to 35% OFF",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwVyfn9A04D-XvUpEcXF-Ls-EqREC9NPoh6HHDjAw_6Muj5vcC8BWuSVoB8j5bHjxOx0I&usqp=CAU"
    },
]
</script>

<template>
    <div class="flex md:flex-row flex-col items-center gap-4 p-4">
        <h1 class="text-2xl font-bold">HOT Sale</h1>
        <hr class="w-[10%] h-[5px] bg-primary">
    </div>
    <div class="flex flex-col justify-center items-center px-4">
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 md:gap-4 gap-4 justify-between w-full">
            <div v-for="(panel, index) in panels" :key="index" class="relative  h-[206px]">
                <div class="relative h-full w-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${panel.image_url})` }">
                    <div
                        class="absolute w-full text-center h-full bg-gray-800 bg-opacity-50 text-white flex flex-col items-center justify-center">
                        <p class="text-lg">{{ panel.series_name }}</p>
                        <h1 class="text-2xl font-bold text-[#FFD11B]">{{ panel.offer_type }}</h1>
                        <p class="text-lg">{{ panel.discount_message }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
