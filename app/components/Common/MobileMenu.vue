<script setup lang="ts">
import MobileMenu from './MobileMenu.vue'

const props = defineProps(['item'])

const isExpanded = ref(false)

</script>

<template>
    <div class="flex justify-between items-center">
        <NuxtLink :to="`/category/${item.id}`" class="text-primary text-xl flex-1 truncate">{{ item.name }}</NuxtLink>
        <icon v-if="item.children.length" class="text-primary w-4 h-4" @click="isExpanded = !isExpanded" :name="!isExpanded ? 'ant-design:right-outlined' : 'ant-design:down-outlined'" />
    </div>
    <template v-if="isExpanded && item.children.length">
        <template v-for="(sub_item, index) in item.children" :key="`mobile-category-index-${index}-${item.id}`">
            <MobileMenu :item="sub_item" />
        </template>
    </template>
</template>