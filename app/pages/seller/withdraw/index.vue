<script setup lang="ts">
import { ref } from 'vue'
import Modal from "~/components/Common/Modal.vue"
import type { ColumnDef } from "@tanstack/vue-table"
import type { IPaymentHistory } from '~/types/payment';
import type { IpaginatedRespoinse } from '~/types/response';
import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

definePageMeta({
  middleware: ["auth", "seller"]
})

useHead({
  title: 'Withdraw - Mectrons Seller',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

// others
const withdrawAbleAmount = ref(0)
const getAmount = async () => {
  const token = useCookie('token')
  const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/wallet`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });
  withdrawAbleAmount.value = response.amount
}

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
    let url = `${useRuntimeConfig().public.baseUrl}/withdraw/history?${new URLSearchParams(params).toString()}`;
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
            title: 'Edit',
            method: (row: IPaymentHistory) => {
            },
          }
        ]
      });
    }
  }
]

// model
const { methods } = storeToRefs(useCartStore())

const errors = ref<any>({})
const loading = ref(false)
const fromData = ref<any>({})
const isPaymentModalOpen = ref(false)
const openPaymentModal = () => { }
const closePaymentModal = () => {
  isPaymentModalOpen.value = false
  fromData.value = {}
  errors.value = {}
}

const submit = async () => {
  try {
    errors.value = {};
    loading.value = true;
    const token = useCookie('token');
    const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/withdraw`,
      {
        method: "post",
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(fromData.value)
      }
    )
    toast({
      title: "Success",
      description: response?.message,
    });
    getAmount()
    fetchData(responseParams.value)
    closePaymentModal()
  } catch (error) {
    const err = error as any;
    if (err.response._data.errors) {
      errors.value = err.response._data.errors
    } else {
      toast({
        title: "Info",
        class: 'bg-red-500',
        description: err.response._data.message
      });
    }
  } finally {
    loading.value = false
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

onMounted(() => {
  fetchData(responseParams.value)
  getAmount()
})

</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl font-bold">Withdraw History</h1>
    <div class="flex gap-3 my-2">
        <button :disabled="responseParams.page <= 1" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
        <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="nextPage">Next</button>
    </div>
  </div>
  <hr class="my-2">
  <div class="my-5 grid grid-cols-2 gap-5">
    <div
      class="shadow-lg bg-gradient-to-tr from-primary to-orange-900 rounded-xl p-3 text-white flex flex-col items-center">
      <p class="my-3 text-5xl font-bold">{{ withdrawAbleAmount }} BDT</p>
      <p>Available balance</p>
    </div>
    <div @click="isPaymentModalOpen = true"
      class="border text-primary hover:text-white rounded-lg hover:bg-primary cursor-pointer p-5 flex flex-col gap-3 justify-center items-center shadow-lg">
      <div class="w-16 h-16 rounded-full flex items-center justify-center bg-primary p-2">
        <Icon class="text-white w-10 h-10" name="fa:send" />
      </div>
      <p>Send Withdraw request</p>
    </div>
    <Modal v-model="isPaymentModalOpen" title="Make an withdraw request" @open="openPaymentModal"
      @close="closePaymentModal">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <label>Amount</label>
            <input class="border p-3" v-model="fromData.amount" type="number" min="0" :max="withdrawAbleAmount"
              placeholder="Amount">
            <span v-if="Object.keys(errors).includes('amount')" class="text-sm text-red-500">{{ errors.amount[0]
              }}</span>
          </div>
          <div class="flex flex-col">
            <label>Payment method</label>
            <div class="pb-3 pt-4 flex gap-3 flex-wrap">
              <div class="flex items-center gap-3" v-for="(method, index) in methods" :key="`payment-methods-${index}`">
                <input type="radio" name="method" v-model="fromData.method" :value="method.value" required>
                <label class=" capitalize">{{ method.method.split('-').join(' ') }}</label>
              </div>
            </div>
            <span v-if="Object.keys(errors).includes('method')" class="text-sm text-red-500">{{ errors.method[0]
              }}</span>
          </div>
          <div class="flex flex-col">
            <label>Account Number</label>
            <input class="border p-3" v-model="fromData.number" type="text" min="0" max="100" placeholder="Number">
            <span v-if="Object.keys(errors).includes('number')" class="text-sm text-red-500">{{ errors.number[0]
              }}</span>
          </div>
          <div class="flex flex-col">
            <label>Message</label>
            <textarea class="border p-3" v-model="fromData.message" placeholder="Your message"></textarea>
            <span v-if="Object.keys(errors).includes('message')" class="text-sm text-red-500">{{ errors.message[0]
              }}</span>
          </div>
          <hr>
          <ButtonPrimary class="flex-1" type="button" :disabled="loading" @click="submit">
            <div class="flex items-center justify-center gap-x-2">
              <div role="status" v-if="loading">
                <svg aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <span>Request</span>
            </div>
          </ButtonPrimary>
        </div>
      </template>
    </Modal>
  </div>

  <div class="relative">
    <DataTable v-if="data" :columns="columns" :data="data" />
    <div v-if="preloader"
      class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen flex justify-center items-center">
      <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
    </div>
  </div>

</template>
