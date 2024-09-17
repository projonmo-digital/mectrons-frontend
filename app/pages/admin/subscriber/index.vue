<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import type { ColumnDef } from "@tanstack/vue-table"
import type { IpaginatedRespoinse } from '~/types/response'
import type { ISubscribe } from '~/types/subscribe'

const preloader = ref(false)
const responseParams = ref({
  page: 1,
  per_page: 10,
})

const moreData = ref(true)
const data = ref<ISubscribe[]>([])

// methods
const fetchData = async (params = {}) => {
  const token = useCookie('token')
  try {
    preloader.value = true
    let url = `${useRuntimeConfig().public.baseUrl}/subscribe?${new URLSearchParams(params).toString()}`;
    const response = await $fetch<IpaginatedRespoinse<ISubscribe>>(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
    if (response) {
      responseParams.value.page = response.current_page
      data.value = response.data
      moreData.value = response.last_page === response.current_page
    }
  } catch (error) {
    console.error(error)
    return []
  } finally {
    preloader.value = false
  }
}

const columns: ColumnDef<ISubscribe>[] = [
  {
    accessorKey: "taken_at",
    header: () => h("div", { class: "text-start" }, "Taken By"),
    cell: ({ row }) => {
      return h('a', {
        class: 'text-primary hover:underline',
        target: '_blank',
        href: `mailto:${row.original.email}`,
        innerHTML: row.original.email
      })
    },
  },
  {
    accessorKey: "started_at",
    header: "Subscribe At ",
    cell: ({ row }) => {
      return h('span', {
        innerHTML: new Date(row.original.created_at).toLocaleString('en-BD', { dateStyle: 'medium' })
      })
    },
  },
]

const nextPage = () => {
  responseParams.value.page++
  fetchData(responseParams.value)
}
const previousPage = () => {
  responseParams.value.page--
  fetchData(responseParams.value)
}

const downloadSubscribeList = async (params = {}) => {
  const token = useCookie('token')
  try {
    let url = `${useRuntimeConfig().public.baseUrl}/subscribe/all?${new URLSearchParams(params).toString()}`;
    window.open(url)
  } catch (error) {
    return []
  } finally { }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="my-5">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Subscriber</h1>
      <div class="flex gap-3 my-2">
        <button :disabled="false"
          class="bg-primary hover:bg-orange-500 px-3 shadow-lg py-1 text-white rounded disabled:bg-orange-300"
          @click="downloadSubscribeList">Download</button>
      </div>
    </div>
    <hr class="my-2">
    <div class="relative">
      <DataTable v-if="data" :columns="columns" :data="data" />
      <div class="flex gap-3 my-2">
        <button :disabled="responseParams.page <= 1"
          class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300" @click="previousPage">Previous</button>
        <button :disabled="moreData" class="bg-primary px-2 py-1 text-white rounded disabled:bg-orange-300"
          @click="nextPage">Next</button>
      </div>
      <div v-if="preloader"
        class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
      </div>
    </div>
  </div>
</template>
