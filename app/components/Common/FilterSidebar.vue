<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['filter'])

const filterData = ref<any>({
    price: [0, 5000],
    brands: [],
    category: [],
    // conditions: [],
    locations: [],
})

// const brandList = ['Toyota', 'Honda', 'BMW', 'Tata']
const { categories } = storeToRefs(useAppStore())

// const conditions = ref([])

// methods
// const getConditions = async () => {
//     try {
//         const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/conditions`);
//         conditions.value = data.value;
//     } catch (error) {
//         console.log('Somthing Wrong!');
//     }
// }

const handleList = (key: string, brand: string) => {
    if (filterData.value[key].includes(brand)) {
        filterData.value[key] = filterData.value[key].filter((b: string) => b !== brand)
    } else {
        filterData.value[key].push(brand)
    }
}

const submit = () => {
    emit('filter', filterData.value)
}

onMounted(() => {
    // getConditions()
})

</script>
<template>
    <aside class="p-5">
        <div>
            <h4 class="text-lg font-bold mb-5">Filters</h4>

            <!--<h4 class="text-sm font-medium mb-3">Brand</h4>
            <ul class="space-y-2 font-normal pb-3">
                <li v-for="(brand, index) in brandList" :key="`brand-${index}`">
                    <div class="flex items-center mb-2">
                        <input @input="handleList('brands', brand)" type="checkbox" :value="brand" :checked="filterData.brands.includes(brand)">
                        <label for="default-checkbox"class="ms-2 text-sm">{{ brand }}</label>
                    </div>
                </li>
            </ul> -->

            <h4 class="text-sm font-bold mb-3">Categories</h4>
            <ul class="space-y-2 font-normal pb-3">
                <li v-for="(cat, index) in [...(categories[0]?.children || []),...(categories[1]?.children || []), ...(categories[2]?.children || [])]" :key="`filter-cat-${cat?.id}`">
                    <div class="flex items-center mb-2">
                        <input type="checkbox" @input="handleList('category', cat.id.toString())" :value="cat.id"
                            :checked="filterData.category.includes(cat.id)">
                        <label for="default-checkbox" class="ms-2 text-xs">{{ cat?.name }}</label>
                    </div>
                </li>
            </ul>

            <!-- <h4 class="text-sm font-medium mb-3 mt-3">Condition</h4>
            <ul class="space-y-2 font-normal mb-3">
                <li v-for="(cond, index) in conditions" :key="cond?.id">
                    <div class="flex items-center mb-2">
                        <input type="checkbox" @input="handleList('conditions', cond.id)" :value="cond?.id" :checked="filterData.conditions.includes(cond.id)">
                        <label for="default-checkbox" class="ms-2 text-sm">{{ cond?.name }}</label>
                    </div>
                </li>
            </ul> -->

            <h4 class="text-sm font-bold mb-3 mt-3">Price</h4>
            <div class="flex justify-between items-center gap-4 mb-5">
                <div class="flex flex-col">
                    <label>Min</label>
                    <input class="w-full p-3" type="number" v-model="filterData.price[0]" min="0">
                </div>
                <div class="flex flex-col">
                    <label>Max</label>
                    <input class="w-full p-3" type="number" v-model="filterData.price[1]" min="0">
                </div>
            </div>
        </div>
        <hr class="my-5">
        <button class="bg-primary hover:bg-primary/80 px-3 py-3 w-full rounded-lg text-white"
            @click="submit">Filter</button>
    </aside>
</template>