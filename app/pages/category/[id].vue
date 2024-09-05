<script setup lang="ts">
import { ref } from 'vue'
import Filter from '@/components/Common/Filter.vue'
import FilterSidebar from '@/components/Common/FilterSidebar.vue'
import Product from '@/components/Common/Pertials/Product.vue'
import ProductsByCategories from '~/components/Common/ProductsByCategories.vue'
import type { IpaginatedRespoinse } from '~/types/response'
import type { IProduct } from '~/types/products'
import type { IAddvertisementPostion, IAdvertisement } from "~/types/advertisment";
import ProductGridSkeleton from '@/components/Skeleton/ProductGridSkeleton.vue'
import { discountCalculation } from '~/helper'

const { categories } = storeToRefs(useAppStore())

const store = useUtils()
const route = useRoute()

const categoryPageUpAds = await store.getAds<IAdvertisement>('Category Page - Up')
const categoryPageDownAds = await store.getAds<IAdvertisement>('Category Page - Down')

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
const products = ref<IProduct[]>([])
const re_render = ref(0)

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
    const token = useCookie('token')

    let formData = new FormData()
    formData.append('category[]', route.params.id.toString())
    for (const key in formBody) {
        let formItem = formBody[key]
        if(Array.isArray(formItem)){
            for (const item of formBody[key]) {
                formData.append(`${key}[]`, item)
            }
        }
        else{
            formData.append(key, formBody[key])
        }
    }
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/filter?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<IpaginatedRespoinse<IProduct>>(url, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            method: 'POST',
            body: formData
        });
        if (response) {
            products.value = discountCalculation(categories.value, response.data)
        }
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
        re_render.value++
    }
}

const filter = (filterData: any) => {    
    formBody.value = { ...formBody.value, ...filterData }
    setTimeout(() => {
        getProducts(responseParams.value, formBody.value)
    })
}

const isFilterShow = ref(false)

onMounted(() => {
    getProducts(responseParams.value)
})

</script>
<template>
    <div class="hidden md:grid grid-cols-12">
        <div class="col-span-3 p-5">
            <div class="bg-primary/10 rounded-xl">
                <FilterSidebar @filter="filter" />
            </div>
        </div>
        <div class="col-span-9">
            <ProductsByCategories :categories="categories" :params="{ marker: ['featured'] }" title="Featured products"></ProductsByCategories>
        </div>
    </div>
    <div v-if="isFilterShow" class="mx-auto px-3 my-5 max-w-[800px]">
        <Filter @search="search" />
    </div>
    <div class="grid grid-cols-12 my-5">
        <div class="hidden md:block col-span-3">
            <div class="h-full px-5">
                <div class="w-full">
                    <img v-if="categoryPageUpAds?.type === 'image'" class="w-full h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + categoryPageUpAds.url.replaceAll('public', 'storage')">
                </div>
                <div class="w-full">
                    <img v-if="categoryPageDownAds?.type === 'image'" class="w-full h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + categoryPageDownAds.url.replaceAll('public', 'storage')">
                </div>
            </div>
        </div>
        <div class="col-span-12 md:col-span-9 p-3 relative">
            <div class="flex items-center justify-between">
                <h1 class=" text-2xl font-bold">Others Product</h1>
                <icon @click="isFilterShow = !isFilterShow" class="md:hidden w-8 h-8 rounded"
                :class="{ 'text-primary': isFilterShow }" :name=" isFilterShow ? 'material-symbols:close' : 'mi:filter-1'"/>
            </div>
            <hr>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 min-h-[300px]">
                <template v-if="preloader">
                    <ProductGridSkeleton v-for="(product, index) in 10" :key="`product-skeleton-${index}`" />
                </template>
                <Product v-for="(product, index) in products" :product="product" :key="`product-${index}`"></Product>
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