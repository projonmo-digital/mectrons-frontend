<script setup lang="ts">
import { ref } from 'vue'
import seller from '~/middleware/seller';
import UserListViewItem from '~/components/Common/UserListViewItem.vue'
// /invoice/{mega_id}

const preloader = ref(false)
const route = useRoute()
const errorMessage = ref('')

const data = ref<any[]>([])

const fetchData = async (mega_id: any, query = {}) => {
    errorMessage.value = ''
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/invoice/${mega_id}?${new URLSearchParams(query).toString()}`;
        const response = await $fetch<any[]>(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        data.value = response.map(i => ({ ...i, method: typeof i.method === 'string' ? { method: 'Cash on delivery', id: 0 } : i.method }))
    } catch (error: any) {
        errorMessage.value = error.response._data.message
    } finally {
        preloader.value = false
    }
}

onMounted(() => {
    if (route.params.mega_id) {
        fetchData(route.params.mega_id)
    }
})

</script>
<template>
    <div class="relative min-h-[600px]">
        <div v-if="!preloader" class="max-w-screen-2xl mx-auto p-8 flex gap-5">
            <div class="flex-1 flex flex-col items-center gap-8 justify-center my-8" v-if="errorMessage">
                <div class="font-bold text-3xl text-center">{{ errorMessage }}</div>
                <div>
                    <nuxt-link to="/pages/cart/search" class="bg-primary text-white px-3 py-1 rounded-full">Track another invoice</nuxt-link>
                </div>
            </div>
            <div v-else class="flex-1 gap-5 flex">
                <div class="flex-1 flex flex-col gap-5">
                    <div v-for="(seller, index) in data" :key="`seller-item-${seller.id}`">
                        <div class="flex items-center gap-3">
                            <UserListViewItem v-model="seller.seller" />
                            <div>
                                <small class="capitalize bg-primary text-white px-3 py-1 rounded-full">{{ seller.delivery_status
                                    }}</small>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div>
                            <div v-for="(product, index) in seller.products" :key="`cart-product-${index}-${product.id}`"
                                class="flex items-center pt-3 pb-2 sm:pt-4">
                                <div class="flex items-center flex-1">
                                    <nuxt-link :to="`/products/${product.id}`">
                                        <img class="w-16 h-16 rounded-md object-cover" v-if="product?.picture.length"
                                            :src="useRuntimeConfig().public.imageUrl + '/' + product?.picture[0].replaceAll('public', 'storage')"
                                            alt="Product" />
                                        <img class="w-16 h-16 rounded-md object-cover" v-else
                                            src="assets/images/dummy-image.jpg" alt="Ads" />
                                    </nuxt-link>
                                    <div class="flex-1 min-w-0 ms-4">
                                        <h2 class=" font-semibold text-primary">
                                            <nuxt-link :to="`/products/${product?.id}`">{{ product.title }}</nuxt-link>
                                        </h2>
                                        <h4 class="text-md font-medium text-gray-800 truncate dark:text-gray-200 mb-1">
                                            {{ product?.currency?.symbol }}{{ product?.price }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-[400px] bg-orange-50 rounded-lg p-5 flex flex-col gap-5 border-2 border-primary border-dashed">
                    <h3 class="text-2xl font-bold text-primary">Payment Details</h3>
                    <hr>
                    <div>
                        <div>Method</div>
                        <div class="text-xl font-bold">{{ data[0]?.method.method }}</div>
                    </div>
                    <div v-if="!!data[0]?.method.id" class="flex flex-col gap-5">
                        <div>
                            <div class="text-gray-800">Merchant Number</div>
                            <div class="font-bold">{{ data[0].method.number }}</div>
                        </div>
                        <div>
                            <div>Referance number</div>
                            <div class="font-bold">{{ data[0].mega_id }}</div>
                        </div>
                    </div>
                    <div>
                        <div>Delivery Address</div>
                        <div class="font-bold">{{ data[0]?.to_address }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
            <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
        </div>
    </div>
</template>