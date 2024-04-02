<script setup>
import { onMounted } from 'vue';
import { initFlowbite, Modal } from 'flowbite';
onMounted(() => {
    cart.getCartData();
    initFlowbite();
})

const cart = useCartStore();

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

const Decrement = (product) => {
  if(parseInt(product.qty) >= 2){
    product.qty = parseInt(product.qty - 1);
    cart.AddToCart(product);
  }
}
const Increment = (product) => {
  if(parseInt(product.qty) <= 1000){
    product.qty = parseInt(product.qty + 1);
    cart.AddToCart(product);
  }
}

const CheckOutBtn = () => {
    const modal = new Modal(document.getElementById('checkout-modal'), null);
    modal.show();
}


</script>
<template>
    <div class="max-w-screen-2xl mx-auto px-4 py-9">
        <div class="adses rounded flex justify-between gap-x-8 gap-y-5">
            <div class="w-3/5">
                <div class="flow-root">
                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                        <li v-if="cart.carts?.products?.length == 0" class="pt-3 pb-2 pb-0 sm:pt-4">
                            <div class="flex items-center justify-center">
                                Cart Empty!!
                            </div>
                        </li>

                        <li v-else v-for="(product,index) in cart.carts?.products" :key="index" class="pt-3 pb-2 pb-0 sm:pt-4">
                            <div class="flex items-center ">
                                <div class="flex-shrink-0">
                                    <nuxt-link :to="`/product-details/${product?.id}`">
                                        <img class="w-16 h-16 rounded-md object-cover" v-if="product?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+product?.picture[0].replaceAll('public','storage')" alt="Product" />
                                        <img class="w-16 h-16 rounded-md object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                                    </nuxt-link>
                                </div>
                                <div class="flex-1 min-w-0 ms-4">
                                    <h2 class="text-md mb-1 font-semibold text-gray-900 truncate dark:text-white">
                                        <nuxt-link :to="`/product-details/${product?.id}`">{{ product.title }}</nuxt-link>
                                    </h2>
                                    <h4 class="text-md font-medium text-gray-800 truncate dark:text-gray-200 mb-1">
                                        {{ product?.currency?.symbol }}{{ product?.price }}
                                    </h4>
                                    <svg @click="cart.RemoveCart(index)" class="w-5 h-5 text-gray-500 hover:text-red-400 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                    </svg>
                                </div>
                                <div class="max-w-xs mx-auto">
                                    <div class="relative flex items-center max-w-[8rem]">
                                        <button @click="Decrement(product,index)" type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" v-model="product.qty" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                        <button @click="Increment(product)" type="button" id="increment-button" data-input-counter-increment="quantity-input" class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div class="w-2/5">
                <div class="flow-root bg-[#FCEADC] px-5 py-3 rounded-md">
                    <ul role="list" class="">
                        <li class="pb-2">
                            <h4 class="block mt-3 mb-3 text-lg font-semibold text-gray-900 dark:text-white">Coupon Code Apply</h4>
                            <form class="flex items-center gap-x-3 mx-auto">  
                                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                                <button type="submit" class="py-2.5 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Apply
                                </button>
                            </form>
                        </li>
                        <li class="pb-3">
                            <h4 class="block mt-3 mb-3 text-md font-medium text-gray-900 dark:text-white">Delivery Type</h4>
                            <div class="col-span-2 flex items-center gap-x-8">
                                <div class="flex items-center">
                                    <input id="shipping-radio-1" type="radio" value="" name="shipping-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="shipping-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                </div>
                                <div class="flex items-center">
                                    <input checked id="shipping-radio-2" type="radio" value="" name="shipping-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <label for="shipping-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Subtotal
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ product?.currency?.symbol }}{{ cart.carts?.sum }}
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Discount
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ product?.currency?.symbol }}260
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    VAt
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ product?.currency?.symbol }}60
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Promo Code Discount
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ product?.currency?.symbol }}50
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    Total
                                </div>
                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ product?.currency?.symbol }}{{ cart.carts?.sum - 260 + 60 -50 }}
                                </div>
                            </div>
                        </li>
                        <li class="pb-3 pt-4">
                            <button @click="CheckOutBtn" type="button" class="w-full text-white flex justify-center items-center focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 bg-[rgba(245,_127,_32,_1)] hover:bg-[rgb(223,_120,_37,_1)] font-medium rounded-lg text-sm px-5 py-2.5 text-center ease-in-out duration-300">Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        
        <div class="best-seller mt-8">
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

                <div class="mt-3">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
                        <ProductCard v-for="(product,index) of products" :key="product.id" :product="product"></ProductCard>
                    </div>
                </div>
            </div>
        </div>



        <!-- Checkout Modal modal -->
        <div id="checkout-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-6xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-center text-yellow-400 dark:text-white mx-auto">
                            Mectrons
                        </h3>
                        <button type="button" class="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="checkout-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4">
                        <div class="adses rounded grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-5">
                            <div>
                                <form class="p-4 md:p-5">
                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                        <h4 class="block text-md font-medium text-gray-900 dark:text-white">Contact</h4>
                                        <div class="col-span-2 mb-3">
                                            <input type="text" name="contact" id="contact" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email or Mobile Phone Number" required="">
                                        </div>
                                        <h4 class="block text-md font-medium text-gray-900 dark:text-white">Delivery</h4>
                                        <div class="col-span-2">
                                            <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option selected="">Select category</option>
                                                <option value="TV">TV/Monitors</option>
                                                <option value="PC">PC</option>
                                                <option value="GA">Gaming/Console</option>
                                                <option value="PH">Phones</option>
                                            </select>
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <input type="text" name="fname" id="fname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="First Name" required="">
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <input type="text" name="lname" id="lname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Last Name" required="">
                                        </div>
                                        <div class="col-span-2">
                                            <input type="text" name="address" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Address" required="">                   
                                        </div>
                                        <div class="col-span-2">
                                            <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Address" required="">                   
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <input type="text" name="city" id="city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="City" required="">
                                        </div>
                                        <div class="col-span-2 sm:col-span-1">
                                            <input type="text" name="postal_code" id="postal_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Postal Code" required="">
                                        </div>
                                        <h4 class="block mt-3 text-md font-medium text-gray-900 dark:text-white">Shipping Method</h4>
                                        <div class="col-span-2">
                                            <div class="flex items-center mb-4">
                                                <input id="shipping-radio-1" type="radio" value="" name="shipping-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="shipping-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
                                            </div>
                                            <div class="flex items-center">
                                                <input checked id="shipping-radio-2" type="radio" value="" name="shipping-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                <label for="shipping-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                            </div>
                                        </div>
                                        <h4 class="block mt-3 text-md font-medium text-gray-900 dark:text-white">Payment Method</h4>
                                        <div class="col-span-2">
                                            <ul class="space-y-4 mb-4">
                                                <li>
                                                    <div for="payment-radio-1" class="flex justify-between items-center py-3 px-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                        <div class="flex items-center">
                                                            <input checked id="payment-radio-1" type="radio" value="" name="payment-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                                        </div>
                                                        <img src="assets/images/payment/bKash.png" alt="payment" class="h-6 w-12 object-contain">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div for="payment-radio-2" class="flex justify-between items-center py-3 px-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                        <div class="flex items-center">
                                                            <input checked id="payment-radio-2" type="radio" value="" name="payment-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                                        </div>
                                                        <img src="assets/images/payment/nagad.png" alt="payment" class="h-6 w-12 object-contain">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div for="payment-radio-3" class="flex justify-between items-center py-3 px-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                        <div class="flex items-center">
                                                            <input checked id="payment-radio-3" type="radio" value="" name="payment-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                                        </div>
                                                        <img src="assets/images/payment/mastercard.png" alt="payment" class="h-6 w-12 object-contain">
                                                    </div>
                                                </li>
                                                <li>
                                                    <div for="payment-radio-4" class="flex justify-between items-center py-3 px-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                                        <div class="flex items-center">
                                                            <input checked id="payment-radio-4" type="radio" value="" name="payment-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                                            <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                                        </div>
                                                        <img src="assets/images/payment/cach.png" alt="payment" class="h-6 w-12 object-contain">
                                                    </div>
                                                </li>
                                                <li>
                                                    <button type="button" class="w-full text-white flex justify-center items-center bg-[rgba(245,_127,_32,_1)] hover:bg-[rgb(223,_120,_37,_1)] focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ease-in-out duration-300">Pay Now</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div class="flow-root">
                                    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

                                        <li v-for="(product,index) in cart.carts?.products" :key="index" class="pt-3 pb-2 pb-0 sm:pt-4">

                                            <div class="flex items-center ">
                                                <div class="flex-shrink-0">
                                                    <nuxt-link :to="`/product-details/${product?.id}`">
                                                        <img class="w-16 h-16 rounded-md object-cover" v-if="product?.picture != ''" :src="useRuntimeConfig().public.imageUrl+'/'+product?.picture[0].replaceAll('public','storage')" alt="Product" />
                                                        <img class="w-16 h-16 rounded-md object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                                                    </nuxt-link>
                                                </div>
                                                <div class="flex-1 min-w-0 ms-4">
                                                    <h2 class="text-md mb-1 font-medium text-gray-900 truncate dark:text-white">
                                                        <nuxt-link :to="`/product-details/${product?.id}`">{{ product.title }}</nuxt-link>
                                                    </h2>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        Qty: {{ product?.qty }}
                                                    </p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}{{ product?.price }}
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                    <ul role="list" class="">
                                        <li class="pb-2">
                                            <h4 class="block mt-3 mb-3 text-lg font-semibold text-gray-900 dark:text-white">Coupon Code Apply</h4>
                                            <form class="flex items-center gap-x-3 mx-auto">  
                                                <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                                                <button type="submit" class="py-2.5 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Apply
                                                </button>
                                            </form>
                                        </li>
                                        <li class="pb-3 mt-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                                    Subtotal
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}{{ cart.carts?.sum }}
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pb-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                                    Discount
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}260
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pb-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                                    VAt
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}60
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pb-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                                    Promo Code Discount
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}50
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pb-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                                    Shipping
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    $50
                                                </div>
                                            </div>
                                        </li>
                                        <li class="pb-3">
                                            <div class="flex items-center justify-between">
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    Total
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {{ product?.currency?.symbol }}{{ cart.carts?.sum - 260 + 60 - 50 + 50 }}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>