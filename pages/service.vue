<script setup>
import { onMounted } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})

</script>
<template>
    <div class="content">
        <div class="max-w-screen-2xl block md:flex justify-between gap-x-4 h-full mx-auto px-4">
          
            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 md:z-0 w-64 h-screen md:relative md:h-auto transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-6 overflow-y-auto bg-[#F57F20]/35 dark:bg-gray-800 rounded-b-sm">
                    <div class="s-categories mb-3">
                        <h4 class="text-lg font-medium mb-4">Price Range</h4>
                        <form>
                            <div class="flex items-center gap-x-2">
                                <div>
                                    <label for="min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min</label>
                                    <input type="text" id="min" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                                </div> 
                                <div>
                                    <p class="pt-6">To</p>
                                </div>
                                <div>
                                    <label for="max" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max</label>
                                    <input type="text" id="max" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                                </div> 
                            </div>
                            <div class="flex justify-center mt-2">
                                <button type="submit" class="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter</button>
                            </div> 
                        </form>
                    </div>
                    <div class="s-browse-market">
                        <h4 class="text-lg font-medium mb-4">Filters</h4>

                        <h4 class="text-sm font-medium mb-3 ps-5">Brand</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Toyota</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Honda</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">BMW</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Tata</label>
                                </div>
                            </li>
                        </ul>

                        <h4 class="text-sm font-medium mb-3 ps-5">Categories</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Electornice</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Toy</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mt-3 mb-2">
                                    <label class="ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">More Categories</label>
                                </div>
                            </li>
                        </ul>
                        <h4 class="text-sm font-medium mb-3 mt-3 ps-5">Condition</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">New</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Good</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Fair</label>
                                </div>
                            </li>
                        </ul>

                        <h4 class="text-sm font-medium mb-3 mt-3 ps-5">Location</h4>
                        <ul class="space-y-2 font-normal ps-6">
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Barishal" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Barishal</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Chattogram" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Chattogram</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Dhaka" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dhaka</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Khulna" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Khulna</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Rajshahi" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rajshahi</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Rangpur" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rangpur</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Mymensingh" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Mymensingh</label>
                                </div>
                            </li>
                            <li>
                                <div class="flex items-center mb-2">
                                    <input id="default-checkbox" type="checkbox" value="Sylhet" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Sylhet</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

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
                            <div class="adses">
                                <div class="title flex justify-between items-center gap-3 px-3 py-3 mb-4">
                                    <h4 class="text-md font-semibold">Shop by Categories </h4>
                                </div>
                                <div class="relative">
                                    <div class="slider-container slider-categories flex overflow-hidden">
                                        <div class="sliders flex gap-x-4 w-[calc(100%-70px)] mx-auto" id="sliderContent">
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 hover:scale-105 ease-in-out duration-300 hover:bg-gray-100">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-1.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title font-semibold mt-2">Brakes</h4>
                                                </nuxt-link>
                                            </div>
                                            <div class="slide w-1/4 h-44 flex justify-center items-center text-center">
                                                <nuxt-link to="`/category`" class="flex flex-col items-center justify-center rounded-md w-[calc(100%-6px)] h-[calc(100%-6px)] shadow-lg p-2 bg-[#F57F20] ease-in-out duration-300 hover:scale-105">
                                                    <div class="image flex justify-center items-center">
                                                        <img src="assets/images/categories/disc-brake-2.png" alt="Image" class="w-12 h-12 object-cover">
                                                    </div>
                                                    <h4 class="title text-white font-semibold mt-2">Tyres</h4>
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
                                        <span class="prev absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                                            <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                                            </svg>
                                        </span>
                                        <span class="prev absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                                            <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="best-seller mt-5">
                            <div class="bg-white">
                                <div class="title flex justify-between items-center gap-3 px-3 py-3 border-b-2 mb-4">
                                    <h4 class="text-md font-semibold">Best Seller Products</h4>
                                    <div class="arrow flex gap-x-3">
                                        <span class="prev flex items-center justify-center w-6 h-6 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                                            <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                                            </svg>
                                        </span>
                                        <span class="prev flex items-center justify-center w-6 h-6 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                                            <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
