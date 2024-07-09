<script setup lang="ts">
import { onMounted } from 'vue'
import Stepper from '~/components/common/Stepper.vue';
useHead({
  title: 'Order Detail - Mectrons Admin',
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
    <div class="relative">
        <div class="flex items-center gap-3">
            <div>
                <NuxtLink class="text-primary hover:text-orange-500 px-2 py-1 rounded disabled:text-orange-300" to="/admin/seller">
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
        <div v-else>
            <div class="grid grid-cols-2 gap-3">
                <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    Seller
                </div>
                <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">Buyer</div>
            </div>
            <!-- {{ order }} -->
            <div class="my-5 p-5 rounded-xl flex items-center bg-orange-50 h-[160px]">
              <Stepper :steps="steps" />
            </div>
        </div>
    </div>
</template>