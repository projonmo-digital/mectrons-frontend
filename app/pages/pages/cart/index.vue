<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { SAVE_CARTS } from '~/helper/localStorage';
import type { ICartItem } from '~/types/cart';
import BestSaleProducts from '~/components/Products/BestSaleProducts.vue';
import { useToast } from "@/components/ui/toast/use-toast"

const { toast } = useToast()

const router = useRouter()
const cartStore = useCartStore()
const { user } = storeToRefs(useAuthStore())
const { products, methods } = storeToRefs(useCartStore())

const preloader = ref(false)
const cartFromBody = ref<any>({})
const subTotal = computed(() => products.value.map(p => p.price * (p.qty || 1)).reduce((r, c) => r += c, 0))
const total = computed(() => products.value.map(p => p.price * (p.qty || 1)).reduce((r, c) => r += c, 0) - (cartFromBody.value.coupon_amount || 0))

const selectedMethod = ref<string | null>(null)

// coupon
const getCoupon = async (event: any) => {
    const fromData = new FormData(event.target)
    let text = fromData.get('text')
    console.log(text);
    const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/coupon/${text}`, {
        method: 'GET'
    });
    cartFromBody.value.coupon_id = response.id
    cartFromBody.value.coupon_code = response.code
    cartFromBody.value.coupon_amount = response.amount
}

const submit = () => {
    if (!selectedMethod.value) {
        toast({
            title: "Info",
            description: 'Please select payment method.',
        });
        return
    } else {
        let generatedId = `${Date.now()}-${user.value?.id}`
        if (user.value) {
            preloader.value = true
            const invoices = Object.groupBy(products.value, (product) => product.user_id)
            let invoiceResponse = []
            for (let key in invoices) {
                let products = invoices[key] || []
                let price: any = {}
                let quantity: any = {}
                for (let product of products) {
                    price[product.id] = product.price
                    quantity[product.id] = product.qty
                }

                let invoice: ICartItem = {
                    seller_id: Number(key),
                    delivery_status: 'placed',
                    method: selectedMethod.value,
                    currency_id: 12,
                    to_address: cartFromBody.value.address || '',
                    cost_fields: {
                        price,
                        quantity,
                    },
                    coupon: cartFromBody.value.coupon_code,
                    mega_id: generatedId
                }
                invoiceResponse.push(submitInvoice(invoice))
            }
            Promise.all(invoiceResponse).then(res => {
                preloader.value = false
                SAVE_CARTS(products.value);
                router.push(`/pages/cart/${generatedId}`)
            })
        } else {
            router.push('/auth/login')
        }
    }
}

const submitInvoice = async (formData: ICartItem) => {
    try {
        const token = useCookie('token');
        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/sell`,
            {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
                body: JSON.stringify(formData)
            }
        )
        console.log(Object.keys(formData.cost_fields.price));

        products.value = products.value.filter(p => !Object.keys(formData.cost_fields.price).includes(p.id.toString()))
    } catch (error) {
        const err = error as any;
    } finally { }
}

onMounted(() => {
    // cartStore.fromDateGenerator()
    cartFromBody.value = {
        address: user.value?.profile.address,
    }
})

</script>
<template>
    <div class="max-w-screen-2xl mx-auto p-8">
        <div class="flex gap-x-8">
            <div class="flex-1">
                <ul role="list" class="divide-y divide-gray-200">
                    <li v-if="!cartStore.products.length" class="pt-3 pb-2 sm:pt-4">
                        <div class="flex items-center justify-center">
                            Cart Empty!!
                        </div>
                    </li>
                    <template v-else>
                        <li v-for="(product, index) in cartStore.products" :key="`cart-product-${index}-${product.id}`"
                            class="pt-3 pb-2 sm:pt-4">
                            <div class="flex items-center">
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
                                    <svg @click="cartStore.removeFromCart(product)"
                                        class="w-5 h-5 text-gray-500 hover:text-red-400 dark:text-white cursor-pointer"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                    </svg>
                                </div>
                                <div class="max-w-xs mx-auto">
                                    <div class="relative flex items-center max-w-[8rem]">
                                        <button @click="cartStore.decrement(product)" type="button"
                                            id="decrement-button" data-input-counter-decrement="quantity-input"
                                            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <input type="text" :value="product.qty" id="quantity-input" data-input-counter
                                            disabled
                                            class="bg-gray-50 border-x-0 h-8 text-center text-gray-900 text-sm border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <button @click="cartStore.increment(product)" type="button"
                                            id="increment-button" data-input-counter-increment="quantity-input"
                                            class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-3 py-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="w-[460px]">
                <div class=" bg-orange-100 p-5 rounded-lg">
                    <ul role="list">
                        <li class="pb-2">
                            <h4 class="block mt-3 mb-3 text-lg font-semibold text-gray-900 dark:text-white">Coupon Code
                                Apply</h4>
                            <form class="flex items-center gap-x-3 mx-auto" @submit.prevent="getCoupon">
                                <input type="text" name="text" class="border border-gray-400 ps-4 p-2.5"
                                    autocomplete="off" placeholder="Coupon" required />
                                <button type="submit"
                                    class="bg-primary hover:bg-orange-500 text-white px-3 py-2 rounded-lg">
                                    Apply
                                </button>
                            </form>
                        </li>
                        <li class="pb-3">
                            <h4 class="block mt-3 mb-3 text-md font-medium text-gray-900 dark:text-white">Delivery
                                Address
                            </h4>
                            <textarea v-model="cartFromBody.address"
                                class="w-full border border-gray-400 ps-4 p-2.5"></textarea>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div
                                    class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Subtotal
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ 'BDT' }} {{ subTotal }}
                                </div>
                            </div>
                        </li>
                        <!-- <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div
                                    class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Discount
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ 'BDT' }} 260
                                </div>
                            </div>
                        </li> -->
                        <!-- <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div
                                    class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    VAt
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ 'BDT' }} 60
                                </div>
                            </div>
                        </li> -->
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div
                                    class="inline-flex items-center text-base font-normal text-gray-900 dark:text-white">
                                    Coupon Code Discount
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ 'BDT' }} {{ cartFromBody.coupon_amount || 0 }}
                                </div>
                            </div>
                        </li>
                        <li class="pb-3">
                            <div class="flex items-center justify-between">
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    Total
                                </div>
                                <div
                                    class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    {{ 'BDT' }} {{ total }}
                                </div>
                            </div>
                        </li>
                        <li class="pb-3 pt-4 flex gap-3 flex-wrap">
                            <div class="flex items-center gap-3"
                                v-for="(method, index) in [{ value: 'cash', method: 'Cash on delivery' }, ...methods]"
                                :key="`payment-methods-${index}`">
                                <input type="radio" name="method" v-model="selectedMethod" :value="method.value"
                                    required>
                                <label>{{ method.method }}</label>
                            </div>
                        </li>
                        <li class="pb-3 pt-4">
                            <button @click="submit" type="button" :disabled="!products.length"
                                class="w-full bg-primary hover:bg-orange-500 text-white px-3 py-2 rounded-lg">Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="best-seller mt-8">
            <h4 class="text-2xl font-semibold">Best Sales</h4>
            <BestSaleProducts />
        </div>

        <!-- Checkout Modal modal -->
        <div id="checkout-modal" tabindex="-1" aria-hidden="true"
            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-6xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-center text-yellow-400 dark:text-white mx-auto">
                            Mectrons
                        </h3>
                        <button type="button"
                            class="absolute right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="checkout-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>