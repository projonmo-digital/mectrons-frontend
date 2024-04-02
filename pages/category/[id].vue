<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})
useSeoMeta({
  title: 'Categories Products - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})


const route = useRoute();

const products = ref([]);
const getProducts = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`,{
            method: 'POST',
            body: {
                marker:['best-sale'],
            }
        });
        products.value = data.value.data;
    }catch(error){
        console.log(error);
    }
}
getProducts();

console.log(route);

const otherproducts = ref([]);
const getOtherProducts = async() => {
    refreshNuxtData();
    const token = useTokenStore();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/search?category=${route.params.id}`,{
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.getToken}`,
            },
        });
        otherproducts.value = data.value.data;
    }catch(error){
        console.log(error);
    }
}
getOtherProducts();



const priceFilterFun = (event) => {
    getSearchDatas(event,'price');
}
const adsCheckData = ref();
const typeCheckedFun = (event) => {
    adsCheckData.value = event
}
const catCheckData = ref();
const catCheckedFun = (event) => {
    catCheckData.value = event
}
const condCheckData = ref();
const condCheckedFun = (event) => {
    condCheckData.value = event
}
const stateCheckData = ref();
const stateCheckedFun = (event) => {
    stateCheckData.value = event
}

const searchDatas = ref([]);
const getSearchDatas = async(value, action) => {
    let obj;
    if(action == 'price'){
        obj = { price:[value.value.min,value.value.max] }
    }else if(action == 'type'){
        obj = { type:value }
    }else if(action == 'category'){
        obj = { category:value }
    }else if(action == 'condition'){
        obj = { condition:value }
    }else if(action == 'location'){
        obj = { location:value }
    }
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`,{
            method: 'POST',
            body: obj
        });
        otherproducts.value = data.value.data;
    }catch(error){
        console.log(error);
    }
}

watch(() => adsCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(adsCheckData.value,'type');
    }
  },
  {deep: true}
);
watch(() => catCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(catCheckData.value,'category');
    }
  },
  {deep: true}
);
watch(() => condCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(condCheckData.value,'condition');
    }
  },
  {deep: true}
);
watch(() => stateCheckData.value, async (currentValue) => {
    if(currentValue.value.length > 0){
        getSearchDatas(stateCheckData.value,'location');
    }
  },
  {deep: true}
);


</script>
<template>
    <div class="content">
        <div class="max-w-screen-2xl block md:flex justify-between gap-x-4 h-full mx-auto px-4">

            <Sidebar @priceFilter="priceFilterFun" @catChecked="catCheckedFun($event)" @condChecked="condCheckedFun($event)" @stateChecked="stateCheckedFun($event)" @typeChecked="typeCheckedFun($event)"></Sidebar>

            <div class="lg:w-[calc(100%-16rem)]">
                <div class="py-6">
                    <nav class="flex mb-3" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li class="inline-flex items-center">
                                <a href="#" class="inline-flex items-center text-xs font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <a href="#" class="ms-1 text-xs font-normal text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
                                </div>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span class="ms-1 text-xs font-normal text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                

                    <!-- Products -->
                    <div class="mx-auto w-full">
                        <div class="bg-white">
                            <div class="products">
                                <div class="title flex justify-between items-center gap-3 px-3 py-3 mb-4">
                                    <h4 class="text-md font-semibold">Shop by Categories </h4>
                                </div>
                                <div class="relative">
                                    <div class="slider-container slider-categories flex overflow-hidden">
                                        <div class="sliders flex gap-x-4 w-[calc(100%-90px)] mx-auto" id="sliderContent">
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 hover:scale-105 ease-in-out duration-300 hover:bg-gray-100">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-1.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title font-semibold mt-2">Brakes</h4>
                                                </nuxt-link>
                                            </div>
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 ease-in-out duration-300 hover:scale-105 hover:bg-gray-100">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-2.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title font-semibold mt-2">Tyres</h4>
                                                </nuxt-link>
                                            </div>
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 hover:scale-105 ease-in-out duration-300 hover:bg-gray-100">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-3.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title font-semibold mt-2">Lubricant</h4>
                                                </nuxt-link>
                                            </div>
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 ease-in-out duration-300 hover:scale-105 hover:bg-gray-100">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-4.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title font-semibold mt-2">Brakes</h4>
                                                </nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                            
                                    <div class="arrow">
                                        <button class="group prev absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                                            <div class="relative">
                                                <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                                                    <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                                                    </svg>
                                                </span>
                                                <span class="skew absolute w-8 h-6 left-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                                            </div>
                                        </button>

                                        <button class="group next absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                                            <div class="relative">
                                                <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                                                    <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                                    </svg>
                                                </span>
                                                <span class="skew absolute w-8 h-6 right-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                                            </div>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        
                        <div class="best-seller mt-8">
                            <div class="bg-white">
                                <div class="title flex justify-between items-center gap-3 px-3 py-2 border-b-2 mb-4">
                                    <h4 class="text-md font-semibold">Best Seller Products</h4>
                                    <div class="flex justify-end gap-2">
                                        <button class="group prev relative inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                                            <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                                                </svg>
                                            </span>
                                            <span class="skew absolute w-8 h-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                                        </button>
                                
                                        <button class="group next relative inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                                            <span class="relative z-10 text-sm font-medium text-white w-8 h-6 flex justify-center items-center">
                                                <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                                </svg>
                                            </span>
                                            <span class="skew absolute w-8 h-6 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                                        </button>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6">
                                        <ProductCard v-for="(product,index) of products" :key="product.id" :product="product"></ProductCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="search-products mt-5">
                            <div class="bg-white">
                                <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-2">
                                    <h4 class="text-md font-semibold">Search Products</h4>
                                </div>
                                <div class="title flex justify-between items-center gap-3 px-3 py-3">
                                    <h4 class="text-sm font-medium">{{ otherproducts.length }} Products</h4>
                                    <div class="flex items-center gap-x-2">
                                        <p class="text-sm text-gray-900">Sort by : </p>
                                        <form class="max-w-sm mx-auto">
                                            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Choose a country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                            </select>
                                        </form>

                                    </div>
                                </div>

                                <div class="mt-4 mb-8">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8">
                                        <ProductCard v-for="(product,index) of otherproducts" :key="product.id" :product="product"></ProductCard>
                                    </div>
                                </div>

                                <nav class="flex justify-center" aria-label="Page navigation example">
                                    <ul class="flex items-center -space-x-px h-8 text-sm">
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Previous</span>
                                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                        </li>
                                        <li>
                                            <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                                        </li>
                                        <li>
                                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <span class="sr-only">Next</span>
                                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
