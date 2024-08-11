<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ICategory } from '@/types/categories'
import CategoriesItem from './CategoriesItem.vue'
import { useEmitter } from '@/composables/emitter'
const emitter = useEmitter()

const preloader = ref(false)
const appStore = useAppStore()
const { categories } = storeToRefs(appStore)

const data = ref<ICategory[]>([])

onMounted(() => {
  emitter.on('refetch-category', (e) => {
    appStore.getCetagories()
  })
})
</script>

<template>
  <div class="my-5">
    <div class="relative">
      <div v-if="preloader"
        class="absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
      <div v-else class="flex flex-col gap-1">
        <CategoriesItem v-for="(category, index) in categories" :key="`category-${index}`" :category="category" root />
      </div>
    </div>
  </div>
</template>
