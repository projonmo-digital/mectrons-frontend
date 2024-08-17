<script setup lang="ts">
import type { IProduct } from '~/types/products';

const auth = useAuthStore();
const cartStore = useCartStore();

interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// Bookmark
const bookmarkAdd = async (product: IProduct) => {
    const token = useCookie('token')
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product.id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (data) {
            product.is_bookmarked = 1;
        }
    } catch (error) {
        console.log(error);
    }
}

const bookmarkRemove = async (product: IProduct) => {
    const token = useCookie('token');
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${product.id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        if (data) {
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
    <div class="border relative border-transparent hover:border-gray-200 shadow-md hover:shadow-xl rounded-xl overflow-hidden my-5 bg-white notranslate">
        <nuxt-link  :to="`/products/${product.id}`">
            <img class="h-[200px] w-full object-cover" v-if="product?.picture.length"
                :src="useRuntimeConfig().public.imageUrl + '/' + product.picture[0]?.replaceAll('public', 'storage')"
                alt="Product" />
            <img class="h-[200px] w-full object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
        </nuxt-link>
        <Icon name="mdi:heart" class="w-8 h-8 absolute top-3 left-3 text-gray-300 cursor-pointer" @click="auth?.user?.id === product?.user_id ? bookmarkRemove(product) :bookmarkAdd(product)"
            :class="{ 'text-red-500': auth?.user?.id === props.product?.user_id }"></Icon>
        <div>
            <div class="flex items-center px-3 py-2">
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">(75)</p>
            </div>
            <hr>
            <div class="flex items-center px-3 py-2">
                <nuxt-link class="text-xl font-bold" :to="`/products/${props.product?.id}`">{{ props.product?.title }}</nuxt-link>
            </div>
            <hr>
            <div class="px-3 py-2">
                <div class="flex items-center gap-x-1">
                    <span class="text-sm px-1 py-0.5 bg-primary text-white rounded-lg">-30%</span>
                    <div class="flex items-center gap-x-2">
                        <span class="text-xl font-bold  text-primary">{{
                            props.product?.currency?.symbol }}{{ product?.price }}</span>
                        <span class="text-lg line-through text-gray-400">$180.00</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center py-3">
                <button @click="addToCart(product)" type="button" class="flex items-center justify-center mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
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