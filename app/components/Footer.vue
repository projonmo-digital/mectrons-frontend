<script setup lang="ts">
import logo from '@/assets/images/logo.svg'

</script>
<template>
    <footer>
        <div class="hidden md:block bg-white">
            <svg width="100%" height="auto" viewBox="0 0 1440 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M137.973 0H0V53H1440V0H1301.65L1292.55 20H146.691L137.973 0Z" fill="#F85606" />
            </svg>
        </div>
        <div class="w-full bg-gradient-to-b from-primary/40 to-white mx-auto px-6 py-10">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-y-11 lg:grid-cols-5 ms-auto pb-5">
                <div>
                    <img :src="logo" alt="">
                    <div class="flex flex-col items-start mt-5 space-y-2">
                        <p>Our dealership takes your privacy seriously and is committed to safeguarding your privacy
                            online. Because we do gather certain types of information from you.</p>
                    </div>
                    <a href="/pages/contact-us" class="inline-block mt-8 w-48 px-3 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 focus:outline-none bg-primary rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">Contact For
                        Queries</a>
                    <h1 class="mt-5 mb-2">Follow Us</h1>
                    <div class="flex flex-1 gap-4 hover:cursor-pointer mt-4">
                        <a target="_blank" href="https://www.facebook.com/profile.php?id=61559661892435&mibextid=JRoKGi">
                            <icon class="w-8 h-8" name="logos:facebook" />
                        </a>
                        <a target="_blank" class="relative" href="https://m.facebook.com/groups/1155393332352922/?ref=share&mibextid=NSMWBT">
                            <icon class="w-4 h-4 absolute bottom-1 right-1" name="logos:facebook" />
                            <icon class="w-8 h-8 text-primary" name="vaadin:group" />
                        </a>
                        <a target="_blank" href="https://x.com/mectrons?t=JUrbwJfQO0B2xnkyBrbVmg&s=09">
                            <icon class="w-8 h-8" name="logos:twitter" />
                        </a>
                        <a target="_blank" href="https://www.instagram.com/mectrons1?igsh=MXJ1emF5M3VvNzR2Zg==">
                            <icon class="w-8 h-8" name="skill-icons:instagram" />
                        </a>
                    </div>
                </div>

                <div>
                    <h1 class=" max-w-lg text-xl font-semibold tracking-tight xl:text-2xl dark:text-white">Information
                    </h1>
                    <div class="flex flex-col items-start mt-5 space-y-2">
                        <a href="/pages/contact-us"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Contact Us</a>
                        <a href="/pages/about-us"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            About Us</a>
                        <a href="/pages/privacy-policy"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Privacy Policy</a>
                    </div>
                </div>

                <div>
                    <h1 class="max-w-lg text-xl font-semibold tracking-tight xl:text-2xl dark:text-white">My Account
                    </h1>
                    <div class="flex flex-col items-start mt-5 space-y-2">
                        <a href="/pages/cart/search"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Track Order</a>
                        <a href="#"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Terms of Service </a>
                        <a href="/pages/cookie-policy"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Cookie Policy </a>
                        <a href="/sitemap"
                            class="transition-colors duration-300 dark:text-gray-300 hover:underline hover:cursor-pointer hover:text-primary">
                            Sitemap</a>
                    </div>
                </div>

                <div class="sm:col-span-2">
                    <h1 class=" max-w-lg text-xl font-semibold tracking-tight xl:text-2xl dark:text-white">
                        Newsletter</h1>
                    <p class="mt-3">Enter your email address below to subscribe to our newsletter and keep up to date
                        with discounts and special offers</p>

                    <div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <input id="email" type="text" autocomplete="off"
                            class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-orange-300"
                            placeholder="user@exmple.com" />

                        <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-primary rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
            <div class="sm:flex sm:items-center sm:justify-between lg:justify-center">
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <span class="">
                            <img src="assets/images/mectron-logo.png" class="w-16 me-3" alt="" srcset="">
                        </span>
                    </li>
                    <li>
                        <a href="/pages/contact-us" class="hover:underline me-4 md:me-6">Contact Us</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">FAQ</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                Copyright ©{{ new Date(Date.now()).toLocaleString('en-BD', { year: 'numeric' }) }} Reserved by Mectrons
            </span>
        </div>
    </footer>
</template>