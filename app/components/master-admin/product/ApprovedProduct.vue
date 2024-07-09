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
        if (response && response.data && response.data) {
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

const approveProduct = async (id: string) => {
  const token = useCookie('token')
  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/approve/product/${id}`,
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

const markProductAs = async (id: string, value: string) => {
  const token = useCookie('token')
  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/product/mark-as`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          product_id: id,
          name: value,
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
const unmarkProductAs = async (id: number) => {
    const token = useCookie('token')
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/product/mark-as/${id}`,
        {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.value}`,
        }
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
};

const nextPage = () => {
    responseParams.value.page++
    fetchData(responseParams.value)
}
const previousPage = () => {
    responseParams.value.page--
    fetchData(responseParams.value)
}

const markerColumn = (markername: string,  header: string, key: string = 'marker'): ColumnDef<any> => {
    return {
        accessorKey: key,
        header: header,
        cell: ({ row }) => {
            const id = row.original.id;
            const marker = row.original.marker.find((i: { name: string }) => i.name === markername)
            return h(Switch, {
                class: "text-right font-medium",
                checked: !!row.original.marker.find((i: { name: string }) => i.name === markername),
                "onUpdate:checked": () => !!marker ? unmarkProductAs(marker.id) : markProductAs(id, markername)
            })
        }
    }
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
  markerColumn('todays-deal', 'Today\'s Deal'),
  markerColumn('featured', 'Featured'),
  markerColumn('electric', 'Electric'),
  markerColumn('best-sale', 'Best Sale'),
  markerColumn('deals-month', 'Deals\'s Month'),
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
