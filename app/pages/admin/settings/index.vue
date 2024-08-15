<script setup lang="ts">
import { ref, onMounted } from 'vue'

import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'
import { useToast } from '@/components/ui/toast/use-toast'

import type { ColumnDef } from "@tanstack/vue-table"
import type { IMethod } from '~/types/method'
import PaymentMethod from '~/components/master-admin/settings/PaymentMethod.vue'

const { toast } = useToast()

definePageMeta({
  middleware: ["auth", "admin"]
})

const router = useRouter()

const preloader = ref(false)
const data = ref<IMethod[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/payment-method?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<any[]>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    data.value = response
  } catch (error) {
    console.error(error)
    return []
  } finally {
    preloader.value = false
  }
}

onMounted(() => {
  fetchData({})
})
</script>

<template>
  <div class="my-5">

    <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Payment methods</h1>
      </div>
      <hr class="my-5">
    <div class="relative">
      <div class="flex flex-col gap-3 max-w-[600px] w-full">
        <PaymentMethod v-for="(method, index) in data" :key="`method-item-${method.id}`" :method="method" />
      </div>
      <div v-if="preloader"
        class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
    </div>
  </div>
</template>
