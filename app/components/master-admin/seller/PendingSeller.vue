<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef, RowData } from "@tanstack/vue-table"
import Switch from "~/components/ui/switch/Switch.vue"
import ProductInfo from "~/components/master-admin/product/ProductInfo.vue"
import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'

import { useToast } from '@/components/ui/toast/use-toast'
import UserListViewItem from '~/components/Common/UserListViewItem.vue'
import { getGeneratedID } from '~/helper'

const router = useRouter()

const { toast } = useToast()

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
        let url = `${useRuntimeConfig().public.baseUrl}/pending/users?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
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
    }finally{
        preloader.value = false
    }
}

const approveSeller = async (id: string) => {
  const token = useCookie('token')
  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/approve/user/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (data.value) {
      toast({
        class: 'capitalize',
        title: data.value?.status,
        description: data.value?.message,
      });
      fetchData(responseParams.value)
    }    
    if(error.value){
      toast({
        class: 'bg-red-500 capitalize',
        title: error.value?.data.status,
        description: error.value?.data.message,
      });
    }
    await refreshNuxtData();
  } catch (error) {
    await refreshNuxtData();
    console.log(error);
  }
};

const sellerDetail = (row: any) => {
  let generatedId = getGeneratedID(row)
  router.push(`/admin/seller/${generatedId}`)
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
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return h(UserListViewItem, {
        class: "",
        modelValue: row.original
      });
    }
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-start" }, "Email"),
  },
  {
    accessorKey: "nid",
    header: () => h("div", { class: "text-start" }, "National ID"),
  },
  {
    accessorKey: "phone",
    header: () => h("div", { class: "text-start" }, "Phone"),
  },
  // {
  //   accessorKey: "approved_at",
  //   header: "Approved",
  //   cell: ({ row }) => {
  //     return h('small', {
  //       class: 'bg-red-500 px-3 py-2 rounded-full text-white',
  //       innerHTML: row.original.approved_at || 'Pending'
  //     })
  //   },
  // },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-end" }, "Action"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(DatatableDropdownAction, {
        class: "text-end font-medium",
        row: row.original,
        action: [
            {
                title: 'Approved',
                method: (row: any) => {
                    approveSeller(row.id)
                },
            },
            {
                title: 'Show Detail',
                method: (row: any) => {
                  sellerDetail(row)
                },
            }
        ]
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
