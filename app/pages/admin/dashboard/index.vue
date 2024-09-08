<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Card1 from '@/components/Admin/Card1.vue'
import Card2 from '@/components/Admin/Card2.vue'
import Card3 from '@/components/Admin/Card3.vue'
import Logos from '@/components/Admin/Logos.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import type { IAdminDashbordResponse } from '~/types/dashboard'

definePageMeta({
    middleware: ["auth", "admin"]
})

useHead({
    title: 'Dashboard - Mectrons Admin',
    meta: [
        { name: 'description', content: 'Mectrons' }
    ]
})

const auth = useAuthStore();

const selected = ref<'AllTime' | 'Daily' | 'Week' | 'Month'>('AllTime')
const data = ref<IAdminDashbordResponse | null>(null)
const preloader = ref(false)

const fetchData = async () => {
    preloader.value = true
    const token = useCookie('token')
    try {
        const response = await $fetch<IAdminDashbordResponse>(`${useRuntimeConfig().public.baseUrl}/dashboard`, {
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
        <div v-if="!preloader" class="flex flex-col gap-5">
            <div class="grid grid-cols-4 gap-5">
                <Card1 :value="data?.totalCustomer" icon="mdi:people-group" type="Customer" />
                <Card1 :value="data?.totalProducts" icon="prime:box" type="products" />
                <Card1 :value="data?.totalCategories" type="Categories" icon='mdi-light:view-dashboard' />
                <Card1 :value="data?.totalSellers" type="Seller" icon="hugeicons:manager" />
            </div>
            <div class="grid grid-cols-2 items-start gap-5">
                <div class="flex flex-col gap-5">
                    <Card1 :value="data?.totalSells" class="bg-[#2489BE]/40" type="Sells" icon="mdi:coupon-outline" />
                    <div class="flex gap-3 p-3 shadow-lg border rounded-xl w-full">
                        <div class="flex flex-col gap-4 w-[50%]">
                            <div class="bg-blue-300 p-4 rounded-lg flex-1 flex flex-col">
                                <div class="flex-1">
                                    <h1 class="text-6xl text-blue-700 font-bold">{{ data?.totalOrders }}</h1>
                                    <p class="text-lg text-blue-600 ">Total Orders</p>
                                </div>
                                <nuxt-link to="/admin/order"
                                    class="rounded w-full text-white bg-blue-400 hover:bg-blue-600 inline-block px-3 py-2">All
                                    orders</nuxt-link>
                            </div>
                            <div class="w-full rounded-lg bg-red-500 justify-between text-white p-4 flex items-center">
                                <p>Pending Orders</p>
                                <p class="text-white text-2xl font-bold">{{ data?.totalProcessingOrders }}</p>
                            </div>
                        </div>
                        <div class="flex flex-col w-[50%] gap-4">
                            <div
                                class="p-4 rounded-lg bg-[#0575B3]/20 flex justify-between items-center text-[#0575B3]">
                                <p>Order Placed</p>
                                <p class="text-[#0575B3] text-2xl font-bold">{{ data?.totalPlacedOrders }}</p>
                            </div>
                            <div
                                class="p-4 rounded-lg bg-[#348110]/40 flex justify-between items-center text-[#348110]">
                                <p>Confirmed Orders</p>
                                <p class="text-[#348110] text-2xl font-bold">{{ data?.totalConfirmedOrders }}</p>
                            </div>
                            <div
                                class="p-4 rounded-lg bg-[#D70E0E]/30 flex justify-between items-center text-[#D70E0E]">
                                <p>Processed Orders</p>
                                <p class="text-[#D70E0E] text-2xl font-bold">{{ data?.totalProcessedOrders }}</p>
                            </div>
                            <div class="p-4 rounded-lg bg-[#FFD11B]/20 flex justify-between items-center ">
                                <p>Order Shiped</p>
                                <p class="text-2xl font-bold">{{ 12 }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shadow-lg rounded-lg border flex flex-col gap-3 p-5">
                    <div class="flex items-center justify-between w-full">
                        <div class="font-bold">Top Seller & Products</div>
                        <div class="flex gap-2">
                            <div @click="selected = 'AllTime'" :class="{ 'text-primary bg-orange-100 -skew-x-12': selected === 'AllTime' }"
                                class="hover:bg-orange-100 p-1 cursor-pointer hover:text-primary text-center hover:-skew-x-12">
                                All
                            </div>
                            <div @click="selected = 'Daily'" :class="{ 'text-primary bg-orange-100 -skew-x-12': selected === 'Daily' }"
                                class="hover:bg-orange-100 p-1 cursor-pointer hover:text-primary text-center hover:-skew-x-12">
                                Today
                            </div>
                            <div @click="selected = 'Week'" :class="{ 'text-primary bg-orange-100 -skew-x-12': selected === 'Week' }"
                                class="hover:bg-orange-100 p-1 cursor-pointer hover:text-primary text-center hover:-skew-x-12">
                                Week
                            </div>
                            <div @click="selected = 'Month'" :class="{ 'text-primary bg-orange-100 -skew-x-12': selected === 'Month' }"
                                class="hover:bg-orange-100 p-1 cursor-pointer hover:text-primary text-center hover:-skew-x-12">
                                Month
                            </div>
                        </div>
                    </div>
                    <div class="text-lg">By sales</div>
                    <div>
                        <Logos></Logos>
                    </div>
                    <div class="mt-10">
                        <table class="w-full text-center">
                            <tr class="border-b-4">
                                <th class="w-1/3 text-left">Item</th>
                                <th class="w-1/3 text-center">Quality</th>
                                <th class="w-1/3 text-right">Total Price</th>
                            </tr>
                            <tr>
                                <td class="text-left">{{ data ? data[`topSold${selected}`].title : '' }}</td>
                                <td class="text-center">{{ data ? data[`topSold${selected}`].total_quantity : '' }}</td>
                                <td class="text-right">{{ data ? data[`topSold${selected}`].price : '' }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
        </div>
    </div>
</template>