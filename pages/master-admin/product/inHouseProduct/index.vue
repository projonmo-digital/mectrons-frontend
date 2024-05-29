<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./columns"



const data = ref<any[]>([])
const grabbedData = ref<any[]>([])

const handleSwitchChange = async () => {
    const token = useTokenStore()
    try {
        const response = await useFetch(`${useRuntimeConfig().public.baseUrl}/pending/products`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        })
        data.value = response.data.value.data
        console.log(data.value)

        return response.data // Adjust based on actual response structure
    } catch (error) {
        console.error(error)
        return []
    }
}

onMounted(async () => {
    await handleSwitchChange()
})

</script>

<template>
    <div class="lg:p-8 w-full ">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold"> Product</h1>
            <AddButton type="Category"></AddButton>
        </div>
        <div class="container py-10 mx-auto w-full flex justify-center">

            <CategoryProductDataTable :columns="columns" :data="data" />
        </div>
    </div>
</template>