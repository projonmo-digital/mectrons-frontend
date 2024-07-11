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
    <div class="max-w-screen-2xl mx-auto px-4 py-9">
        <div class="flex">
            <div class="">
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
                    <div class="w-full">
                        <div class="flex w-full gap-x-4">
                            <div class="w-[60%]">
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
                                    <span class="text-primary text-2xl font-bold">{{
                                        productview?.currency?.symbol }}{{ productview?.price }}</span>
                                    <span class="text-lg line-through text-gray-400">$180.00</span>
                                </div>
                                <div class="items-start mt-4">
                                    <div>
                                        <span class=" text-[rgba(0,_0,_0,_0.46)]">Brand:</span>
                                        <span class="">Toyota</span>
                                    </div>
                                    <div class="mt-2">
                                        <span class=" text-[rgba(0,_0,_0,_0.46)]">Availability:</span>
                                        <span class="text-primary">In Stock</span>
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
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
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
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button class="bg-gray-200 w-8 h-8 rounded-full ms-5 me-5"><i
                                            class="fa-solid fa-heart"></i></button>
                                    <button class="bg-primary text-white w-8 h-8 rounded-lg"><i
                                            class="fa-solid fa-cart-shopping"></i></button>
                                </div>
                                <div class="flex flex-wrap  mt-12">
                                    <button @click=BuyNowBtn(productview) type="button"
                                        class="w-full rounded-xl px-4 py-3 bg-primary hover:bg-gray-900 text-white text-sm font-bold ">BUY
                                        IT NOW</button>
                                </div>
                            </div>
                            <div class="w-[30%] flex flex-col gap-2 h-[335px] p-2 rounded-xl border shadow">
                                <h1 class=" text-xl font-bold">Stay Safe</h1>
                                <div class=" flex items-center">
                                    <hr class="h-2px w-full">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="24" cy="24" r="23.5" fill="#D96A10" stroke="black" />
                                        <path
                                            d="M32.318 15.982L24.3539 13.268C24.2578 13.2352 24.1289 13.2188 24 13.2188C23.8711 13.2188 23.7422 13.2352 23.6461 13.268L15.682 15.982C15.4875 16.0477 15.3281 16.2727 15.3281 16.4789V27.7852C15.3281 27.9914 15.4617 28.2633 15.6234 28.3922L23.7023 34.6875C23.7844 34.7508 23.8898 34.7836 23.9977 34.7836C24.1055 34.7836 24.2133 34.7508 24.293 34.6875L32.3719 28.3922C32.5336 28.2656 32.6672 27.9937 32.6672 27.7852V16.4789C32.6719 16.2727 32.5125 16.05 32.318 15.982ZM28.2773 19.9852L23.2945 26.8453C23.2595 26.8933 23.2137 26.9323 23.1607 26.9591C23.1078 26.986 23.0492 27 22.9898 27C22.9305 27 22.8719 26.986 22.819 26.9591C22.766 26.9323 22.7202 26.8933 22.6852 26.8453L19.7227 22.7672C19.6336 22.643 19.7227 22.4695 19.875 22.4695H21.1688C21.2883 22.4695 21.4031 22.5281 21.4734 22.6242L22.9898 24.7102L26.5266 19.8398C26.5969 19.7437 26.7094 19.6852 26.8312 19.6852H28.125C28.2773 19.6875 28.3664 19.8609 28.2773 19.9852Z"
                                            fill="#F8F8F8" />
                                    </svg>

                                </div>
                                <p class=" text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
                                    laborum,
                                    tempora, in cum tenetur
                                    enim voluptatibus beatae nobis saepe assumenda at eius voluptatum soluta ea incidunt
                                    quidem numquam
                                    a quos accusa</p>
                                <span class=" text-lg font-bold">Read more <Icon name="mdi:chevron-right"
                                        class=" text-xl"></Icon></span>
                            </div>

                        </div>

                        <div class=" flex gap-x-4">
                            <div class=" w-[60%]">
                                <div class="flex justify-between items-center mt-6">
                                    <h1>Sold By</h1>
                                    <div>
                                        <h1>
                                            <Icon name="mdi:chat-processing" class=" text-4xl text-primary"></Icon>
                                            Chat Now
                                        </h1>
                                        <h1>
                                            <Icon name="fluent:location-12-filled" class=" text-4xl text-primary">
                                            </Icon>
                                            Location
                                        </h1>
                                    </div>
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
                                <div class="grid grid-cols-3 place-items-center p-4  border-t-">
                                    <div class=" flex flex-col items-center ">
                                        <span> Postive Seller Ratings</span>
                                        <span class="font-bold text-2xl text- mt-2">83%</span>
                                    </div>
                                    <div class=" flex flex-col border-r border-l p-2 items-center ">
                                        <span class="">Ship on Time</span>

                                        <span class="font-bold text-2xl mt-2">90%</span>
                                    </div>
                                    <div class=" flex flex-col items-center ">
                                        <span>Chat Response Rate</span>
                                        <span class="font-bold  mt-2 text-2xl">100%</span>
                                    </div>
                                </div>
                            </div>
                            <div class=" w-[30%] p-4 border rounded-lg flex flex-col gap-2  justify-between ">
                                <div v-for=" i in features " class=" flex gap-x-2">
                                    <Icon :name="i.icon" class="text-6xl text-primary"></Icon>
                                    <div>
                                        <h1 class=" font-bold ">{{ i.title }}</h1>
                                        <p class=" text-xs">{{ i.text }}</p>
                                    </div>

                                </div>

                            </div>
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