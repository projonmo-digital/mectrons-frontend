<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ICategory } from '@/types/categories'
import { useToast } from '@/components/ui/toast/use-toast'
import CategoriesItem from './CategoriesItem.vue'

const { toast } = useToast()

const preloader = ref(false)
const responseParams = ref({})

const data = ref<ICategory[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  preloader.value = true
  try {
    let url = `${useRuntimeConfig().public.baseUrl}/general-categories?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<{ categories: ICategory[]}>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    data.value = response.categories
  } catch (error) {
    const err = error as any;
    if (err.response._data) {
      if (typeof err.response._data.message === "string") {
        toast({
          class: "bg-red-500",
          title: "Error",
          description: err.response._data.errors,
        });
      }
    }
  } finally {
    preloader.value = false;
  }
}

onMounted(() => {
  fetchData(responseParams.value)
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
        <CategoriesItem v-for="(category, index) in data" :key="`category-${index}`" :category="category" root />
      </div>
    </div>
  </div>
</template>
