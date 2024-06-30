<script setup>
const auth = useAuthStore();
const cart = useCartStore();
const props = defineProps(['product'])

// Bookmark
const bookmarkAdd = async (product) => {
    const token = useTokenStore();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (data) {
            product.is_bookmarked = 1;
        }
    } catch (error) {
        console.log(error);
    }
}

const bookmarkRemove = async (product) => {
    const token = useTokenStore();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        if (data) {
            product.is_bookmarked = 0;
        }
    } catch (error) {
        console.log(error);
    }
}

const AddToCart = (product) => {
    product.qty = 1;
    cart.AddToCart(product);
}
</script>

<template>
    <div class="card h-[497px] shadow-xl w-[292px]">
        <div
            class="relative flex h-full  w-[292px]   flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <nuxt-link :to="`/product-details/${props.product?.id}`"
                class="flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]">
                <img class="object-cover" v-if="props.product?.picture != ''"
                    :src="useRuntimeConfig().public.imageUrl + '/' + props.product?.picture[0].replaceAll('public', 'storage')"
                    alt="Product" />
                <img class="object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
            </nuxt-link>
            <div v-if="auth?.user?.id != props.product?.user_id">
                <span v-if="props.product.is_bookmarked == 0" @click="bookmarkAdd(props.product)"
                    class="absolute top-2 left-3 rounded-full text-center text-2xl font-medium">
                    <i class="fa-solid fa-heart"></i>
                </span>
                <span v-else @click="bookmarkRemove(props.product)"
                    class="absolute top-2 left-3 rounded-full text-center text-2xl font-medium text-[rgb(223,_120,_37,_1)]">
                    <i class="fa-solid fa-heart"></i>
                </span>
            </div>
            <div class="mt-4 px-5 pb-5">
                <div class="flex items-center">
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

                <hr class="mt-3">
                <div class="flex items-center mt-3">

                    <nuxt-link :to="`/product-details/${props.product?.id}`">
                        <h5 class="text-sl font-bold tracking-tight ">{{ props.product?.title }}</h5>
                    </nuxt-link>
                </div>
                <hr class="mt-3">
                <div class="mt-3 mb-5 flex items-center justify-between">

                    <div class="flex items-center gap-x-1">
                        <span class="text-sm px-1 py-0.5 bg-primary text-white rounded-lg">-30%</span>
                        <div class="flex items-center gap-x-2">
                            <span class="text-xl font-bold  text-primary">{{
                                props.product?.currency?.symbol }}{{ product?.price }}</span>
                            <span class="text-lg line-through text-gray-400">$180.00</span>
                        </div>
                    </div>

                </div>
                <button @click="AddToCart(props.product)" type="button"
                    class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
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