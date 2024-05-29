<script setup>
// const toaster = useToasterStore();
const auth = useAuthStore();
const cart = useCartStore();
const route = useRoute();
const datetime = useDateTime();
const common = useCommonFun();


const productview = ref([]);
const productsuggestion = ref([]);
const showImage = ref();
const ProductView = async () => {
    refreshNuxtData();
    const token = useTokenStore();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/view-product/${route.params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        productview.value = data.value?.product;
        productsuggestion.value = data.value?.suggestion?.data;
        showImage.value = productview.value?.picture[0];

        if (productview.value) {
            useSeoMeta({
                title: `${productview.value?.title ? productview.value?.title : 'Product View - My Amazing Site'}`,
                ogTitle: 'My Amazing Site',
                description: 'This is my amazing site, let me tell you all about it.',
                ogDescription: 'This is my amazing site, let me tell you all about it.',
                ogImage: 'image',
                twitterCard: 'image',
            })
        }
    } catch (error) {
        console.log('Somthing Wrong!');
    }
}
ProductView();

// Product Zoom
const xBy = ref(0);
const yBy = ref(0);
const transformScale = ref(1);
const imageMouseEnter = () => {
    transformScale.value = 2.5;
}
const imageMouseLeave = () => {
    transformScale.value = 1;
}
const imageMouseMove = (e) => {
    const { offsetX, offsetY, target, } = e;
    const { offsetWidth: width, offsetHeight: height } = target;
    const x = (offsetX / width) * 100;
    const y = (offsetY / height) * 100;

    xBy.value = `${x}%`;
    yBy.value = `${y}%`;
}

const quantity = ref(1);
const Decrement = () => {
    if (quantity.value >= 2) {
        quantity.value - 1;
    }
}
const Increment = () => {
    if (quantity.value <= 1000) {
        quantity.value + 1;
    }
}
const BuyNowBtn = (product) => {
    product.qty = quantity.value;
    cart.AddToCart(product);
}



</script>
<template>
    <div class="max-w-screen-2xl mx-auto px-4 py-9">
        <div class="flex">
            <div class="font-[sans-serif]">
                <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                    <div class="w-full lg:sticky top-0 ">
                        <div class="h-96 shadow rounded-lg overflow-hidden">
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
                        <div class="grid items-start grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6  mt-2">
                            <div class="shadow w-full h-full" v-for="(image, index) in productview?.picture"
                                :key="index">
                                <img class="w-full h-full cursor-pointer object-cover rounded-xl border border-gray-400 p-0.5"
                                    @click="showImage = image"
                                    :src="useRuntimeConfig().public.imageUrl + '/' + image?.replaceAll('public', 'storage')"
                                    alt="Ads" />
                            </div>
                        </div>
                    </div>
                    <div class="mx-8">
                        <div class="flex flex-wrap items-start gap-4">
                            <div>
                                <h2 class="text-xl font-bold text-gray-800">{{ productview?.title }}</h2>
                            </div>

                        </div>
                        <hr class="my-4" />
                        <div class="flex flex-wrap gap-4 mt-5">

                            <figure class="max-w-screen-md">
                                <div class="flex items-center mb-4  gap-2">
                                    <i class="fa-solid fa-star text-yellow-300"></i>
                                    <i class="fa-solid fa-star text-yellow-300"></i>
                                    <i class="fa-solid fa-star text-yellow-300"></i>
                                    <i class="fa-solid fa-star text-yellow-300"></i>
                                    <i class="fa-solid fa-star text-[rgba(217,_217,_217,_1)]"></i>
                                    <button type="button" class="text-gray-400"> 1 Reviews </button>
                                </div>

                            </figure>

                        </div>
                        <hr class="my-3" />
                        <div class="flex flex-wrap gap-x-3 items-start">
                            <span class="text-[rgba(217,_106,_16,_1)] text-2xl font-bold">{{
                                productview?.currency?.symbol }}{{ productview?.price }}</span>
                            <span class="text-lg line-through text-gray-400">$180.00</span>
                        </div>
                        <div class="items-start mt-4">
                            <div>
                                <span class=" text-[rgba(0,_0,_0,_0.46)]">Brand:</span>
                                <span class="text-[rgba(217,_106,_16,_1)]">Toyota</span>
                            </div>
                            <div class="mt-2">
                                <span class=" text-[rgba(0,_0,_0,_0.46)]">Availability:</span>
                                <span class="text-[rgba(215,_14,_14,_1)]">In Stock</span>
                            </div>
                        </div>
                        <div class="inline-flex items-center mt-5">
                            <span class=" dark:text-gray-300 font-bold me-5">Qty :</span>
                            <div class="relative flex items-center max-w-[7rem]">
                                <button @click="Decrement" type="button" id="decrement-button"
                                    data-input-counter-decrement="quantity-input"
                                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-2 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <input type="text" v-model="quantity" id="quantity-input" data-input-counter
                                    aria-describedby="helper-text-explanation"
                                    class="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full px-1.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="1" required />
                                <button @click="Increment" type="button" id="increment-button"
                                    data-input-counter-increment="quantity-input"
                                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-2 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <button class="bg-gray-200 w-8 h-8 rounded-full ms-5 me-5"><i
                                    class="fa-solid fa-heart"></i></button>
                            <button class="bg-[rgba(217,_106,_16,_1)] text-white w-8 h-8 rounded-lg"><i
                                    class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                        <div class="flex flex-wrap  mt-12">
                            <button @click=BuyNowBtn(productview) type="button"
                                class="w-full rounded-xl px-4 py-3 bg-[rgba(217,_106,_16,_1)] hover:bg-gray-900 text-white text-sm font-bold rounded-sm">BUY
                                IT NOW</button>
                        </div>

                        <div class="flex justify-between items-center mt-6">
                            <h1>Sold By</h1>
                            <h1><i class="fa-solid fa-comments me-2 text-[rgba(217,_106,_16,_1)]"></i>Chat Now</h1>
                        </div>
                        <div class="flex items-center gap-x-3 mt-4">
                            <img class="w-12 h-12 rounded-full" v-if="productview?.user?.profile_picture"
                                :src="common?.defaultProfilePic(productview?.user?.profile_picture) == 0 ? productview?.user?.profile_picture : useRuntimeConfig().public.imageUrl + productview?.user?.profile_picture"
                                alt="profile picture">
                            <div class="font-medium text-gray-900 dark:text-white">
                                <nuxt-link
                                    :to="`/${productview?.user?.name?.replaceAll(' ', '-')}/${productview?.user?.id}/products`">{{
                                        productview?.user?.name }}</nuxt-link>
                            </div>
                        </div>
                        <hr class="mt-10" />
                        <div class="grid grid-cols-3 ">
                            <span> Postive Seller Ratings</span>
                            <span>Ship on Time</span>
                            <span>Chat Response Rate</span>
                        </div>
                        <div class="grid grid-cols-3 text-center mt-4">
                            <span class="font-bold mt-2">83%</span>
                            <span class="font-bold mt-2">90%</span>
                            <span class="font-bold mt-2">100%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="max-w-screen-2xl mx-auto px-4 py-9">
        <div class="flex gap-x-8">
            <div class="w-full md:w-9/12">

                <div class="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab"
                        data-tabs-toggle="#default-styled-tab-content"
                        data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
                        data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
                        role="tablist">
                        <li class="me-2" role="presentation">
                            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab"
                                data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile"
                                aria-selected="false">Description</button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab"
                                aria-controls="dashboard" aria-selected="false">Specification</button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab"
                                aria-controls="settings" aria-selected="false">Reviews</button>
                        </li>

                    </ul>
                </div>
                <div id="default-styled-tab-content">
                    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel"
                        aria-labelledby="profile-tab">
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ productview?.description }}</p>
                    </div>
                    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-dashboard" role="tabpanel"
                        aria-labelledby="dashboard-tab">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                                <tr class="border-gray-200 dark:border-gray-700 flex">
                                    <th scope="row"
                                        class="px-6 py-2 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Category :
                                    </th>
                                    <td class="px-6 py-2">
                                        {{ productview?.category?.name }}
                                    </td>
                                </tr>
                                <tr class="border-gray-200 dark:border-gray-700 flex">
                                    <th scope="row"
                                        class="px-6 py-2 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Condition :
                                    </th>
                                    <td class="px-6 py-2">
                                        {{ productview?.condition?.name }}
                                    </td>
                                </tr>
                                <!-- <tr class="border-gray-200 dark:border-gray-700 flex">
                            <td class="px-6 py-4 w-full flex items-center justify-center gap-x-2" colspan="2">
                                <span class="font-medium text-gray-900">Show More Details</span>
                                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                                </svg>
                            </td>
                        </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-settings" role="tabpanel"
                        aria-labelledby="settings-tab">
                        <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                                class="font-medium text-gray-800 dark:text-white">Settings tab's associated
                                content</strong>. Clicking another tab will toggle the visibility of this one for the
                            next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                    </div>

                </div>

            </div>
            <div class="w-full md:w-3/12 mt-3 gap-4">
                <h2 class="font-bold text-xl text-center mb-6 border-b border-gray-200 pb-3">Products from Seller</h2>

                <div class="flex flex-col gap-y-4">
                    <ProductCard2></ProductCard2>
                    <ProductCard2></ProductCard2>
                </div>
            </div>
        </div>


        <div class="flex justify-between items-center mt-10">
            <h2 class="font-bold text-xl">Related Products</h2>
            <div class="flex justify-end gap-2">
                <button class="group prev relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m15 19-7-7 7-7" />
                        </svg>
                    </span>
                    <span
                        class="skew absolute w-8 h-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>

                <button class="group next relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m9 5 7 7-7 7" />
                        </svg>
                    </span>
                    <span
                        class="skew absolute w-8 h-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>
            </div>
        </div>
        <hr class="mb-5 mt-1">
        <!-- Carousel wrapper -->
        <div class=" rounded-lg md:h-128 lg:h-full mb-5">
            <!-- Item 1 -->
            <div class="">
                <div class="">
                    <Slider :product="productsuggestion"></Slider>
                </div>
            </div>
            <!-- Item 2 -->

        </div>
    </div>


</template>