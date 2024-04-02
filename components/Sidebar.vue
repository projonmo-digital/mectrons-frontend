<script setup>
const emit = defineEmits(['priceFilter','typeChecked','catChecked','condChecked','stateChecked']);

const adstype = ref([]);
const adsType = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/types`);
        adstype.value = data.value.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
adsType();


const categories = ref([]);
const getCetagories = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
        categories.value = data.value?.categories?.data;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getCetagories();


const conditions = ref([]);
const getConditions = async() => {
    refreshNuxtData();
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/conditions`);
        conditions.value = data.value;
    }catch(error){
        console.log('Somthing Wrong!');
    }
}
getConditions();

const price = ref({
    min: 0,
    max: 500,
});
const typeChecked = ref([]);
const catChecked = ref([]);
const condChecked = ref([]);
const stateChecked = ref([]);
emit('typeChecked',typeChecked);
emit('catChecked',catChecked);
emit('condChecked',condChecked);
emit('stateChecked',stateChecked);
emit('stateChecked',stateChecked);
const handelPriceFilter = () => {
    emit('priceFilter',price);
}


const loadbtn = ref(false);
const page = ref(1);
const loadMoreCatBtn = async() => {
    loadbtn.value = true;
    page.value++;
    try{
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories?page=${page.value}`);
        categories.value.push(...data.value?.categories?.data);
        loadbtn.value = false;
    }catch(error){
        loadbtn.value = false;
        console.log(error);
    }
}

</script>
<template>
    <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 md:z-0 w-64 h-screen md:relative md:h-auto transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
        <div class="h-auto px-3 py-6 overflow-y-auto bg-[#F57F20]/35 dark:bg-gray-800 rounded-b-sm">
            <div class="s-categories mb-3">
                <h4 class="text-lg font-medium mb-4">Price Range</h4>
                <form @submit.prevent="handelPriceFilter">
                    <div class="flex items-center gap-x-2">
                        <div>
                            <label for="min" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min</label>
                            <input type="text" id="min" v-model="price.min" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                        </div> 
                        <div>
                            <p class="pt-6">To</p>
                        </div>
                        <div>
                            <label for="max" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max</label>
                            <input type="text" id="max" v-model="price.max" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                        </div> 
                    </div>
                    <div class="flex justify-center mt-2">
                        <button type="submit" class="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter</button>
                    </div> 
                </form>
            </div>
            <div class="s-browse-market">
                <h4 class="text-lg font-medium mb-4">Filters</h4>

                <h4 class="text-sm font-medium mb-3 ps-5">Brand</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Toyota</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Honda</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">BMW</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Tata</label>
                        </div>
                    </li>
                </ul>

                <h4 class="text-sm font-medium mb-3 ps-5">Categories</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li v-for="(cat,index) in categories" :key="cat?.id">
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" :value="cat?.id" v-model="catChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{{ cat?.name }}</label>
                        </div>
                    </li>
                    
                    <li>
                        <span @click="loadMoreCatBtn" class="flex items-center justify-center rounded-full bg-gray-200/50 hover:bg-gray-200 cursor-pointer">
                            <div v-if="loadbtn" class="flex items-center gap-x-2 cursor-pointer">
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <span class="text-sm text-gray-600">More</span>
                            </div>
                            <div v-else class="flex items-center gap-x-2 cursor-pointer">
                                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
                                </svg>
                                <span class="text-sm text-gray-600">More</span>
                            </div>
                        </span>
                    </li>
                </ul>
                <h4 class="text-sm font-medium mb-3 mt-3 ps-5">Condition</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li v-for="(cond,index) in conditions" :key="cond?.id">
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" :value="cond?.id" v-model="condChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">{{ cond?.name }}</label>
                        </div>
                    </li>
                </ul>

                <h4 class="text-sm font-medium mb-3 mt-3 ps-5">Location</h4>
                <ul class="space-y-2 font-normal ps-6">
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Barishal" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Barishal</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Chattogram" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Chattogram</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Dhaka" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Dhaka</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Khulna" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Khulna</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Rajshahi" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rajshahi</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Rangpur" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Rangpur</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Mymensingh" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Mymensingh</label>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center mb-2">
                            <input id="default-checkbox" type="checkbox" value="Sylhet" v-model="stateChecked" class="w-3.5 h-3.5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            <label for="default-checkbox" class="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Sylhet</label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>