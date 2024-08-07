<script setup lang="ts">
import { ref } from 'vue'
import type { ICategory } from '@/types/categories'

import CategoriesItem from './CategoriesItem.vue'
import AddEditCategory from './AddEditCategory.vue'

interface Props {
    root?: boolean
    category: ICategory,
    parent?: ICategory
}

const isExpanded = ref(false)

const props = defineProps<Props>()
</script>
<template>
    <div class="border bg-gray-100 rounded-lg p-3 cursor-pointer flex justify-between items-center" @click="isExpanded = !isExpanded">
        <div class="flex gap-3 items-center">
            <icon v-if="category.children.length" class="text-primary" :name=" isExpanded ? 'bxs:down-arrow' : 'bxs:right-arrow'" />
            <span class=" text-gray-700 font-bold">{{ category.name }}</span>
        </div>
        <div>
            <AddEditCategory :parent="category" />
            <AddEditCategory :parent="parent!" :category="category" />
            <button v-if="!root" class="text-gray-500 hover:text-primary text-2xl"><icon name="mdi:bin" /></button>
        </div>
    </div>
    <div class="pl-4 flex flex-col gap-1" v-if="category.children.length && isExpanded">
        <CategoriesItem v-for="(childCategory, index) in category.children" :key="`category-${category.id}-${index}`" :parent="category"
            :category="childCategory" />
    </div>
</template>