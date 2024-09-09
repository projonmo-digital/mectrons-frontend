<script setup lang="ts">
import type { ICartProduct } from '~/types/cart';

const cartStore = useCartStore()

interface IProps {
    product: ICartProduct
}
const props = defineProps<IProps>()
</script>
<template>
    <div class="flex flex-col lg:flex-row gap-1 items-start lg:items-center">
        <div class="flex-1 flex items-start">
            <nuxt-link :to="`/products/${product.id}`">
                <img class="w-20 h-20 rounded-md object-cover" v-if="product?.picture.length"
                    :src="useRuntimeConfig().public.imageUrl + '/' + product?.picture[0].replaceAll('public', 'storage')"
                    alt="Product" />
                <img class="w-20 h-20 rounded-md object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
            </nuxt-link>
            <div class="flex-1 min-w-0 ms-4">
                <div class="flex item-center text-gray-500 gap-2 capitalize">
                    <NuxtLink class="text-xs hover:underline" :to="`/category/${product.category.id}`">{{ product.category.name }}</NuxtLink>
                    <span class="text-xs">|</span>
                    <NuxtLink class="text-xs hover:underline" :to="`/category/${product.category.id}`">{{ product.user.name }}</NuxtLink>
                </div>
                <h2 class="text-sm --font-medium text-gary-500 hover:underline notranslate">
                    <nuxt-link :to="`/products/${product?.id}`">{{ product.title }}</nuxt-link>
                </h2>
                <div class="flex items-center gap-2">
                    <div class="flex items-center flex-wrap gap-x-2">
                        <span class="text-xl font-bold  text-primary">{{ product?.currency?.symbol }} {{
                            product.discount ? (product.price - (product?.price / 100 * product.discount)) :
                                product.price
                            }}</span>
                        <span v-if="product.discount" class="text-lg line-through text-gray-400">{{
                            product?.currency?.symbol }} {{ product?.price }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-xs flex items-center gap-3">
            <icon class="w-8 h-8 rounded-md text-gray-500 bg-gray-100 p-1.5 hover:text-red-400 dark:text-white cursor-pointer"
                        name="ep:delete" @click="cartStore.removeFromCart(product)" />
            <div class="relative flex items-center max-w-[8rem]">
                <button @click="cartStore.decrement(product)" type="button" id="decrement-button"
                    data-input-counter-decrement="quantity-input"
                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 1h16" />
                    </svg>
                </button>
                <input type="text" :value="product.qty" id="quantity-input" data-input-counter disabled
                    class="bg-gray-50 border-x-0 h-8 text-center text-gray-900 text-sm border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button @click="cartStore.increment(product)" type="button" id="increment-button"
                    data-input-counter-increment="quantity-input"
                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
        </div>

    </div>
</template>