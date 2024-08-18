<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { IpaginatedRespoinse } from '~/types/response';
import type { IProduct, IReview } from '~/types/products';
import { getFileUrl } from '~/helper';

interface Props {
    product: IProduct
}

const props = defineProps<Props>()


const preloader = ref(false)

const responseParams = ref({
    page: 1,
    per_page: 10,
})

const moreData = ref(true)

const data = ref<IReview[]>([])

// methods
const fetchData = async (params = {}) => {
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/review/product/${props.product.id}?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<IpaginatedRespoinse<IReview>>(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response) {
            responseParams.value.page = response.current_page
            data.value = response.data
            moreData.value = response.last_page === response.current_page
            return response
        } else {
            console.error("Invalid response format")
            return []
        }
    } catch (error) {
        console.error(error)
        return []
    } finally {
        preloader.value = false
    }
}
const nextPage = () => {
    responseParams.value.page++
    fetchData(responseParams.value)
}
const previousPage = () => {
    responseParams.value.page--
    fetchData(responseParams.value)
}

onMounted(() => {
    fetchData(responseParams.value)
})
</script>

<template>
    <div class="my-5">
        <div class="flex items-center justify-between mb-5">
            <div class="flex justify-between">
                <h1 class="text-2xl font-bold">Reviews</h1>
            </div>
            <div class="flex gap-3 my-2">
                <button :disabled="responseParams.page <= 1"
                    class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                    @click="previousPage">Previous</button>
                <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
                    @click="nextPage">Next</button>
            </div>
        </div>
        <div class="relative">
            <div v-for="(review, index) in data" :key="`review-${index}-${review.id}`">
                <div>
                    <div class="flex items-center gap-2">
                        <div><img class="w-6 h-6 rounded-full"
                                :src="review.user.profile_picture ? getFileUrl(review.user.profile_picture) : ''"
                                alt="avatar"></div>
                        <div>{{ review.user.name }}</div>
                    </div>
                    <div>
                        <div class="flex items-center my-3">
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': review.rating >= 1 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': review.rating >= 2 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': review.rating >= 3 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': review.rating >= 4 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': review.rating >= 5 }"></Icon>
                        </div>
                        <div>{{ review.comment }}</div>
                    </div>
                </div>
                <hr class="my-3">
            </div>
            <div v-if="preloader"
                class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
                <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
            </div>
        </div>
    </div>
</template>
