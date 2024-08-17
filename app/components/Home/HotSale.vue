<script setup lang="ts">
import { ref } from 'vue'
import FilterBar from './Pertials/FilterBar.vue'
import Slider from '@/components/Common/Pertials/Slider.vue'

// state
const preloader = ref(false)
const products = ref([]);
const filterParams = ref({
    marker: ['todays-deal']
})

const re_render = ref(0)

const getProducts = async (formBody: any) => {
    preloader.value = true
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: formBody,
            server: false
        });
        if (response) {
            products.value = response.data;
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
    <div class="p-8 mt-3">
        <h1 class="flex gap-3 text-3xl font-bold items-center notranslate">
            <span>HOT Sale</span>
            <span class="w-28 h-2 bg-primary"></span>
        </h1>
        <Slider :products="products" :loading="preloader" :key="re_render"/>
    </div>
</template>