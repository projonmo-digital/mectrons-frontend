<script setup lang="ts">
import SkeletonLoader from '@/components/Common/SkeletonLoader.vue'
import Rating from '@/components/Seller/Review/Rating.vue'

</script>
<template>
    <SkeletonLoader>
        <div class="flex gap-3 p-5">
            <div class="flex gap-3 p-3 lg:p-5">
                <div class="flex-1">
                    <div class="grid grid-cols-1 lg:grid-cols-7 gap-5">
                        <div class="col-span-1 lg:col-span-4 flex flex-col gap-3">
                            <div class="h-96 rounded-lg shadow-lg overflow-hidden">
                                <img class="w-full h-[405px] rounded-lg object-contain transition duration-150 ease-out cursor-zoom-in"
                                 src="assets/images/dummy-image.jpg" alt="Product" />
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <div class="shadow-lg w-32 h-32 overflow-hidden"
                                    v-for="(image, index) in 3" :key="index">
                                    <img class="w-full h-full cursor-pointer object-cover rounded-xl" src="#" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div class="col-span-1 lg:col-span-3 flex flex-col gap-5">
                            <div>
                                <h1 class="text-2xl font-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum laudantium asperiores, culpa dignissimos</h1>
                            </div>
                            <div class="flex items-center gap-2 border-y py-2">
                                <Rating :model-value="0" />
                            </div>
                            <div>
                                <div class="flex flex-col gap-4">
                                    <div class="flex items-center flex-wrap gap-x-2">
                                        <span class="text-2xl font-bold  text-primary"> BDT 500 </span>
                                    </div>
                                    <div class="flex gap-3"
                                        v-for="(ot, index) in ['brand', 'model']"
                                        :key="ot">
                                        <span class="text-gray-500 capitalize">{{ ot }}</span>
                                        <span class="text-gray-500">:</span>
                                        <span class="text-primary font-bold">{{ ot }}</span>
                                    </div>
                                    <div class="flex gap-3">
                                        <span class="text-gray-500">Availability</span>
                                        <span class="text-gray-500">:</span>
                                        <span class="text-green-500">In stock</span>
                                    </div>
                                    <div class="flex items-center gap-3 text-gray-500">
                                        <span>Qty</span>
                                        <span>:</span>
                                        <div class="flex items-center gap-2 bg-gray-200 rounded-md px-2">
                                            <button class="text-gray-500 hover:text-gray-700 text-2xl">-</button>
                                            <span class="text-black inline-block px-3 py-1">{{ 10 }}</span>
                                            <button class="text-gray-500 hover:text-gray-700 text-2xl">+</button>
                                        </div>
                                        <span>
                                            <span class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer">
                                                <Icon name="mdi:heart" class="w-5 h-5"></Icon>
                                            </span>
                                        </span>
                                        <nuxt-link to="/pages/cart"
                                            class="bg-primary text-white p-2 w-12 h-8 flex items-center justify-center rounded-full hover:bg-orange-500">
                                            <i class="fa-solid fa-cart-shopping"></i>
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button
                                    class="flex-1 bg-primary hover:bg-orange-500 rounded-full text-white p-2 flex items-center justify-center">
                                    <div role="status">
                                        <icon class="w-6 h-6 mr-2 mb-1" name="bi:bag-check-fill" />
                                    </div>
                                    <div class="ml-2">BUY IT NOW</div>
                                </button>
                                <button type="button"
                                    class="flex-1 flex items-center rounded-full bg-[rgba(239,_239,_239,_1)] hover:bg-primary text-[rgba(0,_0,_0,_0.52)] px-5 py-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 ease-in-out duration-300">
                                    <div role="status">
                                        <icon class="w-6 h-6 mr-2" name="mdi:cart" />
                                    </div>
                                    <div class="mx-2">ADD TO CART</div>
                                </button>
                            </div>
                            <div>
                                <div class="my-2">
                                    <small class="text-gray-500 font-bold">Sold By</small>
                                </div>
                                <div class="flex justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                                            <img class="w-full h-full object-cover" src="assets/images/dummy-image.jpg" alt="avatar" />
                                        </div>
                                        <h3>name</h3>
                                    </div>
                                    <button class="flex items-center gap-2 hover:bg-primary/10 rounded-xl p-3">
                                        <Icon name="fluent:chat-20-filled"/>
                                        <span>Chat now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 max-w-[360px] hidden lg:flex flex-col gap-5">
                    <div class="shadow-lg bg-white p-3 rounded-lg border">
                        <h1 class="text-xl font-bold">Stay Safe</h1>
                        <div class="flex items-center">
                            <hr class="h-2px w-full">
                            <img width="48" height="48" class=" rounded-full my-1" />
                        </div>
                        <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
                            laborum,
                            tempora, in cum tenetur
                            enim voluptatibus beatae nobis saepe assumenda at eius voluptatum soluta ea incidunt
                            quidem numquam
                            a quos accusa</p>
                        <a href="#" class="font-bold text-sm hover:text-primary">Read more <Icon
                                name="mdi:chevron-right" class="text-xl"></Icon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </SkeletonLoader>
</template>