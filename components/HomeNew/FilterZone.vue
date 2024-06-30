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
const secondSearchBar = reactive({
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: ''
})
const selectedsecondSearchBar = reactive({
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: ''
})

const getMake = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data`)
    secondSearchBar.make = data.value
    console.log(secondSearchBar)

}
getMake()
const getModel = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}`)
    secondSearchBar.model = data.value
    console.log(secondSearchBar.model)
}


const getYear = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}`)
    secondSearchBar.year = data.value


}
const getCC = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}`)
    secondSearchBar.cc = data.value
    console.log(data.value)
}
const getEngyne = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}`)
    secondSearchBar.engyne = data.value
}

const getParts = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}&engine=${selectedsecondSearchBar.engyne}`)
    secondSearchBar.parts = data.value


}



const categoryData = ref('')

const getCetagories = async () => {
    const res = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`)

    categoryData.value = res.data.value




}

getCetagories()

const store = useUtils()
const upperLeftAds = await store.getAds('Home Page - Upper Left')

const upperLeftAdsUrl = upperLeftAds.value.url
console.log(upperLeftAds.value)
console.log(upperLeftAdsUrl)
</script>

<template>

    <div class="w-full flex justify-between gap-2 bg-white">
        <div class=" w-[351px] h-[285px] lg:block hidden">
            <img v-if="upperLeftAds.type === 'image'" class="w-full h-full object-cover" :src="upperLeftAdsUrl">

        </div>
        <div class="flex flex-col gap-8  -mt-10 z-20 text-xs">
            <div
                class=" max-w-[1000px] lg:h-[71px]   w-full place-content-center   grid grid-cols-2 md:grid-cols-7 p-4 gap-4 bg-primary rounded-2xl ">

                <select class="h-[35px] rounded h-" @change="getModel" v-model="selectedsecondSearchBar.make">
                    <option value="" disabled selected>Model </option>
                    <option v-for="i in secondSearchBar.make">{{ i.make }}</option>

                </select>
                <select @change="getYear" :disabled="!selectedsecondSearchBar.make" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.model">
                    <option value="" disabled selected>Model </option>
                    <option v-for="i in secondSearchBar.model">{{ i.models }}</option>
                </select>
                <select @change="getCC" :disabled="!secondSearchBar.year" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.year">
                    <option value="" disabled selected>Year</option>
                    <option v-for="i in secondSearchBar.year">{{ i.year }}</option>
                </select>
                <select @change="getEngyne" :disabled="!secondSearchBar.cc" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.cc">
                    <option value="" disabled selected>CC</option>
                    <option v-for="i in secondSearchBar.cc">{{ i.cc }}</option>
                </select>
                <select @change="getParts" :disabled="!secondSearchBar.engyne" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.engyne">
                    <option value="" disabled selected>Engine</option>
                    <option v-for="i in secondSearchBar.engyne">{{ i.engine }}</option>
                </select>

                <select :disabled="!secondSearchBar.parts" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.parts">
                    <option value="" disabled selected>Parts</option>
                    <option v-for="i in categoryData.categories">{{ i.name }}</option>
                </select>
                <Button :disabled="!secondSearchBar.parts"
                    class=" h-[35px] w-16 text-primary hover:bg-white  bg-red-200 " @click="">
                    <Icon class="text-2xl  bg" name="fa:search"></Icon>
                </Button>

            </div>
            <div
                class="flex lg:flex-row  lg:mx-8 flex-col gap-8 lg:text-start text-center justify-between items-center">
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



    </div>
</template>