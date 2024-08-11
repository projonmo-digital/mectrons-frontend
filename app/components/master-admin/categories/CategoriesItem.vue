<script setup lang="ts">
import { ref } from 'vue'
import type { ICategory } from '@/types/categories'

import CategoriesItem from './CategoriesItem.vue'
import AddEditCategory from './AddEditCategoryModal.vue'
import ConfirmationModal from '@/components/common/ConfirmationModal.vue'

import { useToast } from "@/components/ui/toast/use-toast"
import { useEmitter } from '@/composables/emitter'

const emitter = useEmitter()
const { toast } = useToast()

interface Props {
    root?: boolean
    category: ICategory,
    parent?: ICategory
}
const props = defineProps<Props>()

const isExpanded = ref(false)
const loading = ref(false)
const isDelConfirmationModalOpen = ref(false)

const confirm = (ev: any) => {
    deleteCategory(props.category.id)
}
const cancel = () => {
    console.log('cancel');
    isDelConfirmationModalOpen.value = false
}

const deleteCategory = async (id: number) => {
    try {
        loading.value = true;
        const token = useCookie('token');

        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/category/${id}`,
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
        emitter.emit('refetch-category')
        isDelConfirmationModalOpen.value = false
    } catch (error) {
    } finally {
        loading.value = false
    }
}

</script>
<template>
    <div class="border bg-gray-100 rounded-lg p-3 flex justify-between items-center">
        <div class="flex gap-3 items-center">
            <icon v-if="category.children.length" class="text-primary cursor-pointer w-6 h-6 p-[6px] bg-transparent hover:bg-primary/10 rounded-full flex justify-center items-center" :name=" isExpanded ? 'bxs:down-arrow' : 'bxs:right-arrow'" @click="isExpanded = !isExpanded" />
            <span class=" text-gray-700 font-bold">{{ category.name }}</span>
        </div>
        <div>
            <AddEditCategory :parent="category" />
            <AddEditCategory :parent="parent!" :category="category" />
            <button v-if="!root" class="text-gray-500 hover:text-primary text-2xl" @click="isDelConfirmationModalOpen = true"><icon name="mdi:bin" /></button>
            <ConfirmationModal v-model="isDelConfirmationModalOpen" :loading="loading" @confirm="confirm" @cancel="cancel"></ConfirmationModal>
        </div>
    </div>
    <div class="pl-4 flex flex-col gap-1" v-if="category.children.length && isExpanded">
        <CategoriesItem v-for="(childCategory, index) in category.children" :key="`category-${category.id}-${index}`" :parent="category"
            :category="childCategory" />
    </div>
</template>