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

    <div class="card bg-gray-900/20 rounded-lg ">
        <div class="flex gap-4">
            <div class="relative w-28 h-36 md:h-36 md:w-44">
                <nuxt-link :to="`/product-details/${props.product?.id}`"
                    class="flex justify-center items-center overflow-hidden">
                    <img class="object-cover rounded-t-lg w-28 h-36 md:h-36 md:w-44 md:rounded-none md:rounded-s-lg"
                        v-if="props.product?.picture != ''"
                        :src="useRuntimeConfig().public.imageUrl + '/' + props.product?.picture[0].replaceAll('public', 'storage')"
                        alt="Product" />
                    <img class="object-cover rounded-t-lg w-28 h-36 md:h-36 md:w-44 md:rounded-none md:rounded-s-lg"
                        v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                </nuxt-link>

                <div v-if="auth?.user?.id != props.product?.user_id">
                    <span v-if="props.product.is_bookmarked == 0" @click="bookmarkAdd(props.product)"
                        class="absolute top-2 left-3 rounded-full text-center text-2xl font-medium">
                        <span class="w-5"><i class="fa-solid fa-heart"></i></span>
                    </span>
                    <span v-else @click="bookmarkRemove(props.product)"
                        class="absolute top-2 left-3 rounded-full text-center text-2xl font-medium text-[rgb(223,_120,_37,_1)]">
                        <span class="w-5"><i class="fa-solid fa-heart"></i></span>
                    </span>
                </div>
            </div>
            <div class="flex flex-col justify-between py-2 pe-2 w-[calc(100%-11rem)] md:w-[calc(100%-13rem)]">
                <div class="flex items-center">
                    <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-3 h-3 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg class="w-3 h-3 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p class="ms-1 text-xs font-medium text-gray-500 dark:text-gray-400">(75)</p>
                </div>

                <h5 class="text-sm font-bold tracking-tight ">
                    <nuxt-link :to="`/product-details/${props.product?.id}`">
                        {{ props.product?.title }}
                    </nuxt-link>
                </h5>

                <div class="flex items-center gap-x-1">
                    <span class="text-xs px-1 py-0.5 bg-[rgba(245,_127,_32,_1)] text-white rounded-lg">-30%</span>
                    <div class="flex items-center gap-x-2">
                        <span class="text-lg font-bold  text-[rgba(215,_14,_14,_1)]">{{ props.product?.currency?.symbol
                            }}{{ product?.price }}</span>
                        <span class="text-md line-through text-gray-400">$180.00</span>
                    </div>
                </div>

                <div class="flex mt-3">
                    <button @click="AddToCart(props.product)" type=" submit"
                        class="text-sm focus:outline-none text-white bg-[rgba(245,_127,_32,_1)] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-3 py-1.5  dark:focus:ring-yellow-900">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>