<script setup>
import { LogOut } from 'lucide-vue-next';
import { onMounted } from 'vue';
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'




const cart = useCartStore();
onMounted(() => {
    cart.getCartData();
})

const searchText = ref('');
const handelSearchSubmit = () => {
    refreshNuxtData();
    return navigateTo(`/search?search=${searchText.value}`);
}

const store = useAuthStore()
const { data } = useAuthStore().login
console.log(data)


const loginToggleBtnFun = async (value) => {
    let button;
    if (value == 'sellerLogin') {
        button = document?.getElementById('sellerLoginButton');
    } else {
        button = document?.getElementById('userLoginButton');
    }
    button.click();

}
const ToggleBtnFun = async (value) => {
    let button;
    if (value == 'sellerLogin') {
        button = document?.getElementById('sellerLoginButton');
    } else {
        button = document?.getElementById('userLoginButton');
    }
    button.click();

}

const items = [


    {
        "text": "Electronics",
        "link": "#"
    },
    {
        "text": "Service",
        "link": "/service"
    },
    {
        "text": "About Us",
        "link": "/about-us"
    },
    {
        "text": "Contact Us",
        "link": "/contact-us",
        "bold": true
    }
]

const logout = () => {
    store.logout()
}



</script>
<template>
    <header class="bg-primary ">
        <div class=" mx-auto px-2 py-2">
            <div class="flex justify-between text-white py-2 ">
                <div class="flex  ">
                    <button id="sellerLoginButton" data-dropdown-toggle="sellerLogin"
                        class="font-medium  text-lg px-4 py-2 md:px-5 md:py-2 ">Seller Login</button>
                    <div id="sellerLogin"
                        class="z-50 hidden bg-white divide-y divide-gray-100 w-full max-w-sm rounded-lg shadow dark:bg-gray-700">
                        <div aria-labelledby="sellerLoginButton">
                            <LoginForm :toggleBtn="`sellerLogin`" @loginToggleBtn="loginToggleBtnFun($event)">
                            </LoginForm>
                        </div>
                    </div>
                    <!-- <a href="#" class=" font-medium  text-sm px-4 py-2 md:px-5 md:py-2">Track Order</a> -->
                    <div class=""></div>
                </div>
                <div class="flex mt-1 gap-x-4 me-12 text-sm">
                    <span><i class="fa-solid fa-location-dot me-2"></i>House No- A7 , Dog squid road , plot no-1/2 ,
                        Kafrul , Mirpur -13, Dhaka .</span>
                    <span><i class="fa-solid fa-phone me-2"></i>+880 170672751</span>
                </div>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
                crossorigin="anonymous" referrerpolicy="no-referrer" />

            <div class="mx-auto sm:px-4 lg:px-8">
                <div class="flex items-center justify-between gap-x-5 h-16">

                    <div class="flex  h-[calc(100%-8px)]">
                        <nuxt-link to="/" class="flex items-center w-[200px] bg-primary">
                            <svg width="178" height="35" viewBox="0 0 178 35" fill=""
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.5513 17.6192L24.5361 13.924C24.7518 13.7633 25.0499 13.924 25.046 14.1917L24.8538 21.7964L19.5513 17.6192Z"
                                    fill="white" />
                                <path
                                    d="M14.3743 13.9046L14.4723 13.8315L19.5474 17.6436L14.5586 21.5239L14.4253 21.4265L14.3743 13.9046Z"
                                    fill="white" />
                                <path
                                    d="M30.0074 30.2483H9.74632C7.67158 30.2483 5.9812 28.1499 5.9812 25.5745V10.4138C5.9812 7.83833 7.67158 5.73999 9.74632 5.73999H30.0074C32.0821 5.73999 33.7725 7.83833 33.7725 10.4138V25.5745C33.7725 28.1499 32.086 30.2483 30.0074 30.2483ZM9.74632 6.7137C8.103 6.7137 6.7656 8.37388 6.7656 10.4138V25.5745C6.7656 27.6144 8.103 29.2746 9.74632 29.2746H30.0074C31.6507 29.2746 32.9881 27.6144 32.9881 25.5745V10.4138C32.9881 8.37388 31.6507 6.7137 30.0074 6.7137H9.74632Z"
                                    fill="white" />
                                <path d="M14.6957 29.7322H13.876V33.7974H14.6957V29.7322Z" fill="white" />
                                <path d="M20.2257 29.7322H19.406V33.7974H20.2257V29.7322Z" fill="white" />
                                <path d="M25.7557 29.6835H24.936V33.7487H25.7557V29.6835Z" fill="white" />
                                <path d="M14.786 2.0448H13.9663V6.11004H14.786V2.0448Z" fill="white" />
                                <path d="M20.316 2.0448H19.4963V6.11004H20.316V2.0448Z" fill="white" />
                                <path d="M25.8461 1.99121H25.0264V6.05645H25.8461V1.99121Z" fill="white" />
                                <path
                                    d="M33.4814 24.1979L33.4814 25.2155L36.7563 25.2155L36.7563 24.1979L33.4814 24.1979Z"
                                    fill="white" />
                                <path d="M33.4819 17.3325L33.4819 18.35L36.7568 18.35L36.7568 17.3325L33.4819 17.3325Z"
                                    fill="white" />
                                <path
                                    d="M33.4419 10.4648L33.4419 11.4823L36.7168 11.4823L36.7168 10.4648L33.4419 10.4648Z"
                                    fill="white" />
                                <path
                                    d="M2.95703 24.1984L2.95703 25.2159L6.2319 25.2159L6.2319 24.1984L2.95703 24.1984Z"
                                    fill="white" />
                                <path
                                    d="M2.95776 17.3329L2.95776 18.3505L6.23263 18.3505L6.23263 17.3329L2.95776 17.3329Z"
                                    fill="white" />
                                <path
                                    d="M2.91724 10.4653L2.91724 11.4828L6.19211 11.4828L6.19211 10.4653L2.91724 10.4653Z"
                                    fill="white" />
                                <path
                                    d="M60.4577 6.46057V27.5414H57.0495V13.8316L52.4999 27.5463H49.9193L45.3462 13.8316V27.5463H41.938V6.46544H45.8051L51.2057 22.1422L56.6063 6.46544H60.4577V6.46057Z"
                                    fill="white" />
                                <path
                                    d="M67.2232 9.87346V15.1607H72.9414V18.5151H67.2232V24.0994H73.6709V27.5414H63.8149V6.4314H73.6709V9.87346H67.2232Z"
                                    fill="white" />
                                <path
                                    d="M77.0634 11.4021C77.8164 9.7614 78.8479 8.48097 80.1539 7.56568C81.4599 6.65039 82.9228 6.19275 84.5466 6.19275C86.4448 6.19275 88.1077 6.79645 89.5353 8.00385C90.9629 9.21125 91.9591 10.886 92.5278 13.0185H88.6097C88.2215 12.0107 87.6724 11.256 86.9664 10.7546C86.2605 10.2531 85.4447 9.99995 84.523 9.99995C83.5347 9.99995 82.6522 10.2872 81.8835 10.8617C81.1148 11.4362 80.5108 12.2444 80.0833 13.2911C79.6519 14.3378 79.4401 15.5647 79.4401 16.9766C79.4401 18.3641 79.6558 19.591 80.0833 20.6475C80.5108 21.7039 81.1148 22.5219 81.8835 23.0915C82.6522 23.666 83.5347 23.9532 84.523 23.9532C85.4486 23.9532 86.2644 23.6952 86.9664 23.184C87.6685 22.6728 88.2215 21.9084 88.6097 20.9055H92.5278C91.9591 23.0623 90.9669 24.7371 89.5471 25.9347C88.1273 27.1324 86.4605 27.7312 84.5466 27.7312C82.9228 27.7312 81.4599 27.2736 80.1539 26.3583C78.8479 25.443 77.8164 24.1674 77.0634 22.5365C76.3104 20.9055 75.9338 19.0555 75.9338 16.9766C75.9338 14.8977 76.3104 13.0428 77.0634 11.4021Z"
                                    fill="white" />
                                <path
                                    d="M107.004 6.46057V9.87342H102.478V27.5414H99.0697V9.87342H94.5437V6.46057H107.004Z"
                                    fill="white" />
                                <path
                                    d="M118.244 27.5463L114.499 19.333H112.891V27.5463H109.483V6.46545H115.86C117.174 6.46545 118.291 6.7527 119.217 7.32719C120.143 7.90168 120.837 8.67578 121.296 9.65435C121.759 10.6329 121.99 11.7235 121.99 12.9309C121.99 14.3184 121.664 15.5745 121.017 16.6894C120.366 17.8092 119.401 18.5784 118.123 19.002L122.186 27.5511H118.244V27.5463ZM112.891 16.1587H115.738C116.664 16.1587 117.354 15.8812 117.805 15.3262C118.26 14.7712 118.488 14.002 118.488 13.0137C118.488 12.0448 118.26 11.2951 117.805 10.7644C117.35 10.2288 116.66 9.96594 115.738 9.96594H112.891V16.1587Z"
                                    fill="white" />
                                <path
                                    d="M128.587 26.3681C127.257 25.443 126.202 24.1577 125.426 22.517C124.649 20.8763 124.257 19.0165 124.257 16.9425C124.257 14.888 124.645 13.0428 125.426 11.4021C126.206 9.76143 127.257 8.47614 128.587 7.55111C129.916 6.62609 131.375 6.16357 132.968 6.16357C134.572 6.16357 136.039 6.62609 137.36 7.55111C138.682 8.47614 139.729 9.76143 140.498 11.4021C141.267 13.0428 141.655 14.8929 141.655 16.9425C141.655 19.0165 141.27 20.8763 140.498 22.517C139.729 24.1577 138.678 25.443 137.345 26.3681C136.015 27.2931 134.556 27.7556 132.964 27.7556C131.375 27.7556 129.916 27.2931 128.587 26.3681ZM135.666 23.1207C136.442 22.5462 137.054 21.7283 137.49 20.6572C137.929 19.591 138.149 18.3496 138.149 16.9425C138.149 15.5355 137.929 14.2989 137.49 13.2424C137.05 12.186 136.442 11.3729 135.666 10.813C134.885 10.2483 133.987 9.96591 132.964 9.96591C131.94 9.96591 131.038 10.2483 130.25 10.813C129.461 11.3778 128.85 12.186 128.414 13.2424C127.979 14.2989 127.755 15.5355 127.755 16.9425C127.755 18.3544 127.975 19.591 128.414 20.6572C128.853 21.7235 129.465 22.5462 130.25 23.1207C131.034 23.6952 131.94 23.9825 132.964 23.9825C133.987 23.9825 134.889 23.6952 135.666 23.1207Z"
                                    fill="white" />
                                <path
                                    d="M158.708 27.5463H155.3L147.585 13.077V27.5463H144.177V6.4314H147.585L155.3 20.9299V6.4314H158.708V27.5463Z"
                                    fill="white" />
                                <path
                                    d="M164.732 27.001C163.783 26.4995 163.034 25.7741 162.481 24.8247C161.928 23.8802 161.645 22.7605 161.63 21.4703H165.281C165.328 22.3369 165.575 23.0234 166.022 23.5248C166.469 24.0263 167.081 24.2794 167.858 24.2794C168.654 24.2794 169.278 24.0409 169.732 23.5686C170.187 23.0964 170.415 22.4781 170.415 21.7089C170.415 21.0857 170.262 20.5696 169.952 20.1704C169.642 19.7663 169.258 19.4498 168.795 19.221C168.332 18.9873 167.697 18.7342 166.885 18.4518C165.783 18.0477 164.885 17.6534 164.195 17.259C163.504 16.8646 162.912 16.2707 162.418 15.4771C161.924 14.6835 161.677 13.6173 161.677 12.2931C161.677 11.0467 161.928 9.95617 162.43 9.03115C162.932 8.10613 163.638 7.39532 164.548 6.90359C165.458 6.41187 166.493 6.16357 167.662 6.16357C169.415 6.16357 170.839 6.69425 171.933 7.75072C173.027 8.8072 173.631 10.2824 173.745 12.1762H169.999C169.968 11.4508 169.721 10.852 169.258 10.3797C168.795 9.90749 168.183 9.66893 167.422 9.66893C166.756 9.66893 166.226 9.87828 165.83 10.3018C165.434 10.7254 165.234 11.3388 165.234 12.1422C165.234 12.7069 165.383 13.1743 165.685 13.5443C165.983 13.9192 166.356 14.221 166.803 14.4498C167.25 14.6835 167.877 14.9464 168.689 15.2483C169.791 15.6524 170.693 16.0516 171.392 16.4557C172.09 16.8598 172.69 17.4635 173.192 18.2668C173.694 19.0701 173.945 20.1314 173.945 21.4362C173.945 22.5657 173.709 23.6125 173.239 24.5764C172.768 25.5404 172.078 26.3145 171.172 26.889C170.262 27.4635 169.183 27.7507 167.936 27.7507C166.748 27.7556 165.681 27.5024 164.732 27.001Z"
                                    fill="white" />
                                <path
                                    d="M25.3284 23.7731H14.4605C13.5506 23.7731 12.8093 22.8529 12.8093 21.7234V13.7926C12.8093 12.6631 13.5506 11.7429 14.4605 11.7429H25.3284C26.2383 11.7429 26.9795 12.6631 26.9795 13.7926V21.7234C26.9834 22.8529 26.2422 23.7731 25.3284 23.7731ZM14.4605 12.2249C13.7663 12.2249 13.2015 12.926 13.2015 13.7877V21.7186C13.2015 22.5803 13.7663 23.2814 14.4605 23.2814H25.3284C26.0225 23.2814 26.5873 22.5803 26.5873 21.7186V13.7926C26.5873 12.9308 26.0225 12.2298 25.3284 12.2298H14.4605V12.2249Z"
                                    fill="white" />
                            </svg>

                        </nuxt-link>
                    </div>



                    <div class="w-2/3">
                        <div class="flex ">
                            <form class="relative w-full mx-4" @submit.prevent="handelSearchSubmit">
                                <input v-model="searchText" type="search" id="search-dropdown"
                                    class="block p-2  py-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search all parts here" required />
                                <button type="submit"
                                    class="absolute border rounded-lg top-0 end-0 w-16 flex items-center justify-center text-sm font-medium h-full text-white bg-primary">

                                    <span class="">
                                        <Icon name="fa:search" class="text-white text-xl"></Icon>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>


                    <div class="flex items-center gap-x-8 text-2xl text-white">
                        <button v-if="!store.logInSatus" id="userLoginButton" data-dropdown-toggle="userLogin"
                            class="flex items-center gap-x-1 font-medium rounded-lg text-lg  px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"><i
                                class="fa-solid fa-user me-2"></i>Login</button>

                        <DropdownMenu v-if="store.logInSatus">
                            <DropdownMenuTrigger as-child>
                                <button
                                    class="flex items-center gap-x-1 font-medium rounded-lg text-lg  px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"><i
                                        class="fa-solid fa-user me-2"></i><span>Logout</span></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-56">

                                <Button @click="logout">Logout</Button>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div id="userLogin"
                            class="z-50 hidden bg-white divide-y divide-gray-100 w-full max-w-sm rounded-lg shadow dark:bg-gray-700">
                            <div aria-labelledby="userLoginButton">
                                <LoginForm :toggleBtn="`userLogin`" @loginToggleBtn="loginToggleBtnFun($event)">
                                </LoginForm>
                            </div>
                        </div>

                        <a href="#"
                            class="  font-medium rounded-lg text-sm px-2 py-2 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                            EN/BN</a>

                        <nuxt-link to="/cart"
                            class="relative inline-flex items-center p-3 text-sm font-medium text-center">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span class="sr-only">Notifications</span>
                            <div
                                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                {{ cart.carts?.quantity > 0 ? cart.carts?.quantity : 0 }}
                            </div>
                        </nuxt-link>
                    </div>

                </div>
                <div class="flex justify-center mx-2">
                    <nav class=" w-2/3  flex space-x-2 py-2 items-center  justify-between text-white">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <nuxt-link to="/" class="text-[20px] font-bold hover:underline"
                            aria-current="page">Home</nuxt-link>
                        <HomeAutoMobiles></HomeAutoMobiles>
                        <nuxt-link v-for="i in items" :to="i.link" class="text-[20px] font-bold hover:underline"
                            aria-current="page">{{ i.text
                            }}</nuxt-link>

                    </nav>
                </div>
            </div>
        </div>
    </header>
</template>