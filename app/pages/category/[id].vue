<script setup lang="ts">
import { ref } from 'vue'
import Slider from '@/components/Category/Pertials/Slider.vue'
import Filter from '@/components/Common/Filter.vue'
import FilterSidebar from '@/components/Common/FilterSidebar.vue'
import Product from '@/components/Home/Pertials/Product.vue'

const store = useUtils()
const route = useRoute()

const categoryPageUpAds: any = await store.getAds('Category Page - Up')
const categoryPageDownAds: any = await store.getAds('Category Page - Down')

// const categoriesList = ref([
//     { id: 1, name: 'Brakes', img: 'assets/images/categories/disc-brake-1.png' },
//     { id: 2, name: 'Tyres', img: 'assets/images/categories/disc-brake-2.png' },
//     { id: 3, name: 'Lubricant', img: 'assets/images/categories/disc-brake-3.png' },
//     { id: 4, name: 'Brakes', img: 'assets/images/categories/disc-brake-4.png' },
//     { id: 5, name: 'Brakes', img: 'assets/images/categories/disc-brake-5.png' },
// ])

const preloader = ref(false)
const responseParams = ref({
    page: 1,
    per_page: 10,
})

const formBody = ref({})

const moreData = ref(true)
const data = ref<any[] | null>([])

// methods
const search = (event: any) => {
    formBody.value = { ...formBody.value, ...event }
    setTimeout(() => {
        getProducts(responseParams.value, formBody.value)
    }, 0)
}

const nextPage = () => {
    responseParams.value.page++
    getProducts(responseParams.value)
}
const previousPage = () => {
    responseParams.value.page--
    getProducts(responseParams.value)
}

const getProducts = async (params: any, formBody: any = {}) => {
    preloader.value = true
    let formData = new FormData()
    formData.append('category[]', route.params.id.toString())

    for (let key in formBody) {
        if (typeof formBody[key] === 'string') {
            formData.append(key, formBody[key])
        } else if (formBody[key] instanceof Array) {
            for (let item of formBody[key]) {
                formData.append(`${key}[]`, item)
            }
        }
    }

    try {
        let url = `${useRuntimeConfig().public.baseUrl}/filter?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: 'POST',
            // body: { ...formBody, 'category[]': Number(route.params.id) },
            body: formData,
            server: false
        });
        if (response && response.data && response.data) {
            responseParams.value.page = response.current_page
            data.value = response.data
            moreData.value = response.last_page === response.current_page
            return response
        } else {
            console.error("Invalid response format")
            return []
        }
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
    }
}

const filter = (filterData: any) => {
    formBody.value = { ...formBody.value, ...filterData }
    setTimeout(() => {
        getProducts(responseParams.value, formBody.value)
    }, 0)
}

onMounted(() => {
    getProducts(responseParams.value)
})

</script>
<template>
    <div class="grid grid-cols-12">
        <div class="col-span-3 p-5">
            <div class="bg-primary/10 rounded-xl">
                <FilterSidebar @filter="filter" />
            </div>
        </div>
        <div class="col-span-9">
            <!-- <Slider :items="categoriesList" :loading="false" /> -->
            <HomeFeaturedProducts></HomeFeaturedProducts>
        </div>
    </div>
    <div class="mx-auto my-5 max-w-[800px]">
        <Filter @search="search" />
    </div>
    <div class="grid grid-cols-12">
        <div class="col-span-3">
            <div class="h-full p-3">
                <div class="min-w-[310px] w-[310px] h-[285px] lg:block hidden">
                    <img v-if="categoryPageUpAds.type === 'image'" class="w-full h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + categoryPageUpAds.url.replaceAll('public', 'storage')">
                </div>
                <div class="min-w-[310px] w-[310px] h-[285px] lg:block hidden">
                    <img v-if="categoryPageDownAds.type === 'image'" class="w-full h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + categoryPageDownAds.url.replaceAll('public', 'storage')">
                </div>
            </div>
        </div>
        <div class="col-span-9 p-3 relative">
            <h1 class=" text-2xl font-bold">Others Product</h1>
            <hr>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 min-h-[300px]">
                <div v-if="preloader" class="flex items-center justify-center absolute inset-0 z-50 bg-white/50">
                    <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl">
                    </Icon>
                </div>
                <Product v-for="(product, index) in data" :product="product" :key="`product-${index}`"></Product>
            </div>
            <hr>
            <div class="flex gap-3 my-2">
                <button :disabled="responseParams.page <= 1"
                    class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                    @click="previousPage">Previous page</button>
                <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                    @click="nextPage">Next page</button>
            </div>
        </div>
    </div>
</template>