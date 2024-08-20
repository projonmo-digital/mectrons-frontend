<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import Switch from "~/components/ui/switch/Switch.vue"
import ProductInfo from "~/components/master-admin/product/ProductInfo.vue"

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const preloader = ref(false)

const responseParams = ref({
    page: 1,
    per_page: 10,
})

const moreData = ref(true)

const total_upload = ref(0)
const total_sold = ref(0)

const data = ref<any[] | null>(null)

// methods
const fetchData = async (params = {}) => {
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/approved/products?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
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
    }finally{
        preloader.value = false
    }
}
const getTotalSale = async () => {
    const token = useCookie('token')
    try {
        let url = `${useRuntimeConfig().public.baseUrl}/sell-count`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response) {
          total_sold.value = response as number
        } else {
            console.error("Invalid response format")
            return []
        }
    } catch (error) {
        console.error(error)
        return []
    }finally{
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
    header: "Info",
    cell: ({ row }) => {
      const id = row.original.id;
      return h(ProductInfo, {
        class: "text-right font-medium",
        modelValue: row.original
      });
    }
  },
  {
    accessorKey: "approved_at",
    header: "Approved",
    cell: ({ row }) => {
      return h('small', {
        class: row.original.approved_at ? '' : 'bg-red-500 px-3 py-2 rounded-full text-white',
        innerHTML: row.original.approved_at ? new Date(row.original.approved_at).toLocaleString('en-BD', { dateStyle: 'medium' }) : 'Pending'
      })
    },
  },
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
  Promise.all([fetchData(responseParams.value),  getTotalSale()]).finally(() => {

  })
})
</script>

<template>
    <div class="my-5">
      <div class="my-5 grid grid-cols-2 gap-5">
          <NuxtLink to="/seller/product/add" class="scale-100 hover:scale-105 transform transition duration-300 ease-in-out border rounded-lg cursor-pointer p-5 flex justify-center items-center shadow-lg" >
            <div class="w-16 h-16 rounded-full flex items-center justify-center bg-primary p-2">
              <Icon class="text-white w-10 h-10" name="fa:plus" />
            </div>
          </NuxtLink>
          <div class="shadow-lg bg-gradient-to-tr from-primary to-orange-900 rounded-xl p-3 text-white flex flex-col items-center">
            <Icon class="text-5xl text-primary" name="fa:download" />
            <p class="my-3 text-3xl font-bold">{{ total_sold }}</p>
            <p class="">Product sold</p>
          </div>
        </div>
        <div class="flex gap-3 my-2">
            <button :disabled="responseParams.page <= 1" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
            <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="nextPage">Next</button>
        </div>
        <div class="relative">
            <DataTable v-if="data" :columns="columns" :data="data" />
            <div v-if="preloader" class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
                <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
            </div>
        </div>
    </div>
</template>
