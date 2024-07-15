<script setup lang="ts">
import { onMounted, ref } from 'vue'

const prop = defineProps(['title'])

const emit = defineEmits(['select'])

const currentIndex = ref(0)
const categoriesData = ref<any[]>([])
const selectedCategory = ref('all')

// methods
const selectCategory = (category: any) => {
    selectedCategory.value = category.name
    emit('select', category)
}
const setNext = () => {
    if (categoriesData.value.length > (currentIndex.value + 1)) {
        currentIndex.value++
    }
};

const setPrev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
    }
};

const getCetagories = async () => {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);

    if (data.value) {
        let itemArray: any[] = []
        for (let item of data.value.categories) {
            itemArray.push(item)
            if (itemArray.length > 2) {
                categoriesData.value.push(itemArray)
                itemArray = []
            }
        }
        if (itemArray.length) {
            categoriesData.value.push(itemArray)
        }
    }
};

onMounted(() => {
    getCetagories()
})
</script>

<template>
    <div class="flex justify-between items-center px-5 my-5">
        <h2 class="text-[20px] font-bold">{{title}}</h2>
        <div class="flex justify-end items-center gap-1">
            <div class="flex">
                <button
                    class="skew hover:bg-primary hover:text-white -skew-x-12 text-gray-500 px-3 py-2 font-bold text-sm"
                    :class="{ 'bg-primary/20 text-primary': selectedCategory === 'all' }" @click="selectCategory({name: 'all'})">All</button>
                <button v-for="category in categoriesData[currentIndex]" @click="selectCategory(category)"
                    :key="`categories-${category.id}-${currentIndex}`"
                    class="skew hover:bg-primary hover:text-white -skew-x-12 text-gray-500 px-3 py-2 font-bold text-sm max-w-[200px] text-nowrap truncate"
                    :class="{ 'bg-primary/20 text-primary': selectedCategory === category.name }">
                    {{ category.name }}
                </button>
            </div>
            <div class="flex gap-1">
                <button @click="setPrev"
                    class="skew bg-primary hover:bg-primary/90 text-white -skew-x-12 px-3 py-0 font-bold text-sm rounded-none">
                    <Icon name="mdi:chevron-left" class="font-bold text-4xl"></Icon>
                </button>
                <button @click="setNext"
                    class="skew bg-primary hover:bg-primary/90 text-white -skew-x-12 px-3 py-0 font-bold text-sm rounded-none">
                    <Icon name="mdi:chevron-right" class="font-bold text-4xl"></Icon>
                </button>
            </div>
        </div>
    </div>
</template>