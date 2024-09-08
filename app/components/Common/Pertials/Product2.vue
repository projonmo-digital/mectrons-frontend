<script setup lang="ts">
import type { IProduct } from '~/types/products';
import Rating from '@/components/Seller/Review/Rating.vue'

const cartStore = useCartStore();

interface Props {
    product: IProduct
}

const props = defineProps<Props>()
const loading = ref(false);

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
    <div class="flex gap-4">
        <div class="relative w-28 h-36 md:h-36 md:w-44">
            <nuxt-link :to="`/products/${props.product?.id}`" class="flex justify-center items-center overflow-hidden">
                <img class="object-cover rounded-t-lg w-28 h-36 md:h-36 md:w-44 md:rounded-none md:rounded-s-lg"
                    v-if="props.product?.picture.length"
                    :src="useRuntimeConfig().public.imageUrl + '/' + props.product?.picture[0].replaceAll('public', 'storage')"
                    alt="Product" />
                <img class="object-cover rounded-t-lg w-28 h-36 md:h-36 md:w-44 md:rounded-none md:rounded-s-lg" v-else
                    src="assets/images/dummy-image.jpg" alt="Ads" />
            </nuxt-link>
            <span @click="!!product?.is_bookmarked ? bookmarkRemove(product) : bookmarkAdd(product)"
                class="w-8 h-8 absolute top-3 left-3 text-gray-300 rounded-full flex justify-center items-center cursor-pointer">
                <Icon v-if="loadingBookmark" name="eos-icons:loading" class="w-8 h-8">
                </Icon>
                <Icon v-else name="mdi:heart" class="w-8 h-8"
                    :class="{ 'text-red-500': !!product?.is_bookmarked }">
                </Icon>
            </span>
        </div>
        <div class="flex flex-col justify-between py-2 pe-2 w-[calc(100%-11rem)] md:w-[calc(100%-13rem)]">
            <div class="flex gap-3 items-center">
                <Rating :model-value="product.reviews[0]?.average_rating" />
                <span class="text-sm text-white">({{ product.reviews[0]?.total_reviews || 0 }} Reviews)</span>
            </div>

            <h5 class="text-sm font-bold text-white">
                <nuxt-link :to="`/products/${product.id}`">
                    {{ product.title }}
                </nuxt-link>
            </h5>

            <div class="flex items-center gap-x-1">
                <span v-if="product.discount" class="text-xs px-1 py-0.5 bg-primary text-white rounded-lg">-30%</span>
                <div class="flex items-center gap-x-2">
                    <span class="text-lg font-bold  text-[rgba(215,_14,_14,_1)]">
                        {{ product?.currency?.symbol }} {{ product.discount ? (product.price - (product?.price / 100 *
                product.discount)) : product.price }}
                    </span>
                    <span v-if="product.discount" class="text-md line-through text-gray-400">{{
                product?.currency?.symbol }} {{ product?.price }}</span>
                </div>
            </div>

            <div class="flex mt-3">
                <button @click="addToCart(product)" type="button"
                    class="flex items-center focus:outline-none text-white bg-[rgba(245,_127,_32,_1)] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5  dark:focus:ring-yellow-900">
                    <div role="status" v-if="!loading">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
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
                    <div class="mx-2">Add to cart</div>
                </button>
            </div>
        </div>
    </div>
</template>