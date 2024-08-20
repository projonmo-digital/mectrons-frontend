<script setup lang="ts">
import type { IProduct } from '~/types/products';
const { categories } = storeToRefs(useAppStore());
const { user } = storeToRefs(useAuthStore());
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

            <Icon v-if="user?.type === 'buyer'" name="mdi:heart" class="w-8 h-8 absolute top-3 left-3 text-gray-300 cursor-pointer"
            @click="!!product?.is_bookmarked ? bookmarkRemove(product) : bookmarkAdd(product!)"
            :class="{ 'text-red-500': !!product.is_bookmarked }"></Icon>
        </div>
        <div class="flex flex-col justify-between py-2 pe-2 w-[calc(100%-11rem)] md:w-[calc(100%-13rem)]">
            <div class="flex gap-3 items-center">
                <div class="flex items-center my-3">
                    <Icon name="mdi:star" class="text-xl text-gray-300" :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 1 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300" :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 2 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300" :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 3 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300" :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 4 }"></Icon>
                    <Icon name="mdi:star" class="text-xl text-gray-300" :class="{ 'text-primary': (product.reviews[0]?.average_rating || 0) >= 5 }"></Icon>
                </div>
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
                        {{ product?.currency?.symbol }} {{ product.discount ? (product.price - (product?.price/100 * product.discount)) : product.price }}
                    </span>
                    <span v-if="product.discount" class="text-md line-through text-gray-400">{{ product?.currency?.symbol }} {{ product?.price }}</span>
                </div>
            </div>

            <div class="flex mt-3">
                <button @click="cartStore.addToCart(product)" type="button"
                    class="focus:outline-none text-white bg-[rgba(245,_127,_32,_1)] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5  dark:focus:ring-yellow-900">
                    Add to cart
                </button>
            </div>
        </div>
    </div>
</template>