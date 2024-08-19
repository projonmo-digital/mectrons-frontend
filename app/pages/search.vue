<script setup lang="ts">
import { ref } from 'vue'
import Product from '@/components/Common/Pertials/Product.vue'
import { discountCalculation } from '~/helper';
import type { IProduct } from '~/types/products';
import type { IpaginatedRespoinse } from '~/types/response';

const { categories } = storeToRefs(useAppStore())

const route = useRoute()

const preloader = ref(false)
const responseParams = ref({
    page: 1,
    per_page: 10,
    search: route.query.search
})

const formBody = ref({})

const moreData = ref(true)
const data = ref<any[] | null>([])

// methods
const nextPage = () => {
    responseParams.value.page++
    getProducts(responseParams.value, formBody.value)
}
const previousPage = () => {
    responseParams.value.page--
    getProducts(responseParams.value, formBody.value)
}

const getProducts = async (params: any, formBody: any) => {
    preloader.value = true
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/filter?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<IpaginatedRespoinse<IProduct>>(url, {
            method: 'POST',
            body: formBody
        });
        if (response) {
            responseParams.value.page = response.current_page
            data.value = discountCalculation(categories.value, response.data)
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

// watch(() => route.query.search, (n, o) => {
//     responseParams.value.search = n
//     setTimeout(() => {
//         getProducts(responseParams.value, formBody.value)
//     }, 0);    
// }, { immediate: true, deep: true })

onMounted(() => {
    formBody.value = route.query
    setTimeout(() => {
        getProducts(responseParams.value, formBody.value)
    })
})

</script>


<template>
    <div class="p-3 sm:p-8">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold">Searched Products</h1>
            <div class="flex gap-3 my-2">
                <button :disabled="responseParams.page <= 1"
                    class="text-primary px-2 py-1 rounded disabled:text-orange-300" @click="previousPage">
                    <Icon class="w-4 h-4" name="fa:arrow-left"></Icon>
                </button>
                <button :disabled="moreData" class="text-primary px-2 py-1 rounded disabled:text-orange-300"
                    @click="nextPage">
                    <Icon class="w-4 h-4" name="fa:arrow-right"></Icon>
                </button>
            </div>
        </div>
        <hr>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 min-h-[300px] relative">
            <div v-if="preloader" class="flex items-center justify-center absolute inset-0 z-50 bg-white/50">
                <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl">
                </Icon>
            </div>
            <Product v-for="(product, index) in data" :product="product" :key="`product-${index}`"></Product>
        </div>        
    </div>
</template>