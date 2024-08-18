<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IProduct } from '~/types/products';
import { useToast } from "@/components/ui/toast/use-toast"

const { user } = storeToRefs(useAuthStore())

const { toast } = useToast()

interface Props {
    product: IProduct
}

const emit = defineEmits(['success'])

const props = defineProps<Props>()
const fromData = ref<any>({})
const loading = ref(false)

const submit = async () => {
    if (user.value?.type !== 'buyer') {
        toast({
            title: "Warning",
            class: 'bg-yellow-500/80',
            description: 'You are not allowed',
        });
    }
    else {
        try {
            loading.value = true;
            const token = useCookie('token');

            const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/review`,
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
            emit('success')
            fromData.value = {}
        } catch (error) {
            const err = error as any;
            toast({
                title: "Error",
                class: 'bg-red-500',
                description: err.response._data.message,
            });            
        } finally {
            loading.value = false
        }
    }
}

onMounted(() => {
    fromData.value.product_id = props.product.id
})
</script>

<template>
    <div>
        <form class="my-3">
            <div class="flex items-center my-3">
                <Icon name="mdi:star" @click="fromData.rating = 1" class="text-xl text-gray-300 cursor-pointer hover:text-orange-500"
                    :class="{ 'text-primary': fromData.rating >= 1 }"></Icon>
                <Icon name="mdi:star" @click="fromData.rating = 2" class="text-xl text-gray-300 cursor-pointer hover:text-orange-500"
                    :class="{ 'text-primary': fromData.rating >= 2 }"></Icon>
                <Icon name="mdi:star" @click="fromData.rating = 3" class="text-xl text-gray-300 cursor-pointer hover:text-orange-500"
                    :class="{ 'text-primary': fromData.rating >= 3 }"></Icon>
                <Icon name="mdi:star" @click="fromData.rating = 4" class="text-xl text-gray-300 cursor-pointer hover:text-orange-500"
                    :class="{ 'text-primary': fromData.rating >= 4 }"></Icon>
                <Icon name="mdi:star" @click="fromData.rating = 5" class="text-xl text-gray-300 cursor-pointer hover:text-orange-500"
                    :class="{ 'text-primary': fromData.rating >= 5 }"></Icon>
            </div>
            <textarea rows="4" class="border w-full p-3" v-model="fromData.comment"
                placeholder="Write Your Review"></textarea>
            <button type="button" :disabled="loading || !(fromData.comment && fromData.rating)"
                class="bg-primary px-5 py-2 rounded-lg text-white hover:bg-orange-500 disabled:bg-orange-300"
                @click="submit">Save</button>
        </form>
    </div>
</template>