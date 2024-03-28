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
const ProductView = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/view-product/${route.params.id}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        productview.value = data.value?.product;
        productsuggestion.value = data.value?.suggestion?.data;
        showImage.value = productview.value?.picture[0];

        if(productview.value){
            useSeoMeta({
                title: `${productview.value?.title ? productview.value?.title : 'Product View - My Amazing Site'}`,
                ogTitle: 'My Amazing Site',
                description: 'This is my amazing site, let me tell you all about it.',
                ogDescription: 'This is my amazing site, let me tell you all about it.',
                ogImage: 'image',
                twitterCard: 'image',
            })
        }
    }catch(error){
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
  if(quantity.value >= 2){
    quantity.value - 1;
  }
}
const Increment = () => {
  if(quantity.value <= 1000){
    quantity.value + 1;
  }
}
const BuyNowBtn = (product) => {
  product.qty = quantity.value;
  cart.AddToCart(product);
}



</script>
<template>
<div class="flex">
    <div class="font-[sans-serif]">
        <div class="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
            <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
                <div class="w-full lg:sticky top-0 ">
                    <div class="h-96 shadow rounded-lg overflow-hidden">
                        <img class="w-full h-96 rounded-lg object-cover transition duration-150 ease-out cursor-zoom-in" @mouseenter="imageMouseEnter" @mouseleave="imageMouseLeave" @mousemove="imageMouseMove" v-if="productview?.picture" :src="useRuntimeConfig().public.imageUrl+'/'+showImage?.replaceAll('public','storage')" alt="Product" :style="`transform: scale(${transformScale}); transform-origin: ${xBy} ${yBy};`"/>
                        <img class="w-full h-96 rounded-lg object-cover transition duration-150 ease-out cursor-zoom-in" @mouseenter="imageMouseEnter" @mouseleave="imageMouseLeave" @mousemove="imageMouseMove" v-else src="assets/images/dummy-image.jpg" alt="Product" :style="`transform: scale(${transformScale}); transform-origin: ${xBy} ${yBy};`"/>
                    </div>
                    <div class="grid items-start grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6  mt-2">
                        <div class="shadow" v-for="(image,index) in productview?.picture" :key="index">
                          <img class="w-full cursor-pointer rounded-xl border border-gray-400 p-0.5" @click="showImage = image" :src="useRuntimeConfig().public.imageUrl+'/'+image?.replaceAll('public','storage')" alt="Ads" />
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
                      <span class="text-[rgba(217,_106,_16,_1)] text-2xl font-bold">{{ productview?.currency?.symbol }}{{ productview?.price }}</span>
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
                            <button @click="Decrement" type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-2 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="text" v-model="quantity" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full px-1.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                            <button @click="Increment" type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-2 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                        <button class="bg-gray-200 w-8 h-8 rounded-full ms-5 me-5"><i class="fa-solid fa-heart"></i></button>
                        <button class="bg-[rgba(217,_106,_16,_1)] text-white w-8 h-8 rounded-lg"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                    <div class="flex flex-wrap  mt-12">
                        <button @click=BuyNowBtn(productview) type="button" class="w-full rounded-xl px-4 py-3 bg-[rgba(217,_106,_16,_1)] hover:bg-gray-900 text-white text-sm font-bold rounded-sm">BUY
                            IT NOW</button>
                    </div>

                    <div class="flex justify-between items-center mt-6">
                        <h1>Sold By</h1>
                        <h1><i class="fa-solid fa-comments me-2 text-[rgba(217,_106,_16,_1)]"></i>Chat Now</h1>
                    </div>
                    <div class="flex items-center gap-x-3 mt-4">
                        <img class="w-12 h-12 rounded-full" v-if="productview?.user?.profile_picture" :src="common?.defaultProfilePic(productview?.user?.profile_picture) == 0 ? productview?.user?.profile_picture : useRuntimeConfig().public.imageUrl+productview?.user?.profile_picture" alt="profile picture">
                        <div class="font-medium text-gray-900 dark:text-white">
                            <nuxt-link :to="`/${productview?.user?.name?.replaceAll(' ','-')}/${productview?.user?.id}/products`">{{ productview?.user?.name }}</nuxt-link>
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

            <div class="flex justify-between">
                
                   
            </div>
        </div>
    </div>

    <div class="p-6 ">
        <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-xl font-bold ">Stay Safe</h5>
            </a>
            <hr class="mb-2">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Torem ipsum dolor sit amet, consectetur adipiscing
                elit. </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Nunc vulputate libero et velit interdum, ac
                aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra </p>

            <a href="#" class="inline-flex items-center  text-xl font-medium text-center">
                Read more
                <i class="fa-solid fa-angle-right ms-3 mt-1"></i>
            </a>
        </div>
        <div class="py-6 px-3 mt-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <figcaption class="flex items-center justify-start ">
                <img class="rounded-full w-10 h-10 " src="assets/images/shipping.png" alt="profile picture">
                <div class="space-y-0.5  dark:text-white text-left rtl:text-right ms-3">
                    <div>Free Shipping</div>
                    <div class=" text-gray-500 dark:text-gray-400">For orders from $50</div>
                </div>
            </figcaption>
            <figcaption class="flex items-center justify-start mt-5 mb-5">
                <img class="rounded-full w-10 h-10 " src="assets/images/247.png" alt="profile picture">
                <div class="space-y-0.5  dark:text-white text-left rtl:text-right ms-3">
                    <div>Support 24/7</div>
                    <div class=" text-gray-500 dark:text-gray-400">Call us anytime</div>
                </div>
            </figcaption>
            <figcaption class="flex items-center justify-start ">
                <img class="rounded-full w-10 h-10 " src="assets/images/percent.png" alt="profile picture">
                <div class="space-y-0.5  dark:text-white text-left rtl:text-right ms-3">
                    <div>100% Safety</div>
                    <div class=" text-gray-500 dark:text-gray-400">Only Secure payments</div>
                </div>
            </figcaption>

        </div>

        
    </div>
</div>

<div class="flex  gap-x-8">
    <div class="w-full md:w-9/12">

        <div class="flex justify-center mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-styled-tab" data-tabs-target="#styled-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Description</button>
                </li>
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-styled-tab" data-tabs-target="#styled-dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Specification</button>
                </li>
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-styled-tab" data-tabs-target="#styled-settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Reviews</button>
                </li>

            </ul>
        </div>
        <div id="default-styled-tab-content">
            <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-profile" role="tabpanel" aria-labelledby="profile-tab">
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ productview?.description }}</p>
            </div>
            <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr class="border-gray-200 dark:border-gray-700 flex">
                        <th scope="row" class="px-6 py-2 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Category : 
                        </th>
                        <td class="px-6 py-2">
                            {{ productview?.category?.name }}
                        </td>
                    </tr>
                    <tr class="border-gray-200 dark:border-gray-700 flex">
                        <th scope="row" class="px-6 py-2 w-28 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
            <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-settings" role="tabpanel" aria-labelledby="settings-tab">
                <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
            </div>

        </div>

    </div>
    <div class="w-full md:w-3/12 mt-3 gap-4">
        <div class="text-xl font-bold flex justify-center ">Products from Seller </div>
        <div class="card-1 all Tips mx-4  mt-4">
            <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                    <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                    <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                        <i class="fa-solid fa-heart"></i></span>
                </a>
                <div class="mt-4 px-5 pb-5">
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                        <a href="#">

                        </a>
                    </div>
                    <hr class="mt-3">
                    <div class="flex items-center mt-3">

                        <a href="#">
                            <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                        </a>
                    </div>
                    <hr class="mt-3">
                    <div class="mt-3 mb-5 flex items-center justify-between">

                        <p>
                            <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                            <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                            <span class="text-xl line-through ms-2">$180.00</span>
                        </p>

                    </div>
                    <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        ADD TO CART </a>
                </div>
            </div>

        </div>
        <div class="card-1 all Tips mx-4  mt-4">
            <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                    <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                    <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                        <i class="fa-solid fa-heart"></i></span>
                </a>
                <div class="mt-4 px-5 pb-5">
                    <div class="flex items-center">
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                        </svg>
                        <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                        <a href="#">

                        </a>
                    </div>
                    <hr class="mt-3">
                    <div class="flex items-center mt-3">

                        <a href="#">
                            <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                        </a>
                    </div>
                    <hr class="mt-3">
                    <div class="mt-3 mb-5 flex items-center justify-between">

                        <p>
                            <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                            <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                            <span class="text-xl line-through ms-2">$180.00</span>
                        </p>

                    </div>
                    <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        ADD TO CART </a>
                </div>
            </div>

        </div>
    </div>
</div>


<div class="mx-6 text-xl font-bold">Related Products</div>
<div class="flex justify-end gap-2 mx-16 ">
    <button class="btn bg-[rgba(245,_127,_32,_1)] text-white w-6"><i class="fa-solid fa-angle-left"></i></button>
    <button class="btn bg-[rgba(245,_127,_32,_1)] text-white w-6"><i class="fa-solid fa-angle-right"></i></button>
</div>
<hr class="mb-5 mt-1 mx-6">
<!-- Carousel wrapper -->
<div class=" rounded-lg md:h-128 lg:h-full mb-5">
    <!-- Item 1 -->
    <div class="">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-10">
            <div class="card-1 all Tips mx-4">
                <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                        <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                        <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                            <i class="fa-solid fa-heart"></i></span>
                    </a>
                    <div class="mt-4 px-5 pb-5">
                        <div class="flex items-center">
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                            <a href="#">

                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="flex items-center mt-3">

                            <a href="#">
                                <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="mt-3 mb-5 flex items-center justify-between">

                            <p>
                                <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                                <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                                <span class="text-xl line-through ms-2">$180.00</span>
                            </p>

                        </div>
                        <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            ADD TO CART </a>
                    </div>
                </div>

            </div>
            <div class="card-1 all Tips mx-4">
                <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                        <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                        <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                            <i class="fa-solid fa-heart"></i></span>
                    </a>
                    <div class="mt-4 px-5 pb-5">
                        <div class="flex items-center">
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                            <a href="#">

                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="flex items-center mt-3">

                            <a href="#">
                                <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="mt-3 mb-5 flex items-center justify-between">

                            <p>
                                <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                                <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                                <span class="text-xl line-through ms-2">$180.00</span>
                            </p>

                        </div>
                        <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            ADD TO CART </a>
                    </div>
                </div>

            </div>
            <div class="card-1 all Tips mx-4">
                <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                        <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                        <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                            <i class="fa-solid fa-heart"></i></span>
                    </a>
                    <div class="mt-4 px-5 pb-5">
                        <div class="flex items-center">
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                            <a href="#">

                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="flex items-center mt-3">

                            <a href="#">
                                <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="mt-3 mb-5 flex items-center justify-between">

                            <p>
                                <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                                <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                                <span class="text-xl line-through ms-2">$180.00</span>
                            </p>

                        </div>
                        <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            ADD TO CART </a>
                    </div>
                </div>

            </div>
            <div class="card-1 all Tips mx-4">
                <div class=" relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a class="relative  flex h-60 overflow-hidden  justify-center bg-[rgba(239,_239,_239,_1)]" href="#">
                        <img class="object-cover" src="assets/images/product-2.png" alt="product image" />
                        <span class="absolute top-0 left-0 m-2 rounded-full px-2 text-center text-2xl font-medium">
                            <i class="fa-solid fa-heart"></i></span>
                    </a>
                    <div class="mt-4 px-5 pb-5">
                        <div class="flex items-center">
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <svg aria-hidden="true" class="h-5 w-5 text-[rgba(239,_239,_239,_1)]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                </path>
                            </svg>
                            <span class="rounded  px-2.5 py-0.5 text-xs font-semibold">(75)</span>
                            <a href="#">

                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="flex items-center mt-3">

                            <a href="#">
                                <h5 class="text-sl font-bold tracking-tight ">Apollo 2 wheel Tyre</h5>
                            </a>
                        </div>
                        <hr class="mt-3">
                        <div class="mt-3 mb-5 flex items-center justify-between">

                            <p>
                                <span class="text-xl  bg-[rgba(245,_127,_32,_1)] text-white">-30%</span>
                                <span class="text-xl font-bold  text-[rgba(215,_14,_14,_1)] ms-2">$100.00</span>
                                <span class="text-xl line-through ms-2">$180.00</span>
                            </p>

                        </div>
                        <a href="#" class="flex items-center justify-center font-bold mx-4 rounded-full bg-[rgba(239,_239,_239,_1)] text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white hover:bg-[rgba(245,_127,_32,_1)] focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            ADD TO CART </a>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <!-- Item 2 -->
    
</div>
<!-- Slider controls -->


</template>