<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IpaginatedRespoinse } from '~/types/response';
import type { IReviewWithProduct } from '~/types/products';
import UserListViewItem from '~/components/Common/UserListViewItem.vue'
import Rating from '~/components/seller/review/Rating.vue'

const preloader = ref(false)

const responseParams = ref({
  page: 1,
  per_page: 10,
})

const moreData = ref(true)

const data = ref<IReviewWithProduct[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/review?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<IpaginatedRespoinse<IReviewWithProduct>>(url, {
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

const columns: ColumnDef<IReviewWithProduct>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return h('small', {
        innerHTML: new Date(row.original.created_at).toLocaleString('en-BD', { dateStyle: 'medium' })
      })
    },
  },
  {
    accessorKey: "user",
    header: "Buyer",
    cell: ({ row }) => {
      return h(UserListViewItem, {
        class: "",
        modelValue: row.original.user
      });
    }
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return h('small', {
        innerHTML: row.original.product.title
      })
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return h(Rating, {
        class: "",
        modelValue: row.original.rating
      });
    }
  },
  {
    accessorKey: "comment",
    header: "Comment"
  },
]

onMounted(() => {
  fetchData(responseParams.value)
})
</script>

<template>
  <div class="my-5">
    <div class="flex items-center justify-between">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Reviews</h1>
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
