<script setup>
import { onMounted } from 'vue'

const cart = useCartStore();
onMounted(() => {
    cart.getCartData();
})
</script>
<template>
    <header class="bg-[linear-gradient(180deg,_#F57F20_0%,_#C95E08_100%)] ">
        <div class="flex justify-between text-white py-2 ">
            <div class="flex  ms-12">
                <a href="#" class="font-medium  text-sm px-4 py-2 md:px-5 md:py-2 ">Seller Login</a>
                <a href="#" class=" font-medium  text-sm px-4 py-2 md:px-5 md:py-2">Track Order</a>
                <div class=""></div>
            </div>
            <div class="flex mt-1 gap-x-4 me-12">
                <span><i class="fa-solid fa-location-dot me-2"></i>L14, 233 Castlereagh Street, Sydney NSW 2000</span>
                <span><i class="fa-solid fa-phone me-2"></i>017************</span>
            </div>
        </div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
            crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div class="mx-auto sm:px-4 lg:px-8">
            <div class="flex items-center justify-between gap-x-5 h-16">

                <div class="flex  h-[calc(100%-8px)]">
                    <nuxt-link to="/" class="flex items-center bg-white">
                        <img src="assets/images/mectron-logo.png" alt="">
                    </nuxt-link>
                </div>



                <form class="w-2/3">
                    <div class="flex mx-5">
                        <div class="relative w-full mx-4">
                            <input type="search" id="search-dropdown"
                                class="block p-2  py-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search all parts here" required />
                            <button type="submit"
                                class="absolute top-0 end-0 w-16 flex items-center justify-center text-sm font-medium h-full text-white bg-[linear-gradient(180deg,_#F57F20_0%,_#C95E08_100%)]  border border-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>


                <div class="flex items-center gap-x-2 text-white">
                    <nuxt-link to="/auth/login"
                        class="flex items-center gap-x-1 font-medium rounded-lg text-sm px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                        <i class="fa-solid fa-user me-2"></i>Login</nuxt-link>
                    <a href="#"
                        class="  font-medium rounded-lg text-sm px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                        EN/BN</a>

                    <nuxt-link to="/cart" class="relative inline-flex items-center p-3 text-sm font-medium text-center">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span class="sr-only">Notifications</span>
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                            {{ cart.carts?.quantity }}
                        </div>
                    </nuxt-link>
                </div>

            </div>
            <nav class=" flex space-x-2 py-2  justify-center text-white">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium" aria-current="page">Home</a>

                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                    class="focus:outline-none  font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">Automobiles<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div id="dropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
                <!-- Dropdown menu -->
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                    class="focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center inline-flex items-center "
                    type="button">Equipment<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div id="dropdown"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>

                    </ul>
                </div>

                <a href="#" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Electronics </a>
                <a href="#" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Service</a>
                <a href="#" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">About Us</a>
                <a href="#" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Contact</a>
            </nav>
        </div>
    </header>
</template>