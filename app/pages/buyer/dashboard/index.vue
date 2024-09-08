<script setup lang="ts">
import type { IuserDashboardResponse } from '~/types/dashboard';
import Card1 from '@/components/Admin/Card1.vue'

definePageMeta({
    middleware: ["auth", "user"]
})

useHead({
  title: 'Dashboard - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})


const selected = ref<'AllTime' | 'Daily' | 'Week' | 'Month'>('AllTime')
const data = ref<IuserDashboardResponse | null>(null)
const preloader = ref(false)



const fetchData = async () => {
    preloader.value = true
    const token = useCookie('token')
    try {
        const response = await $fetch<IuserDashboardResponse>(`${useRuntimeConfig().public.baseUrl}/dashboard`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            }
        });
        data.value = response
    } catch (error) {
        console.error(error);
    } finally {
        preloader.value = false
    }
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <div class="relative">
        <div v-if="!preloader" class="grid grid-cols-2 gap-5">
            <Card1 :value="data?.totalOrders" icon="material-symbols-light:order-approve-rounded" type="Order" />
            <Card1 :value="data?.totalProductsInWhitelist" icon="icon-park-outline:list" type="Wishlist" />
        </div>
        <div v-else class="absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
        </div>
    </div>
</template>