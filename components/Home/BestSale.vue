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

// Bookmark
// const bookmarkAdd = async(id,index) => {
//     const token = useTokenStore();
//     try{
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
//                     method: 'PUT',
//                     headers: {
//                         Accept: "application/json",
//                         Authorization: `Bearer ${token.getToken}`,
//                     },
//                 });
//         if(data){
//             products.value[index].is_bookmarked = 1;
//         }
//     }catch(error){
//         console.log('Somthing Wrong!');
//     }
// }

// const bookmarkRemove = async(id,index) => {
//     const token = useTokenStore();
//     try{
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/bookmark/${id}`, {
//                     method: 'DELETE',
//                     headers: {
//                         Accept: "application/json",
//                         Authorization: `Bearer ${token.getToken}`,
//                     },
//                 });
//         if(data){
//             products.value[index].is_bookmarked = 0;
//         }
//     }catch(error){
//         console.log('Somthing Wrong!');
//     }
// }
</script>

<template>
    <div class="mx-10">
        <div class="flex justify-center mt-5">
            <h1 class="font-bold text-2xl mb-10">Best Sale</h1>
        </div>
        <div class="relative">
            <div class="w-[calc(100%-80px)] mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
                    <ProductCard v-for="(product,index) of products" :key="product.id" :product="product"></ProductCard>
                </div>
            </div>
            <div class="arrow">
                <span class="prev absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                    <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                    </svg>
                </span>
                <span class="prev absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-[#F57F20] hover:bg-[#ff892b] cursor-pointer">
                    <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>