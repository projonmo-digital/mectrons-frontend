<script setup>
const products = ref([]);
const getProducts = async () => {
    refreshNuxtData();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: {
                marker: ['electric'],
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
    <!-- ========== Start Electronic Products Section ========== -->

    <div class="mx-10 gap-y-10 mt-8">
        <div class="flex justify-between gap-x-4">
            <h2 class="font-bold text-xl">Electronic Products</h2>
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

        <Slider :product="products"></Slider>
    </div>
    <!-- ========== End Section ========== -->
</template>