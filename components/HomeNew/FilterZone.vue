<script setup>
const icons = [
    {
        "name": "mdi:gift-outline",
        "label": "Original Product ",
        "subtext": "Parts from trusted brands"
    },
    {
        "name": "mdi:reply-outline",
        "label": "7 Days Return ",
        "subtext": "Easy replacements"
    },
    {
        "name": "mdi:truck-delivery",
        "label": "Fast Delivery ",
        "subtext": "All over Bangladesh"
    }
]

</script>

<template>
    <div class="w-full flex justify-center gap-8 bg-white">
        <div class=" w-[351px] h-[285px] lg:block hidden">
            <img class="w-full h-full object-cover"
                src="https://www.bridgestone.com.au/-/media/project/bridgestone-global/apac/bridgestone-nz/tyres/offers/promotions/offers/2024/may/offer-banner/20564-bds-may-web-landing-375x380.jpg?rev=97b60f238cc64e578b73bfe1d5f2c84c">

        </div>
        <div class="flex flex-col gap-8 -mt-10 z-20 text-xs">
            <div
                class=" max-w-[800px] lg:h-[71px]   w-full place-content-center   grid grid-cols-2 md:grid-cols-6 p-4 gap-4 bg-primary rounded-2xl ">
                <select class="h-[35px] rounded h-">
                    <option value="" disabled selected>Select Model </option>
                    <option value="hurr">Durr</option>
                </select>
                <select class="h-[35px] rounded h-">
                    <option value="" disabled selected>Select Make</option>
                    <option value="hurr">Durr</option>
                </select>
                <select class="h-[35px] rounded h-">
                    <option value="" disabled selected>Select Year</option>
                    <option value="hurr">Durr</option>
                </select>
                <select class="h-[35px] rounded h-">
                    <option value="" disabled selected>Select Engine</option>
                    <option value="hurr">Durr</option>
                </select>
                <select class="h-[35px] rounded h-">
                    <option value="" disabled selected>Select Parts</option>
                    <option value="hurr">Durr</option>
                </select>
                <Button class=" h-[35px] w-16 bg-red-200 ">
                    <Icon class="text-primary text-2xl bg" name="fa:search"></Icon>
                </Button>

            </div>
            <div class="flex lg:flex-row  flex-col gap-8 lg:text-start text-center justify-between items-center">
                <div v-for="i in icons" class="flex lg:flex-row flex-col gap-4 items-center">
                    <div class=" h-[68px]">
                        <Icon :name="i.name" class="text-[57px] text-primary"></Icon>
                    </div>
                    <div>
                        <h1 class="font-bold">{{ i.label }}</h1>
                        <p class=" text-slate-400">{{ i.subtext }}</p>
                    </div>

                </div>

            </div>
            <div class="w-full h-[116px] overflow-hidden">
                <img src="https://img.freepik.com/free-psd/car-rental-automotive-facebook-cover-template_106176-2473.jpg"
                    class="w-full h-full object-cover">

            </div>
        </div>
        <div class=" w-[351px] h-[285px] lg:block hidden">
            <img class="w-full h-full object-cover"
                src="https://www.bridgestone.com.au/-/media/project/bridgestone-global/apac/bridgestone-nz/tyres/offers/promotions/offers/2024/may/offer-banner/20564-bds-may-web-landing-375x380.jpg?rev=97b60f238cc64e578b73bfe1d5f2c84c">

        </div>

        <div>

        </div>

    </div>
</template>