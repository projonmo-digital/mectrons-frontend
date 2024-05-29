<script setup>
const products = ref([]);
const getProducts = async () => {
    refreshNuxtData();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: {
                marker: ['deals-month'],
            }
        });
        products.value = data.value.data;
    } catch (error) {
        console.log(error);
    }
}
getProducts();

const value = (index) => {

    if (index === 1) {
        return 'border-r border-l border-b';

    } else if (index === 3) {
        return 'border-r border-l border-t';
    } else {
        return '';
    }
};

</script>
<template>
    <div class=" bg-[url('assets/images/car.jpeg')] py-16">
        <div class="flex justify-center text-2xl text-white font-bold mb-16">Deals of The Month</div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3    mt-4 mx-20 text-white">
            <div v-for="(product, index) of products" :key="product.id" :class="`p-8 ${value(index)}`">
                <ProductCard1 class="" :product="product">
                </ProductCard1>
            </div>
        </div>
    </div>
</template>
