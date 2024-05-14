<script setup>
import { onMounted } from 'vue';

const cart = useCartStore();
onMounted(() => {
    cart.getCartData();
})

const searchText = ref('');
const handelSearchSubmit = () => {
    refreshNuxtData();
    return navigateTo(`/search?search=${searchText.value}`);
}


const loginToggleBtnFun = async(value) => {
    let button;
    if(value == 'sellerLogin'){
        button = document?.getElementById('sellerLoginButton');
    }else{
        button = document?.getElementById('userLoginButton');
    }
    button.click();
    console.log(value)
}


</script>
<template>
    <header class="bg-[#F85606]">
        <div class="max-w-screen-2xl mx-auto pb-2">
            <div class="flex justify-between text-white py-2 bg-opacity[95%] bg-[#f2b99d24]">
                <div class="flex">
                    <button id="sellerLoginButton" data-dropdown-toggle="sellerLogin" class="font-medium  text-sm px-4 py-2 md:px-5 md:py-2 ">Seller Login</button>
                    <div id="sellerLogin" class="z-50 hidden bg-white divide-y divide-gray-100 w-full max-w-sm rounded-lg shadow dark:bg-gray-700">
                        <div aria-labelledby="sellerLoginButton">
                            <LoginForm :toggleBtn="`sellerLogin`" @loginToggleBtn="loginToggleBtnFun($event)"></LoginForm>
                        </div>
                    </div>
                    <a href="#" class=" font-medium  text-sm px-4 py-2 md:px-5 md:py-2">Track Order</a>
                    <div class=""></div>
                </div>
                <div class="flex mt-1 gap-x-4 me-6">
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
                        <nuxt-link to="/" class="flex items-center">
                            <img src="assets/images/logo.png" alt="" class="w-32 h-6">
                        </nuxt-link>
                    </div>

                    <div class="w-2/3">
                        <div class="flex mx-5">
                            <form class="relative w-full mx-4" @submit.prevent="handelSearchSubmit">
                                <input v-model="searchText" type="search" id="search-dropdown"
                                    class="block p-2  py-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search all parts here" required />
                                <button type="submit"
                                    class="absolute top-0 end-0 w-20 flex items-center justify-center text-sm font-medium h-full text-white bg-[linear-gradient(180deg,_#F85606E5_0%,_#F85606E5_0%)]  border border-white hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-e-lg">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                    </div>


                    <div class="flex items-center gap-x-2 text-white">
                        <button id="userLoginButton" data-dropdown-toggle="userLogin" class="flex items-center gap-x-1 font-medium rounded-lg text-sm px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"><i class="fa-solid fa-user me-2"></i>Login</button>
                        <div id="userLogin" class="z-50 hidden bg-white divide-y divide-gray-100 w-full max-w-sm rounded-lg shadow  dark:bg-gray-700">
                            <div aria-labelledby="userLoginButton">
                                <LoginForm :toggleBtn="`userLogin`" @loginToggleBtn="loginToggleBtnFun($event)"></LoginForm>
                            </div>
                        </div>
                        <a href="#"
                            class="  font-medium rounded-lg text-sm px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            EN/BN</a>

                        <nuxt-link to="/cart" class="relative inline-flex items-center p-3 text-sm font-medium text-center">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="sr-only">Notifications</span>
                            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                            {{ cart.carts?.quantity > 0 ? cart.carts?.quantity : 0 }}
                            </div>
                        </nuxt-link>
                    </div>

                </div>
                <nav class=" flex space-x-2 py-2  justify-center text-white">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <nuxt-link to="/" class="inline-flex items-center py-2 px-3 text-sm font-medium" aria-current="page">Home</nuxt-link>

                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                        class="focus:outline-none  font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button">Automobiles<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>

                    
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                        class="focus:outline-none  font-medium rounded-lg text-sm  py-2.5 text-center inline-flex items-center "
                        type="button">Equipment<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>


                    <a href="#" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Electronics </a>
                    <nuxt-link to="/service" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Service</nuxt-link>
                    <nuxt-link to="/about-us" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">About Us</nuxt-link>
                    <nuxt-link to="/contact-us" class="inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">Contact Us</nuxt-link>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="css" scoped>
#userLogin{
    left: -40px !important;
}
</style>