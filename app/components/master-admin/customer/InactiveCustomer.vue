<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import Switch from "~/components/ui/switch/Switch.vue"
import OderInfo from '~/components/master-admin/order/OderInfo.vue'
import DatatableDropdownAction from '~/components/common/DatatableDropdownAction.vue'

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

const router = useRouter()

const preloader = ref(false)
const responseParams = ref({
    page: 1,
    per_page: 10,
})

const moreData = ref(true)
const data = ref<any[] | null>([])

// methods
const fetchData = async (params = {}) => {
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/sold?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response && response.data.data) {
            responseParams.value.page = response.data.current_page
            data.value = response.data.data
            moreData.value = response.data.last_page === response.data.current_page
            return response.data.data // Adjust based on actual response structure
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

const showDetail = (id: string) => {
  router.push(`/admin/customer/${id}`)
}

const sentToSeller = async (row: any) => {
  const token = useCookie('token')
  let generatedId = new Date(row.created_at).toLocaleString('en-BD', { year: '2-digit', month: '2-digit' }).split('/').reverse().join('') + row.id
  
  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/delivery-status/${generatedId}/delivered`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        lazy: true
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
    accessorKey: "seller",
    header: () => h("div", { class: "text-start" }, "Seller"),
    cell: ({ row }) => {
      return row.original.seller?.name
    }
  },
  {
    accessorKey: "to_address",
    header: () => h("div", { class: "text-start" }, "Address"),
  },
  {
    accessorKey: "buyer",
    header: () => h("div", { class: "text-start" }, "Buyer"),
    cell: ({ row }) => {
      return row.original.seller?.name
    }
  },
  {
    accessorKey: "delivery_status",
    header: () => h("div", { class: "text-start" }, "Status"),
  },
  {
    accessorKey: "method",
    header: () => h("div", { class: "text-start" }, "Method"),
  },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-end" }, "Action"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(DatatableDropdownAction, {
        class: "text-right font-medium",
        row: row.original,
        action: [
            {
                title: 'Send to Seller',
                method: (row: any) => {
                  sentToSeller(row)
                },
                hide: row.original.delivery_status !== 'placed'
            },
            {
                title: 'Show Detail',
                method: (row: any) => {
                  showDetail(row.id)
                },
            },
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
