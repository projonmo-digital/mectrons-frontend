<script setup>


const products = ref([]);
const finalData = ref([]);
const data = ref(null);
const prev = ref(0);
const next = ref(3);
const fullCategories = ref([]);

const getProducts = async () => {
    try {
        const { data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/filter`, {
            method: 'POST',
            body: {
                marker: ['featured'],
            }
        });
        products.value = data.value.data;
    } catch (error) {
        console.error(error);
    }
}
getProducts();

const store = useUtils();

const fetchCategories = async () => {
    data.value = await store.getCetagories();
    fullCategories.value = data.value.categories;
    finalData.value = fullCategories.value.slice(prev.value, next.value);
};

fetchCategories();

const updateFinalData = () => {
    finalData.value = fullCategories.value.slice(prev.value, next.value);
};

const setNext = () => {
    if (next.value < fullCategories.value.length) {
        prev.value += 3;
        next.value += 3;
        updateFinalData();
    }
};

const setPrev = () => {
    if (prev.value > 0) {
        prev.value -= 3;
        next.value -= 3;
        updateFinalData();
    }
};
</script>

<template>
    <!-- ========== Start Featured Products Section ========== -->
    <div class="mx-5 gap-y-10 mt-8 mb-8">
        <div class="flex justify-between flex-col gap-x-4">
            <h2 class=" text-[20px] font-bold">Featured Products</h2>
            <div class="flex justify-end items-center text-xl mb-4">
                <button
                    class="group filter-btn active relative inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm text-primary font-bold  ">All</span>
                    <span
                        class="skew absolute w-full h-full left-0 top-0  bg-primary/20 group-hover:bg-primary z-0 -skew-x-12"></span>
                </button>
                <button v-for="i in finalData" :key="i.id"
                    class="group filter-btn active relative animate-in inline-flex items-center justify-center ease-in-out duration-300"
                    data-filter="all">
                    <span class="relative z-10 py-1.5 px-4 text-sm font-medium group-hover:text-primary">{{
                        i.name.slice(0, 15) }}....</span>
                    <span
                        class="skew absolute w-full h-full left-0 font-bold top-0 group-hover:bg-primary/20 z-0 -skew-x-12"></span>
                </button>
                <div class="flex gap-4 ml-2">
                    <Button @click="setPrev"
                        class="skew rounded-none w-8 h-6 left-0 top-0  bg-primary group-hover:bg-primary z-0 flex items-center p-1 -skew-x-12">
                        <Icon name="mdi:chevron-left" class="font-bold text-4xl"></Icon>
                    </Button>
                    <Button @click="setNext"
                        class="skew rounded-none w-8 h-6 left-0 top-0  bg-primary group-hover:bg-primary z-0 flex items-center p-1 -skew-x-12">
                        <Icon name="mdi:chevron-right" class="font-bold text-4xl"></Icon>
                    </Button>
                </div>
            </div>
        </div>
        <hr class="mb-5">
        <div class="relative">
            <div class="">
                <div class="w-full">
                    <Slider :product="products" />
                </div>
            </div>
        </div>
    </div>
    <!-- ========== End Section ========== -->
</template>
