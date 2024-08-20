<script setup lang="ts">
import { ref } from 'vue'
import type { IProduct } from '~/types/products';

const { categories } = storeToRefs(useAppStore())
const { user } = storeToRefs(useAuthStore())

const loading = ref(false);
const cartStore = useCartStore();

interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// Bookmark
const bookmarkAdd = async (product: IProduct) => {
    const token = useCookie('token')
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product.id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (response) {
            product.is_bookmarked = 1;
        }
    } catch (error) {
        console.log(error);
    }
}

const bookmarkRemove = async (product: IProduct) => {
    const token = useCookie('token');
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product.id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (response) {
            product.is_bookmarked = 0;
        }
    } catch (error) {
        console.log(error);
    }
}

const addToCart = (product: IProduct) => {
    cartStore.addToCart(product)
}
</script>

<template>
    <div
        class="border relative border-transparent hover:border-gray-200 shadow-md hover:shadow-xl rounded-xl overflow-hidden my-5 bg-white notranslate">
        <nuxt-link :to="`/products/${product.id}`">
            <img class="h-[200px] w-full object-cover" v-if="product?.picture.length"
                :src="useRuntimeConfig().public.imageUrl + '/' + product.picture[0]?.replaceAll('public', 'storage')"
                alt="Product" />
            <img class="h-[200px] w-full object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
        </nuxt-link>
        <Icon v-if="user?.type === 'buyer'" name="mdi:heart" class="w-8 h-8 absolute top-3 left-3 text-gray-300 cursor-pointer"
            @click="!!product?.is_bookmarked ? bookmarkRemove(product) : bookmarkAdd(product!)"
            :class="{ 'text-red-500': !!product.is_bookmarked }"></Icon>
        <div>
            <div class="flex gap-3 items-center py-2 px-3">
                <div class="flex items-center my-3">
                    <Icon name="mdi:star" class="text-xl text-gray-300"
                        :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 1 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300"
                        :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 2 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300"
                        :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 3 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300"
                        :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 4 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300"
                        :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 5 }"></Icon>
                </div>
                <span class="text-gray-700 text-sm">({{ product.reviews[0]?.total_reviews || 0 }} Reviews)</span>
            </div>
            <hr>
            <div class="flex items-center px-3 py-2">
                <nuxt-link class="text-xl font-bold" :to="`/products/${props.product?.id}`">{{ props.product?.title
                    }}</nuxt-link>
            </div>
            <hr>
            <div class="px-3 py-2">
                <div class="flex items-center gap-x-1">
                    <span v-if="product.discount" class="text-sm px-1 py-0.5 bg-primary text-white rounded-lg">-{{
                        product.discount }}%</span>
                    <div class="flex items-center flex-wrap gap-x-2">
                        <span class="text-xl font-bold  text-primary">{{ product?.currency?.symbol }} {{
                            product.discount ? (product.price - (product?.price / 100 * product.discount)) : product.price
                            }}</span>
                        <span v-if="product.discount" class="text-lg line-through text-gray-400">{{
                            product?.currency?.symbol }} {{ product?.price }}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center py-3">
                <button @click="addToCart(product)" type="button"
                    class="flex items-center justify-center mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    ADD TO CART
                </button>
            </div>
        </div>
    </div>
</template>