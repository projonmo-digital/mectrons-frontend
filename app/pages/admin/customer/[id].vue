<script setup lang="ts">
import { onMounted } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
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
const customer = ref<any>(null)

const steps = ref([])

// methods
const fetchData = async (params = {}) => {
    const stepArray = ['placed', 'received', 'confirmed', 'on the way', 'delivered']
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/user/${id}?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response) {            
            customer.value = response
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
                <NuxtLink class="text-primary hover:text-orange-500 px-2 py-1 rounded disabled:text-orange-300" to="/admin/customer">
                    <Icon name="mdi:arrow-left"></Icon>
                    Back
                </NuxtLink>
            </div>
            <span class=" text-xl">|</span>
            <div class="relative h-[30px] broder">
                <Icon v-if="preloader" name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-2xl"></Icon>
                <h1 v-else class="text-2xl font-bold">{{ customer?.name }}</h1>
            </div>
        </div>
        <hr class="my-3">
        <div v-if="preloader" class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-4xl"></Icon>
        </div>
        <div v-else class="flex flex-col gap-5">
            <div>
                <h1 class="font-bold text-2xl">Avater</h1>
                <AvatarRoot class="bg-blackA3 inline-flex h-[72px] w-[72px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                    <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="customer?.profile_picture" alt="Colm Tuite" />
                    <AvatarFallback class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-gray-300 text-white text-[15px] font-medium" :delay-ms="600">
                        {{ customer?.name.split(' ').map((i: string) => i[0].toUpperCase()).join('') }}
                    </AvatarFallback>
                </AvatarRoot>
            </div>
            <h1 class="font-bold text-2xl">Email</h1>
            <p>{{ customer?.email }}</p>
        </div>
    </div>
</template>