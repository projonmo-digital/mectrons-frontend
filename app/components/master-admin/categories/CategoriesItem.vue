<script setup lang="ts">
import { ref } from 'vue'
import type { ICategory, IFlashSale } from '@/types/categories'

import CategoriesItem from './CategoriesItem.vue'
import AddEditCategory from './AddEditCategoryModal.vue'
import SelectFalashSaleModal from './SelectFalashSaleModal.vue'
import ConfirmationModal from '@/components/Common/ConfirmationModal.vue'

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

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
}

const confirm = (ev: any) => {
    deleteCategory(props.category.id)
}

const cancel = () => {
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

// flashSale
const isFlashSaleOpen = ref(false)
const isRemoveFlashConfirmationModalOpen = ref(false)
const flashSaleLoading = ref(false)
const selectedFlash = ref<IFlashSale | null>(null)

const toggleFlashSale = () => {
    isFlashSaleOpen.value = !isFlashSaleOpen.value
}

const flashSaleWannaRemove = (flashSale: IFlashSale) => {
    selectedFlash.value = flashSale
    isRemoveFlashConfirmationModalOpen.value = true
}

const AddFlashSale = () => {}
const confirmRemoveFlash = async () => {
    try {
        loading.value = true;
        const token = useCookie('token');
        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/flash-sale/remove/${selectedFlash.value?.id}`,
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
        isRemoveFlashConfirmationModalOpen.value = false
    } catch (error) {
    } finally {
        loading.value = false
    }
}

const cancelFlash = () => {
    selectedFlash.value = null
    isRemoveFlashConfirmationModalOpen.value = false
}

</script>
<template>
    <div class="border bg-gray-100 rounded-lg p-3 flex justify-between items-center">
        <div class="flex gap-3 items-center">
            <icon v-if="category.children.length" class="text-primary cursor-pointer w-6 h-6 p-[6px] bg-transparent hover:bg-primary/10 rounded-full flex justify-center items-center" :name=" isExpanded ? 'bxs:down-arrow' : 'bxs:right-arrow'" @click="toggleExpanded" />
            <span class=" text-gray-700 font-bold">{{ category.name }}</span>
        </div>
        <div>
            <span v-if="category.flash_sale_offers.length" class="w-2 h-2 rounded-full bg-primary inline-block mr-1"></span>
            <!--<button class="px-3 py-1 text-sm rounded-full text-white hover:bg-orange-500 mr-3"
             :class="isFlashSaleOpen ? 'bg-primary': 'bg-gray-500'" @click="toggleFlashSale">Flah sale</button>-->
            <button class="text-gray-500 hover:text-primary text-2xl"
            :class="isFlashSaleOpen ? 'text-primary': 'text-gray-500'"
            @click="toggleFlashSale"><icon name="mdi:flash" /></button>
            <AddEditCategory :parent="category" />
            <AddEditCategory :parent="parent!" :category="category" />
            <button v-if="!root" class="text-gray-500 hover:text-primary text-2xl" @click="isDelConfirmationModalOpen = true"><icon name="mdi:bin" /></button>
            <ConfirmationModal v-model="isDelConfirmationModalOpen" :loading="loading" @confirm="confirm" @cancel="cancel"></ConfirmationModal>
            <ConfirmationModal v-model="isRemoveFlashConfirmationModalOpen" message="Do you want to remove offer?" :loading="flashSaleLoading"
             @confirm="confirmRemoveFlash" @cancel="cancelFlash"></ConfirmationModal>
        </div>
    </div>
    <div v-if="isFlashSaleOpen" class="border bg-orange-50 p-3 flex flex-wrap gap-2">
        <div class="flex items-center justify-center text-white rounded-full text-sm bg-primary" v-for="(flashSale, index) in category.flash_sale_offers" :key="`flash-sale-${category.id}-${flashSale.id}-${index}`">
            <span class="px-3">{{ flashSale.offer.name }}</span>
            <button class="text-orange-200 hover:text-white" @click="flashSaleWannaRemove(flashSale)">
                <icon class="w-8 h-8" name="carbon:close-filled"></icon>
            </button>
        </div>
        <SelectFalashSaleModal :category="category"></SelectFalashSaleModal>
    </div>
    <div class="pl-4 flex flex-col gap-1" v-if="category.children.length && isExpanded">
        <CategoriesItem v-for="(childCategory, index) in category.children" :key="`category-${category.id}-${index}`" :parent="category"
            :category="childCategory" />
    </div>
</template>