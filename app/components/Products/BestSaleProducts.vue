<script setup lang="ts">
import { ref } from 'vue'
import Slider from '~/components/Common/Pertials/Slider.vue'
import { discountCalculation } from '~/helper';
import type { IProduct } from '~/types/products';
import type { IpaginatedRespoinse } from '~/types/response';

const { categories } = storeToRefs(useAppStore())

// state
const preloader = ref(false)
const products = ref<IProduct[]>([]);
const filterParams = ref({
    marker: ['best-sale']
})

const re_render = ref(0)

const getProducts = async (formBody: any) => {
    preloader.value = true
    try {
        const response = await $fetch<IpaginatedRespoinse<IProduct>>(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: formBody,
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

const chooseCategory = (category: any) => {
    if (category.id) {
        getProducts({ ...filterParams.value, category: [category.id] })
    } else {
        getProducts({ ...filterParams.value })
    }
}

onMounted(() => {
    getProducts({ ...filterParams.value })
})

</script>


<template>
    <div class="w-full">
        <Slider :products="products" :loading="preloader" :key="re_render" />
    </div>
</template>