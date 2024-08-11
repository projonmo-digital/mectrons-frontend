<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IOffer } from '~/types/offer'

import { useToast } from '@/components/ui/toast/use-toast'
import DatatableDropdownAction from '~/components/common/DatatableDropdownAction.vue'
import AddEditOfferModal from '~/components/master-admin/offer/AddEditOfferModal.vue'

const { toast } = useToast()

const preloader = ref(false)
const router = useRouter()
const isAddEditModalOpen = ref<boolean>(false)
const data = ref<IOffer[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/flash-sale?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<IOffer[]>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    console.log(response)
    data.value = response
  } catch (error) {
    console.error(error)
    return []
  } finally {
    preloader.value = false
  }
}

const columns: ColumnDef<IOffer>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-start" }, "Name"),
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => {
      return h('span', {
        innerHTML: new Date(row.original.from).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'medium' })
      })
    },
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => {
      return h('span', {
        innerHTML: new Date(row.original.to).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'medium' })
      })
    },
  },
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
            title: 'Delete',
            method: (row: any) => {
              console.log(row);
            },
            icon: 'mdi:bin'
          }
        ]
      });
    }
  }
]

const openAddEditModal = () => {
  isAddEditModalOpen.value = true  
}

const closeAddEditModal = () => {
  isAddEditModalOpen.value = false
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="my-5">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Offers</h1>
      <div class="flex gap-3 my-2">
        <button :disabled="false"
          class="bg-primary hover:bg-orange-500 px-3 shadow-lg py-1 text-white rounded disabled:bg-orange-300"
          @click="isAddEditModalOpen = true">Make an Offer</button>
      </div>
    </div>
    <hr class="my-2">
    <div class="relative">
      <DataTable v-if="data" :columns="columns" :data="data" />
      <div v-if="preloader"
        class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
    </div>
    <AddEditOfferModal @open="openAddEditModal" @close="closeAddEditModal" v-model="isAddEditModalOpen"></AddEditOfferModal>
  </div>
</template>
