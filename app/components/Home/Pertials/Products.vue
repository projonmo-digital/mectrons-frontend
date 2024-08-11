<script setup lang="ts">
import { ref } from 'vue'
import FilterBar from './FilterBar.vue'
import Slider from './Slider.vue'

// state
const preloader = ref(false)
const products = ref([]);
const filterParams = ref({
    marker: ['featured']
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
    <div>
        <FilterBar @select="chooseCategory"></FilterBar>
        <div>
            <Slider :products="products" :loading="preloader" :key="re_render"/>
        </div>
    </div>
</template>