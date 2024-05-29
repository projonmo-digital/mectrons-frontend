<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./columns"

const data = ref<any[] | null>(null) // Initialize as null
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
        // Check if response and response.data are defined
        if (response && response.data && response.data.value && response.data.value.data) {
            data.value = response.data.value.data
            console.log(data.value)
            return response.data // Adjust based on actual response structure
        } else {
            console.error("Invalid response format")
            return []
        }
    } catch (error) {
        console.error(error)
        return []
    }
}

handleSwitchChange()
</script>

<template>
    <div class="lg:p-8 w-full">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">In House Product</h1>
            <AddButton type="Product"></AddButton>
        </div>
        <div class="container py-10 mx-auto w-full flex justify-center">
            <!-- Check if data is not null before passing it to DataTable -->
            <DataTable v-if="data !== null" :columns="columns" :data="data" />
        </div>
    </div>
</template>
