<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import Slider from '@/components/Common/Pertials/Slider.vue'
import FilterBar from './Pertials/FilterBar.vue'
import type { IProduct } from '~/types/products';
import type { IpaginatedRespoinse } from '~/types/response';
import { discountCalculation, getCategoryIds, SliderArrayGen } from '~/helper';
import type { ICategory } from '~/types/categories';

interface Props {
    categories: ICategory[],
    title: string,
    params: any
}

const props = defineProps<Props>()

// state
const preloader = ref(false)
const products = ref<IProduct[]>([]);
const filterParams = ref<any>()

const re_render = ref(0)

const getProducts = async (formBody: any) => {
    preloader.value = true
    const token = useCookie('token')

    let formData = new FormData()
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
        const response = await $fetch<IpaginatedRespoinse<IProduct>>(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
            body: formData
        });
        if (response) {
            products.value = discountCalculation(props.categories, response.data)
        }
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
        re_render.value++
    }
}

const chooseCategory = (category: ICategory) => {
    if (category.id) {
        // getProducts({ ...filterParams.value, category: getCategoryIds(category)  })
        getProducts({ ...filterParams.value, category: [category.id]  })
    } else {
        getProducts({ ...filterParams.value })
    }
}

onMounted(() => {
    getProducts({ ...filterParams.value })
})

onBeforeMount(() => {
    filterParams.value = {...props.params}
})
</script>

<template>
    <div class="p-8">
        <FilterBar @select="chooseCategory" :sliderCategories="SliderArrayGen()(categories)" :title="title"></FilterBar>
        <div>
            <Slider :products="products" :loading="preloader" :key="re_render"/>
        </div>
    </div>
</template>