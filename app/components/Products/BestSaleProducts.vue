<script setup lang="ts">
import { ref } from 'vue'
import FilterBar from '~/components/Common/Pertials/FilterBar.vue';
import Slider from '~/components/Common/Pertials/Slider.vue'

// state
const preloader = ref(false)
const products = ref([]);
const filterParams = ref({
    marker: ['best-sale']
})

const re_render = ref(0)

const getProducts = async (formBody: any) => {
    preloader.value = true
    try {
        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: formBody
        });
        if (response && response) {
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
    <div class="w-full">
        <Slider :products="products" :loading="preloader" :key="re_render"/>
    </div>
</template>