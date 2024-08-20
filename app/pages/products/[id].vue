<script setup lang="ts">
import Product from '~/components/Common/Pertials/Product.vue'
import ProductDescription from '~/components/Product/ProductDescription.vue'
import Slider from '~/components/Common/Pertials/Slider.vue'
import type { IProduct } from '~/types/products';
import type { IpaginatedRespoinse } from '~/types/response';
import { discountCalculation } from '~/helper';

const cartStore = useCartStore();
const route = useRoute();

const { categories } = storeToRefs(useAppStore())
const { user } = storeToRefs(useAuthStore())
// state
const product = ref<IProduct | null>(null)
const suggestion = ref<IProduct[]>([])
const quantity = ref(1)

// methods
const decrement = () => {
    if (quantity.value >= 2) {
        quantity.value--;
    }
}

const increment = () => {
    if (quantity.value < (product.value?.stock_amount || 0)) {
        quantity.value++;
    }
}

const addProduct = (qty: number) => {
    if (product.value) {
        cartStore.addToCart(product.value, qty)
    }
}

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

const productview = ref<any>([]);
const productsuggestion = ref<any>([]);
const showImage = ref();
const getProduct = async () => {
    try {
        const token = useCookie('token')
        const response = await $fetch<{ product: IProduct, suggestion: IpaginatedRespoinse<IProduct> }>(`${useRuntimeConfig().public.baseUrl}/view-product/${route.params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        product.value = discountCalculation(categories.value, [response.product])[0]
        suggestion.value = discountCalculation(categories.value, response.suggestion.data)

        productview.value = discountCalculation(categories.value, [response.product])[0];
        productsuggestion.value = discountCalculation(categories.value, response.suggestion.data);
        showImage.value = productview.value?.picture[0];

        if (productview.value) {
            useSeoMeta({
                title: `${productview.value?.title ? productview.value?.title : 'Product View - My Amazing Site'}`,
                ogTitle: 'My Amazing Site',
                description: 'This is my amazing site, let me tell you all about it.',
                ogDescription: 'This is my amazing site, let me tell you all about it.',
                ogImage: 'image'
            })
        }
    } catch (error) {
        console.log('Somthing Wrong!');
    }
}

const messagePanelOpen = () => {
    window.Tawk_API.setAttributes({
        'product_url': route.fullPath
    }, function (error) { });
    window.Tawk_API.maximize();
    window.Tawk_API.start();
}

onMounted(() => {
    getProduct()
})

// Product Zoom
const xBy = ref<any>(0);
const yBy = ref<any>(0);
const transformScale = ref(1);
const imageMouseEnter = () => {
    transformScale.value = 2.5;
}
const imageMouseLeave = () => {
    transformScale.value = 1;
}
const imageMouseMove = (e: any) => {
    const { offsetX, offsetY, target, } = e;
    const { offsetWidth: width, offsetHeight: height } = target;
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    xBy.value = `${x}%`;
    yBy.value = `${y}%`;
}

const features = [
    {
        icon: "mdi:truck-delivery",
        text: " For orders from $50",
        title: "FREE Shipping"
    },
    {
        icon: "mdi:hours-24",
        text: "Call us anytime",
        title: "Support 24/7 "
    },
    {
        icon: "fluent:shield-task-48-filled",
        text: " Only Secure payments",
        title: "100% Safety"
    }
];

</script>
<template>
    <div class="flex gap-3 p-5">
        <div class="flex-1">
            <div class="grid grid-cols-7">
                <div class="col-span-4 flex flex-col gap-3">
                    <div class="h-96 rounded-lg shadow-lg overflow-hidden">
                        <img class="w-full h-full rounded-lg object-cover transition duration-150 ease-out cursor-zoom-in"
                            @mouseenter="imageMouseEnter" @mouseleave="imageMouseLeave" @mousemove="imageMouseMove"
                            v-if="productview?.picture"
                            :src="useRuntimeConfig().public.imageUrl + '/' + showImage?.replaceAll('public', 'storage')"
                            alt="Product"
                            :style="`transform: scale(${transformScale}); transform-origin: ${xBy} ${yBy};`" />
                        <img class="w-full h-[405px] rounded-lg object-contain transition duration-150 ease-out cursor-zoom-in"
                            @mouseenter="imageMouseEnter" @mouseleave="imageMouseLeave" @mousemove="imageMouseMove"
                            v-else src="assets/images/dummy-image.jpg" alt="Product"
                            :style="`transform: scale(${transformScale}); transform-origin: ${xBy} ${yBy};`" />
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <div class="shadow-lg w-32 h-32 overflow-hidden" v-for="(image, index) in product?.picture"
                            :key="index">
                            <img class="w-full h-full cursor-pointer object-cover rounded-xl" @click="showImage = image"
                                :src="useRuntimeConfig().public.imageUrl + '/' + image?.replaceAll('public', 'storage')"
                                alt="Ads" />
                        </div>
                    </div>
                </div>
                <div class="col-span-3 p-5 flex flex-col gap-5">
                    <div>
                        <h1 class="text-2xl font-bold">{{ product?.title }}</h1>
                    </div>
                    <div class="flex items-center gap-2 border-y py-2">
                        <div class="flex items-center my-3">
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': Number(product?.reviews[0]?.average_rating) >= 1 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': Number(product?.reviews[0]?.average_rating) >= 2 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': Number(product?.reviews[0]?.average_rating) >= 3 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': Number(product?.reviews[0]?.average_rating) >= 4 }"></Icon>
                            <Icon name="mdi:star" class="text-xl text-gray-300"
                                :class="{ 'text-primary': Number(product?.reviews[0]?.average_rating) >= 5 }"></Icon>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col gap-4">
                            <div class="flex items-center flex-wrap gap-x-2">
                                <span class="text-2xl font-bold  text-primary">{{ product?.currency?.symbol }} {{
                                    product?.discount ? (product.price - (product?.price / 100 * product.discount)) :
                                        product?.price }}</span>
                                <span v-if="product?.discount" class="text-lg line-through text-gray-400">{{
                                    product?.currency?.symbol }} {{ product?.price }}</span>
                            </div>
                            <div class="flex gap-3"
                                v-for="(ot, index) in product?.others.filter((o: any) => ['brand', 'model'].includes(o.name))"
                                :key="ot.id">
                                <span class="text-gray-500 capitalize">{{ ot.name }}</span>
                                <span class="text-gray-500">:</span>
                                <span class="text-primary font-bold">{{ ot.value }}</span>
                            </div>
                            <div class="flex gap-3">
                                <span class="text-gray-500">Availability</span>
                                <span class="text-gray-500">:</span>
                                <span class="text-green-500" :class="{ 'text-red-500': product?.stock_amount === 0 }">{{
                                    !!product?.stock_amount ? 'In Stock' : 'Out of Stock' }}</span>
                            </div>
                            <div class="flex items-center gap-3 text-gray-500">
                                <span>Qty</span>
                                <span>:</span>
                                <div class="flex items-center gap-2 bg-gray-200 rounded-md px-2">
                                    <button class="text-gray-500 hover:text-gray-700 text-2xl"
                                        @click="decrement">-</button>
                                    <span class="text-black inline-block px-3 py-1">{{ quantity }}</span>
                                    <button class="text-gray-500 hover:text-gray-700 text-2xl"
                                        @click="increment">+</button>
                                </div>
                                <span v-if="user?.type === 'buyer'">
                                    <span
                                        @click="!!product?.is_bookmarked ? bookmarkRemove(product) : bookmarkAdd(product!)"
                                        class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                                        <Icon name="mdi:heart" class="w-5  h-5"
                                            :class="{ 'text-red-500': !!product?.is_bookmarked }">
                                        </Icon>
                                    </span>
                                </span>
                                <nuxt-link to="/pages/cart"
                                    class="bg-primary text-white p-2 w-12 h-8 flex items-center justify-center rounded-full hover:bg-orange-500">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <button v-if="product" class="w-full bg-primary text-white rounded-md p-2"
                        @click="addProduct(quantity)">BUY IT
                        NOW</button>
                    <div>
                        <div class="my-2">
                            <small class="text-gray-500 font-bold">Sold By</small>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-14 h-14 bg-gray-300">
                                    <img class="w-full h-full" :src="product?.user?.profile_picture" alt="">
                                </div>
                                <h3>{{ product?.user?.name }}</h3>
                            </div>
                            <button v-if="user?.type === 'buyer'"@click="messagePanelOpen"
                                class="flex items-center gap-2 hover:bg-primary/10 rounded-xl p-3">
                                <Icon name="fluent:chat-20-filled" class="text-primary text-2xl" />
                                <span>Chat now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 max-w-[360px] flex flex-col gap-5">
            <div class="shadow-lg bg-white p-3 rounded-lg border">
                <h1 class="text-xl font-bold">Stay Safe</h1>
                <div class="flex items-center">
                    <hr class="h-2px w-full">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="23.5" fill="#D96A10" stroke="black" />
                        <path
                            d="M32.318 15.982L24.3539 13.268C24.2578 13.2352 24.1289 13.2188 24 13.2188C23.8711 13.2188 23.7422 13.2352 23.6461 13.268L15.682 15.982C15.4875 16.0477 15.3281 16.2727 15.3281 16.4789V27.7852C15.3281 27.9914 15.4617 28.2633 15.6234 28.3922L23.7023 34.6875C23.7844 34.7508 23.8898 34.7836 23.9977 34.7836C24.1055 34.7836 24.2133 34.7508 24.293 34.6875L32.3719 28.3922C32.5336 28.2656 32.6672 27.9937 32.6672 27.7852V16.4789C32.6719 16.2727 32.5125 16.05 32.318 15.982ZM28.2773 19.9852L23.2945 26.8453C23.2595 26.8933 23.2137 26.9323 23.1607 26.9591C23.1078 26.986 23.0492 27 22.9898 27C22.9305 27 22.8719 26.986 22.819 26.9591C22.766 26.9323 22.7202 26.8933 22.6852 26.8453L19.7227 22.7672C19.6336 22.643 19.7227 22.4695 19.875 22.4695H21.1688C21.2883 22.4695 21.4031 22.5281 21.4734 22.6242L22.9898 24.7102L26.5266 19.8398C26.5969 19.7437 26.7094 19.6852 26.8312 19.6852H28.125C28.2773 19.6875 28.3664 19.8609 28.2773 19.9852Z"
                            fill="#F8F8F8" />
                    </svg>
                </div>
                <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
                    laborum,
                    tempora, in cum tenetur
                    enim voluptatibus beatae nobis saepe assumenda at eius voluptatum soluta ea incidunt
                    quidem numquam
                    a quos accusa</p>
                <a href="#" class="font-bold text-sm hover:text-primary">Read more <Icon name="mdi:chevron-right"
                        class=" text-xl"></Icon>
                </a>
            </div>
            <div class="shadow-lg bg-white p-3 rounded-lg border">
                <div v-for=" i in features " class=" flex gap-x-2">
                    <Icon :name="i.icon" class="text-6xl text-primary"></Icon>
                    <div>
                        <h1 class="font-bold ">{{ i.title }}</h1>
                        <p class="text-xs">{{ i.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="flex gap-3 p-5">
            <div class="flex-1">
                <ProductDescription :product="product" />
            </div>
            <div class="flex-1 max-w-[360px] flex flex-col gap-5">
                <h2 class="font-bold text-xl text-center">Products from Seller</h2>
                <div class="flex flex-col gap-y-4 px-3">
                    <template v-for="(product, index) in suggestion" :key="`sug-product-${product.id}`">
                        <Product v-if="index < 2" :product="product" />
                    </template>
                </div>
            </div>
        </div>
        <div class="p-5">
            <h2 class="font-bold text-xl border-b py-3">Related Products</h2>
            <template v-if="suggestion">
                <Slider :products="suggestion" :loading="false" />
            </template>
        </div>
    </div>
</template>