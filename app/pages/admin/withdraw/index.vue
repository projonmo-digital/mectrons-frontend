<script setup lang="ts">
import { ref } from 'vue'
import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IPaymentHistory } from '~/types/payment'
import type { IpaginatedRespoinse } from '~/types/response';

definePageMeta({
  middleware: ["auth", "admin"]
})

useHead({
  title: 'Widthdraw - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

// datatable
const preloader = ref(false)
const responseParams = ref({
  page: 1,
  per_page: 10,
})

const moreData = ref(true)
const data = ref<IPaymentHistory[]>([])

const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/withdraw/due?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<IpaginatedRespoinse<IPaymentHistory>>(url, {
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

const statusChange = async (row: IPaymentHistory) => {
  const token = useCookie('token')
  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/withdraw/complete/${row.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        }
      }
    );
    fetchData(responseParams.value)
  } catch (err) {
  }
  finally { }
};


const columns: ColumnDef<IPaymentHistory>[] = [
  {
    accessorKey: "withdraw_date",
    header: "Date",
    cell: ({ row }) => {
      return h('span', {
        class: "text-right font-medium",
        innerHTML: new Date((row.original.withdraw_date || row.original.add_date)!).toLocaleString('en-BD', { dateStyle: 'medium' }),
      });
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return h('span', {
        class: row.original.status === 'paid' ? 'text-green-500 capitalize' : row.original.status === 'due' ?  'text-red-500 capitalize' : 'text-blue-500 capitalize',
        innerHTML: row.original.status.split('-').join(' '),
      });
    }
  },
  {
    accessorKey: "withdraw_amount",
    header: "Amount",
    cell: ({ row }) => {
      return h('span', {
        class: "text-right font-medium",
        innerHTML: row.original.withdraw_amount || row.original.add_amount,
      });
    }
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
            title: 'Complete',
            method: (row: IPaymentHistory) => {
              statusChange(row)
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
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold">Widthdraw Request</h1>
    <div class="flex gap-3 my-2">
      <button :disabled="responseParams.page <= 1"
        class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
      <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
        @click="nextPage">Next</button>
    </div>
  </div>
  <hr class="my-2">
  <div class="relative">
    <DataTable v-if="data" :columns="columns" :data="data" />
    <div v-if="preloader"
      class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen flex justify-center items-center">
      <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
    </div>
  </div>
</template>
