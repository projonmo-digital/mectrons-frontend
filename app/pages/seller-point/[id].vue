<script setup lang="ts">
import { ref } from 'vue'
import Product from '@/components/Common/Pertials/Product.vue'
import type { IProduct } from '~/types/products'
import ProductGridSkeleton from '@/components/Skeleton/ProductGridSkeleton.vue'
import type { ISellerResponse } from '~/types/seller'

const route = useRoute()

const preloader = ref(false)
const responseParams = ref({
    // page: 1,
    // per_page: 10,
})

// const moreData = ref(true)
const seller = ref<ISellerResponse>()
const re_render = ref(0)

// const nextPage = () => {
//     responseParams.value.page++
//     getProducts(responseParams.value)
// }
// const previousPage = () => {
//     responseParams.value.page--
//     getProducts(responseParams.value)
// }

const getProducts = async (params: any) => {
    preloader.value = true
    const id = route.params.id
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/products/${id}?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<ISellerResponse>(url, {
            headers: {
                Accept: "application/json"
            },
            method: 'GET',
        });
        if (response) {
            seller.value = response
        }
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
        re_render.value++
    }
}

const isFilterShow = ref(false)

onMounted(() => {
    getProducts(responseParams.value)
})

</script>
<template>
    <div class="flex flex-col justify-center items-center gap-2 p-8 text-center">
        <img v-if="seller?.saler_settings?.logo" class="w-20 h-20 rounded-full object-cover border"
            :src="useRuntimeConfig().public.imageUrl + '/' + seller?.saler_settings?.logo.replaceAll('public', 'storage')"
            alt="img">
        <img class="w-20 h-20 object-cover border rounded-full" v-else src="assets/images/dummy-image.jpg" alt="img" />
        <h1 class="text-3xl font-bold">{{ seller?.saler_settings?.name }}</h1>
        <p class=" text-sm">{{ seller?.saler_settings?.location }}</p>
        <div class="flex flex-1 gap-4 hover:cursor-pointer mt-4">
            <a v-if="seller?.saler_settings?.facebook" target="_blank" :href="seller?.saler_settings?.facebook">
                <icon class="w-8 h-8" name="logos:facebook" />
            </a>
            <a v-if="seller?.saler_settings?.twitter" target="_blank" :href="seller?.saler_settings?.twitter">
                <icon class="w-8 h-8" name="logos:twitter" />
            </a>
            <a v-if="seller?.saler_settings?.instragram" target="_blank" :href="seller?.saler_settings?.instragram">
                <icon class="w-8 h-8" name="skill-icons:instagram" />
            </a>
            <a v-if="seller?.saler_settings?.youtube" target="_blank" :href="seller?.saler_settings?.youtube">
                <icon class="w-8 h-8" name="logos:youtube-icon" />
            </a>
        </div>
    </div>
    <div class="col-span-12 md:col-span-9 p-8 relative">
        <div class="flex items-center justify-between">
            <h1 class=" text-2xl font-bold">Products</h1>
        </div>
        <hr>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 min-h-[300px]">
            <template v-if="preloader">
                <ProductGridSkeleton v-for="(product, index) in 10" :key="`product-skeleton-${index}`" />
            </template>
            <Product v-for="(product, index) in seller?.product" :product="product" :key="`product-${index}`"></Product>
        </div>
        <!-- <hr> -->
        <!-- <div class="flex gap-3 my-2">
            <button :disabled="responseParams.page <= 1"
                class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous
                page</button>
            <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                @click="nextPage">Next page</button>
        </div> -->
    </div>
</template>