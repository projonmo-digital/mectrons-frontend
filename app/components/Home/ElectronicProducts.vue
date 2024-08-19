<script setup lang="ts">
import { ref } from 'vue'
import Slider from '@/components/Common/Pertials/Slider.vue'
import FilterBar from './Pertials/FilterBar.vue'
import type { IProduct } from '~/types/products';
import type { IpaginatedRespoinse } from '~/types/response';
import { discountCalculation } from '~/helper';

const { categories } = storeToRefs(useAppStore())

// state
const preloader = ref(false)
const products = ref<IProduct[]>([]);
const filterParams = ref({
    marker: ['electric']
})

const re_render = ref(0)

const getProducts = async (formBody: any) => {
    preloader.value = true
    try {
        const response = await $fetch<IpaginatedRespoinse<IProduct>>(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: formBody
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
    <div class="p-8">
        <FilterBar @select="chooseCategory" title="Electric Products"></FilterBar>
        <div>
            <Slider :products="products" :loading="preloader" :key="re_render"/>
        </div>
    </div>
</template>