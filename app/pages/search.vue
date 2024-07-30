<script setup lang="ts">
import { ref, watch } from 'vue'
import Product from '@/components/Home/Pertials/Product.vue'

const route = useRoute()

const preloader = ref(false)
const responseParams = ref({
    page: 1,
    per_page: 10,
    search: route.query.search
})

const moreData = ref(true)
const data = ref<any[] | null>([])

// methods
const nextPage = () => {
    responseParams.value.page++
    getProducts(responseParams.value)
}
const previousPage = () => {
    responseParams.value.page--
    getProducts(responseParams.value)
}

const getProducts = async (params: any) => {
    preloader.value = true
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/search?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: 'GET'
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

watch(() => route.query.search, (n, o) => {
    getProducts(responseParams.value)
}, { immediate: true, deep: true })

onMounted(() => {
    getProducts(responseParams.value)
})

</script>
<template>
    <div class="p-5">
        <div class="flex justify-between">
            <h1 class=" text-2xl font-bold">Search Products</h1>
            <div class="flex gap-3 my-2">
                <button :disabled="responseParams.page <= 1"
                    class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous
                    page</button>
                <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                    @click="nextPage">Next page</button>
            </div>
        </div>
        <hr>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 min-h-[300px]">
            <div v-if="preloader" class="flex items-center justify-center absolute inset-0 z-50 bg-white/50">
                <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl">
                </Icon>
            </div>
            <Product v-for="(product, index) in data" :product="product" :key="`product-${index}`"></Product>
        </div>        
    </div>
</template>