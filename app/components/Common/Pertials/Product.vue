<script setup lang="ts">
import { ref } from 'vue'
import type { IProduct } from '~/types/products';
import Rating from '@/components/Seller/Review/Rating.vue'

const loading = ref(false);
const cartStore = useCartStore();

interface Props {
    product: IProduct
}

const props = defineProps<Props>()

// Bookmark
const loadingBookmark = ref(false);
const bookmarkAdd = async (product: IProduct) => {
    loadingBookmark.value = true
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
    } finally {
        loadingBookmark.value = false
    }
}

const bookmarkRemove = async (product: IProduct) => {
    loadingBookmark.value = true
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
    finally {
        loadingBookmark.value = false
    }
}

const addToCart = (product: IProduct) => {
    loading.value = true
    cartStore.addToCart(product).then(() => {
        loading.value = false
    })
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
            <span
                @click="!!product?.is_bookmarked ? bookmarkRemove(product) : bookmarkAdd(product)"
                class="w-8 h-8 absolute top-3 left-3 text-gray-300 rounded-full flex justify-center items-center cursor-pointer">
                <Icon v-if="loadingBookmark" name="eos-icons:loading" class="w-8 h-8">
                </Icon>
                <Icon v-else name="mdi:heart" class="w-8 h-8"
                    :class="{ 'text-red-500': !!product?.is_bookmarked }">
                </Icon>
            </span>
        <div>
            <div class="flex gap-3 items-center py-2 px-3">
                <Rating :model-value="product.reviews[0]?.average_rating" />
                <span class="text-gray-700 text-sm">({{ product.reviews[0]?.total_reviews || 0 }} Reviews)</span>
            </div>
            <hr>
            <div class="flex items-center px-3 py-2 h-[70px]">
                <nuxt-link class="font-bold text-2xl clamp" :to="`/products/${product?.id}`" :title="product?.title">{{ product?.title
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
                    class="flex items-center rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
                    <div role="status" v-if="!loading">
                        <svg  xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div v-else role="status">
                        <svg aria-hidden="true"
                            class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </div>
                    <div class="mx-2">ADD TO CART</div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>