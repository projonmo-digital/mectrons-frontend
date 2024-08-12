<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IOffer } from '~/types/offer'

import { useToast } from '@/components/ui/toast/use-toast'
import DatatableDropdownAction from '~/components/common/DatatableDropdownAction.vue'
import ConfirmationModal from '@/components/common/ConfirmationModal.vue'
import AddEditOfferModal from '~/components/master-admin/offer/AddEditOfferModal.vue'

const { toast } = useToast()
const appStore = useAppStore()

const preloader = ref(false)
const router = useRouter()
const loading = ref(false)
const selectedOffer = ref<IOffer | null>(null)

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
            method: (row: IOffer) => {
              selectedOffer.value = row
              openDelConfirmationModal()
            },
            icon: 'mdi:bin'
          }
        ]
      });
    }
  }
]

//offer add edit modal
const isAddEditModalOpen = ref<boolean>(false)
const openAddEditModal = () => {
  isAddEditModalOpen.value = true
}

const closeAddEditModal = () => {
  isAddEditModalOpen.value = false
}
const afterSuccess = () => {
  closeAddEditModal()
  fetchData()
}

// offer delete confirmation modal
const isDelConfirmationModalOpen = ref(false)

const confirmDelConfirmationModal = (ev: any) => {
  if (selectedOffer.value) {
    deleteOffer(selectedOffer.value.id)
  }
}

const openDelConfirmationModal = () => {
  isDelConfirmationModalOpen.value = true
}

const cancelDelConfirmationModal = () => {
  isDelConfirmationModalOpen.value = false
  loading.value = false
  selectedOffer.value = null
}

const deleteOffer = async (id: number) => {
  try {
    loading.value = true;
    const token = useCookie('token');

    const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/flash-sale/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`,
        }
      }
    );
    toast({
      title: "Success",
      description: response?.message,
    });
    fetchData()
    appStore.getCetagories(false)
    isDelConfirmationModalOpen.value = false
  } catch (error) {
  } finally {
    loading.value = false
  }
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
    <AddEditOfferModal @open="openAddEditModal" @success="afterSuccess" @close="closeAddEditModal"
      v-model="isAddEditModalOpen"></AddEditOfferModal>
    <ConfirmationModal v-model="isDelConfirmationModalOpen" 
    message="Do you want to delete offer?"
    :loading="loading" @confirm="confirmDelConfirmationModal" @cancel="cancelDelConfirmationModal" />
  </div>
</template>
