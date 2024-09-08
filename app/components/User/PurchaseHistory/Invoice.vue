<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"

const preloader = ref(false)

const responseParams = ref({
  page: 1,
  per_page: 10,
})

const moreData = ref(true)

const data = ref<any[] | null>(null)

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/invoice?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<any>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    // console.log(response.data);

    if (response && response.data) {
      responseParams.value.page = response.current_page
      data.value = response.data
      moreData.value = response.last_page === response.current_page
      total.value = response.total
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
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return h('small', {
        innerHTML: new Date(row.original.created_at).toLocaleString('en-BD', { dateStyle: 'medium' })
      })
    },
  },
  {
    accessorKey: "mega_id",
    header: "#ID",
    cell: ({ row }) => {
      return h('a', {
        class: 'text-primary hover:underline',
        href: `/pages/cart/${row.original.mega_id}`,
        innerHTML: row.original.mega_id
      })
    },
  },
  {
    accessorKey: "delivery_status",
    header: "Status",
    cell: ({ row }) => {
      return h('small', {
        class: 'bg-primary px-3 py-1 rounded-full text-white capitalize',
        innerHTML: row.original.delivery_status
      })
    },
  },
  // {
  //   accessorKey: "stock_amount",
  //   header: "Info",
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(ProductInfo, {
  //       class: "text-right font-medium",
  //       modelValue: row.original
  //     });
  //   }
  // },
  // {
  //   accessorKey: "action",
  //   header: () => h("div", { class: "text-end" }, "Action"),,
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(DatatableDropdownAction, {
  //       class: "text-right font-medium",
  //       row: row.original,
  //       action: [
  //           {
  //               title: 'Approved',
  //               method: (row: any) => {
  //                   approveProduct(row.id)
  //               },
  //           }
  //       ]
  //     });
  //   }
  // }
]

onMounted(() => {
  fetchData(responseParams.value)
})
</script>

<template>
  <div class="my-5">
    <div class="flex items-center justify-between">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Purchase History</h1>
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
