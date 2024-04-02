<script setup>
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

</script>

<template>
    <div class="mx-10">
        <div class="flex justify-center mt-5">
            <h1 class="font-bold text-2xl mb-10">Best Sale</h1>
        </div>
        <div class="relative">
            <div class="w-[calc(100%-90px)] mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
                    <ProductCard v-for="(product,index) of products" :key="product.id" :product="product"></ProductCard>
                </div>
            </div>


            <div class="arrow">
                <button class="group prev absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300" data-filter="all">
                    <div class="relative">
                        <span class="relative z-10 text-sm font-medium text-white w-10 h-8 flex justify-center items-center">
                            <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                            </svg>
                        </span>
                        <span class="skew absolute w-10 h-8 left-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"></span>
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
            </div>
        </div>
    </div>
</template>