<script setup lang="ts">
import { onMounted } from 'vue'
import Stepper from '~/components/Common/Stepper.vue';
import UserListViewItem from '~/components/Common/UserListViewItem.vue';

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
  title: 'Order Details - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const route = useRoute()
// state
const { id } = route.params
const preloader = ref(false)
const order = ref(null)

const steps = ref([])

// methods
const fetchData = async (params = {}) => {
    const stepArray = ['placed', 'received', 'confirmed', 'on the way', 'delivered']
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/order/${id}?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })        
        if (response && response.data) {
            order.value = response.data
            let isDone = true
            for(let i in stepArray){
                let item = { step: i+1, title: stepArray[i], done: isDone }
                steps.value.push(item)
                if(stepArray[i] === response.data.delivery_status){
                    isDone = false
                }
            }
            return response
        } else {
            console.error("Invalid response format")
            return []
        }
    } catch (error) {
        console.error(error)
        return []
    }finally{
        preloader.value = false
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class=" relative">
        <div class="flex items-center gap-3">
            <div>
                <NuxtLink class="text-primary hover:text-orange-500 px-2 py-1 rounded disabled:text-orange-300" to="/seller/order">
                    <Icon name="mdi:arrow-left"></Icon>
                    Back
                </NuxtLink>
            </div>
            <span class=" text-xl">|</span>
            <div class="relative h-[30px] broder">
                <Icon v-if="preloader" name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-2xl"></Icon>
                <h1 v-else class="text-2xl font-bold">Detail</h1>
            </div>
        </div>
        <hr class="my-3">
        <div v-if="preloader" class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-4xl"></Icon>
        </div>
        <div v-else class="flex flex-col gap-5">
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <h1 class=" text-2xl font-bold">Seller</h1>
                    <UserListViewItem v-if="order?.seller" :model-value="order?.seller" />
                </div>
                <div>
                    <h1 class=" text-2xl font-bold">Buyer</h1>
                    <UserListViewItem v-if="order?.buyer" :model-value="order?.buyer" />
                </div>
            </div>
            <!-- {{ order }} -->
            <div>
                <h1 class="text-2xl font-bold">Status</h1>
                <div class="rounded-xl flex items-center bg-orange-50 h-[140px] w-full">
                    <Stepper :steps="steps" />
                </div>
            </div>
            <div>
                <h1 class=" text-2xl font-bold">Address</h1>
                <p>{{ order?.to_address }}</p>
            </div>
            <div v-if="order?.billing_information">
                <div class="flex flex-col">
                    <label class="font-bold">Email:</label>
                    <label>{{ order?.billing_information.email }}</label>
                </div>
                <div class="flex flex-col">
                    <label class="font-bold">Email:</label>
                    <label>{{ order?.billing_information.number }}</label>
                </div>
            </div>
            <div>
                <h1 class=" text-2xl font-bold">Payment Method</h1>
                <p>{{ order?.method }}</p>
            </div>
        </div>
    </div>
</template>