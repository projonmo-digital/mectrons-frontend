<script setup lang="ts">
import { ref } from 'vue'
import Slider from '@/components/Category/Pertials/Slider.vue'
import Filter from '@/components/common/Filter.vue'
import FilterSidebar from '@/components/common/FilterSidebar.vue'

const categoriesList = ref([
    { id: 1, name: 'Brakes', img: 'assets/images/categories/disc-brake-1.png' },
    { id: 2, name: 'Tyres', img: 'assets/images/categories/disc-brake-2.png' },
    { id: 3, name: 'Lubricant', img: 'assets/images/categories/disc-brake-3.png' },
    { id: 4, name: 'Brakes', img: 'assets/images/categories/disc-brake-4.png' },
    { id: 5, name: 'Brakes', img: 'assets/images/categories/disc-brake-5.png' },
])

const preloader = ref(false)
const responseParams = ref({
    page: 1,
    per_page: 10,
})
const moreData = ref(true)
const data = ref<any[] | null>([])

// methods
const search = (event: any) => {
    getProducts(event)
}

const getProducts = async (formBody: any) => {
    preloader.value = true
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: formBody,
            server: false
        });
        if (response) {
            data.value = response.data;
        }
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
    }
}


// const getProducts = async (params = {}) => {
//     const token = useCookie('token')
//     try {
//         preloader.value = true
//         let url = `${useRuntimeConfig().public.baseUrl}/search?${new URLSearchParams(params).toString()}`;
//         const response = await $fetch(url, {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//             },
//         })
//         if (response && response.data.data) {
//             responseParams.value.page = response.data.current_page
//             data.value = response.data.data
//             moreData.value = response.data.last_page === response.data.current_page
//             return response.data.data // Adjust based on actual response structure
//         } else {
//             console.error("Invalid response format")
//             return []
//         }
//     } catch (error) {
//         console.error(error)
//         return []
//     }finally{
//         preloader.value = false
//     }
// }

onMounted(() => {
    getProducts({})
})

</script>
<template>
    <div class="grid grid-cols-12">
        <div class="col-span-3 p-5">
            <div class="h-full bg-orange-200 rounded-xl p-3">
                <FilterSidebar />
            </div>
        </div>
        <div class="col-span-9">
            <Slider :items="categoriesList" :loading="false" />
            <HomeFeaturedProducts></HomeFeaturedProducts>
        </div>
    </div>
    <div class="mx-auto my-5 max-w-[800px]">
        <Filter @search="search" />
    </div>
    <div class="grid grid-cols-12">
        <div class="col-span-3">
            <div class="h-full bg-orange-200 p-3">
                menu
            </div>
        </div>
        <div class="col-span-9 p-3">
            <h1 class=" text-2xl font-bold">Others Product</h1>
            <hr>
            <div>
                Products
            </div>
        </div>
    </div>
</template>