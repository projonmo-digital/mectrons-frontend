<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IOffer } from '~/types/offer'

import { useToast } from '@/components/ui/toast/use-toast'
import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'
import ConfirmationModal from '@/components/Common/ConfirmationModal.vue'
import AddEditCouponModal from '~/components/Admin/Coupon/AddEditCouponModal.vue'

const { toast } = useToast()
const appStore = useAppStore()

const preloader = ref(false)
const router = useRouter()
const loading = ref(false)
const selectedOffer = ref<IOffer | null>(null)
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
        let url = `${useRuntimeConfig().public.baseUrl}/coupon?${new URLSearchParams(params).toString()}`;
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

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "taken_at",
    header: () => h("div", { class: "text-start" }, "Taken By"),
    cell: ({ row }) => {
      return h('span', {
        innerHTML: row.original.taken_at ? row.original.taken_at.name : 'Not Yet'
      })
    },
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-start" }, "Amount"),
  },
  {
    accessorKey: "code",
    header: () => h("div", { class: "text-start" }, "Code"),
  },
  {
    accessorKey: "started_at",
    header: "Started At ",
    cell: ({ row }) => {
      return h('span', {
        innerHTML: new Date(row.original.started_at).toLocaleString('en-BD', { dateStyle: 'medium' })
      })
    },
  },
  {
    accessorKey: "ended_at",
    header: "Ended At",
    cell: ({ row }) => {
      return h('span', {
        innerHTML: new Date(row.original.ended_at).toLocaleString('en-BD', { dateStyle: 'medium' })
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

const nextPage = () => {
    responseParams.value.page++
    fetchData(responseParams.value)
}
const previousPage = () => {
    responseParams.value.page--
    fetchData(responseParams.value)
}

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
    deleteCoupon(selectedOffer.value.id)
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

const deleteCoupon = async (id: number) => {
  try {
    loading.value = true;
    const token = useCookie('token');

    const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/coupon/${id}`,
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
      <h1 class="text-2xl font-bold">Coupons</h1>
      <div class="flex gap-3 my-2">
        <button :disabled="false"
          class="bg-primary hover:bg-orange-500 px-3 shadow-lg py-1 text-white rounded disabled:bg-orange-300"
          @click="isAddEditModalOpen = true">Add Coupon</button>
      </div>
    </div>
    <hr class="my-2">
    <div class="relative">
      <DataTable v-if="data" :columns="columns" :data="data" />
      <div class="flex gap-3 my-2">
            <button :disabled="responseParams.page <= 1" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
            <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="nextPage">Next</button>
        </div>
      <div v-if="preloader"
        class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
    </div>
    <AddEditCouponModal @open="openAddEditModal" @success="afterSuccess" @close="closeAddEditModal"
      v-model="isAddEditModalOpen" />
    <ConfirmationModal v-model="isDelConfirmationModalOpen" 
    message="Do you want to delete coupon?"
    :loading="loading" @confirm="confirmDelConfirmationModal" @cancel="cancelDelConfirmationModal" />
  </div>
</template>
