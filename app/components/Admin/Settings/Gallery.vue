<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ColumnDef } from "@tanstack/vue-table"
import { useToast } from "@/components/ui/toast/use-toast"
import DatatableDropdownAction from '~/components/Common/DatatableDropdownAction.vue'
import AddGalleryModal from './AddGalleryModal.vue';
import ConfirmationModal from '@/components/Common/ConfirmationModal.vue'
import MediaPreview from './MediaPreview.vue';

const { toast } = useToast()

const preloader = ref(false)
const fromData = ref<any>({})
const editable = ref(false)

const data = ref<any[] | null>([])

const fetchData = async (params = {}) => {
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/gallery?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<any>(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response) {
            data.value = response.map((i: string) => ({ url: i }))
            console.log(response);
        }
    } catch (error) {
        console.error(error)
        return []
    } finally {
        preloader.value = false
    }
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "url",
        header: "Media",
        size: 300,
        cell: ({ row }) => {
            return h(MediaPreview, {
                class: "",
                modelValue: row.original
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
                        title: 'Delete',
                        method: (row: any) => {
                            seletedItem.value = row
                            openDelConfirmationModal()
                        },
                    }
                ]
            });
        }
    }
]


const submit = async () => {
    try {
        preloader.value = true;
        const token = useCookie('token');
        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/payment-method`,
            {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
                body: JSON.stringify(fromData.value)
            }
        );
        toast({
            title: "Success",
            description: response?.message,
        });
        editable.value = false
    } catch (error) {
        console.log(error);
    } finally {
        preloader.value = false
    }
}

const loading = ref(false)
const seletedItem = ref<any>(null)
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
    if (seletedItem.value) {
        let url = seletedItem.value.url
        deleteItem(url)
    }
}

const openDelConfirmationModal = () => {
    isDelConfirmationModalOpen.value = true
}

const cancelDelConfirmationModal = () => {
    isDelConfirmationModalOpen.value = false
    loading.value = false
    seletedItem.value = null
}

const deleteItem = async (url: string) => {
    try {
        loading.value = true;
        const token = useCookie('token');

        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/gallery?${new URLSearchParams({url}).toString()}`,
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
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Homepage Gallery</h1>
        <div class="flex gap-3 my-2">
            <button :disabled="false"
                class="bg-primary hover:bg-orange-500 px-3 shadow-lg py-1 text-white rounded disabled:bg-orange-300"
                @click="isAddEditModalOpen = true">Upload media</button>
        </div>
    </div>
    <DataTable v-if="data" :columns="columns" :data="data" />
    <AddGalleryModal @open="openAddEditModal" @success="afterSuccess" @close="closeAddEditModal"
        v-model="isAddEditModalOpen" />
    <ConfirmationModal v-model="isDelConfirmationModalOpen" message="Do you want to delete media?" :loading="loading"
        @confirm="confirmDelConfirmationModal" @cancel="cancelDelConfirmationModal" />
</template>