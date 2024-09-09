<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"

import { useToast } from '@/components/ui/toast/use-toast'
import type { IpaginatedRespoinse } from '~/types/response';
import type { IProduct } from '~/types/products';
import ProductInfo from "~/components/master-admin/product/ProductInfo.vue"

const { toast } = useToast()

const preloader = ref(false)

const responseParams = ref({
  page: 1,
  per_page: 10,
})

const moreData = ref(true)

const data = ref<IProduct[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/bookmark?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<IpaginatedRespoinse<IProduct>>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    if (response && response.data) {
      responseParams.value.page = response.current_page
      data.value = response.data
      moreData.value = response.last_page === response.current_page
      return response
    } else {
      console.error("Invalid response format")
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  } finally {
    preloader.value = false
  }
}
const nextPage = () => {
  responseParams.value.page++
  fetchData(responseParams.value)
}
const previousPage = () => {
  responseParams.value.page--
  fetchData(responseParams.value)
}

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "stock_amount",
    header: "Products",
    cell: ({ row }) => {
      const id = row.original.id;
      return h(ProductInfo, {
        class: "text-right font-medium",
        modelValue: row.original
      });
    }
  }
]

onMounted(() => {
  fetchData(responseParams.value)
})
</script>

<template>
  <div class="my-5">
    <div class="flex items-center justify-between">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Wish List</h1>
      </div>
      <div class="flex gap-3 my-2">
        <button :disabled="responseParams.page <= 1"
          class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
        <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
          @click="nextPage">Next</button>
      </div>
    </div>
    <div class="relative">
      <DataTable v-if="data" :columns="columns" :data="data" />
      <div v-if="preloader"
        class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
    </div>
  </div>
</template>
