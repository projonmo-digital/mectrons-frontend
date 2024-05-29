<script setup>
const products = ref([]);
const getProducts = async () => {
    refreshNuxtData();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: {
                marker: ['featured'],
            }
        });
        products.value = data.value.data;
    } catch (error) {
        console.log(error);
    }
}
getProducts();




</script>
<template>
    <!-- ========== Start Featured Products Section ========== -->

    <div class="mx-10 gap-y-10 mt-8">
        <div class="flex justify-between gap-x-4">
            <h2 class="font-bold text-xl">Featured Products</h2>
            <div class="flex justify-end text-xl mb-4">

                <button
                    class="group filter-btn active relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm font-medium text-white">All</span>
                    <span
                        class="skew absolute w-full h-full left-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>
                <button
                    class="group filter-btn active relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm font-medium group-hover:text-white">Power
                        Tools</span>
                    <span
                        class="skew absolute w-full h-full left-0 top-0 group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>
                <button
                    class="group filter-btn active relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm font-medium group-hover:text-white">Hand Tools</span>
                    <span
                        class="skew absolute w-full h-full left-0 top-0 group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>
                <button
                    class="group filter-btn active relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm font-medium group-hover:text-white">Plumbing</span>
                    <span
                        class="skew absolute w-full h-full left-0 top-0 group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                </button>
            </div>
        </div>
        <hr class="mb-5">

        <div class="relative">
            <div class="w-[calc(100%-90px)] mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
                    <ProductCard v-for="(product, index) of products" :key="product.id" :product="product">
                    </ProductCard>
                </div>
            </div>


            <!-- <div class="arrow">
                <button class="group prev absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                    <div class="relative">
                        <span class="relative z-10 text-sm font-medium text-white w-10 h-8 flex justify-center items-center">
                            <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                            </svg>
                        </span>
                        
                    </div>
                </button>

                <button class="group next absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                    <div class="relative">
                        <span class="relative z-10 text-sm font-medium text-white w-10 h-8 flex justify-center items-center">
                            <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                            </svg>
                        </span>
                        <span class="skew absolute w-10 h-8 right-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
                    </div>
                </button>
            </div> -->
        </div>
    </div>
    <!-- ========== End Section ========== -->
</template>