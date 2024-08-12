<script setup lang="ts">
import { ref, onMounted } from "vue"
import Modal from "~/components/common/Modal.vue"
import { useToast } from "@/components/ui/toast/use-toast"
import { useEmitter } from '@/composables/emitter'
import type { IOffer } from "~/types/offer"
import dayjs from 'dayjs'

const emitter = useEmitter()
const { toast } = useToast()

interface Props {
    offer?: IOffer
}

const props = defineProps<Props>()
const emit = defineEmits(['open', 'close', 'success'])
const model = defineModel<any>()

const loading = ref(false)
const formData = ref<any>({})
const errors = ref<any>({})

const submit = async () => {
    try {
        errors.value = {};
        loading.value = true;
        const token = useCookie('token');
        let body = new FormData()

        for (const key in formData.value) {
            if (key !== 'image') {
                if (['to', 'from'].includes(key)) {
                    body.append(key, dayjs(formData.value[key]).format('YYYY-MM-DD HH:mm:ss'))
                } else {
                    body.append(key, formData.value[key])
                }
            } else {
                if (formData.value[key] instanceof File) {
                    body.append(key, formData.value[key])
                }
            }
        }

        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/flash-sale`,
            {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
                body
            }
        )

        toast({
            title: "Success",
            description: response?.message,
        });
        emit('success')
    } catch (error) {
        const err = error as any;
        errors.value = err.response._data.errors
    } finally {
        loading.value = false
    }
}

const openModal = () => {
    emit('open')
}

const closeModal = () => {
    emit('close')
    errors.value = {}
    formData.value = {}
}

const changeImage = (event: any) => {
    const file = event.target.files[0]
    formData.value.image = file
}

onMounted(() => {
    let offer = props.offer
    if (offer) {
        formData.value = {
            name: offer.name,
            from: offer.from,
            to: offer.to,
            amount: offer.amount,
            unit: offer.unit,
            image: offer.image,
            desc: offer.desc
        }
    }
})

</script>

<template>
    <Modal v-model="model" :title="offer ? 'Update Offer' : 'Make an offer'" @open="openModal" @close="closeModal">
        <template #btn>
        </template>
        <template #content>
            <div class="grid grid-cols-2 gap-5">
                <div class="flex flex-col gap-1 col-span-2">
                    <label>Name</label>
                    <input class="border px-3 py-2" type="text" v-model="formData.name" placeholder="Name">
                    <span v-if="Object.keys(errors).includes('name')" class="text-sm text-red-500">{{ errors.name[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label>From</label>
                    <input class="border px-3 py-2" type="datetime-local" v-model="formData.from" placeholder="From">
                    <span v-if="Object.keys(errors).includes('from')" class="text-sm text-red-500">{{ errors.from[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label>To</label>
                    <input class="border px-3 py-2" type="datetime-local" v-model="formData.to" placeholder="To">
                    <span v-if="Object.keys(errors).includes('to')" class="text-sm text-red-500">{{ errors.to[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label>Amount</label>
                    <input class="border px-3 py-2" type="number" v-model="formData.amount" placeholder="Amount">
                    <span v-if="Object.keys(errors).includes('amount')" class="text-sm text-red-500">{{ errors.amount[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1">
                    <label>Unit</label>
                    <input class="border px-3 py-2" type="text" v-model="formData.unit" placeholder="Unit">
                    <span v-if="Object.keys(errors).includes('unit')" class="text-sm text-red-500">{{ errors.unit[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1 col-span-2">
                    <label>Description</label>
                    <textarea class="border px-3 py-2" type="text" v-model="formData.desc"
                        placeholder="Description"></textarea>
                    <span v-if="Object.keys(errors).includes('desc')" class="text-sm text-red-500">{{ errors.desc[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-1 col-span-2">
                    <label>Image</label>
                    <input class="border px-3 py-2" type="file" @change="changeImage">
                    <span v-if="Object.keys(errors).includes('image')" class="text-sm text-red-500">{{ errors.image[0]
                        }}</span>
                </div>
            </div>
            <hr class="my-3">
            <ButtonPrimary type="submit" :disabled="loading" @click.prevent="submit">
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
                    <span>Save</span>
                </div>
            </ButtonPrimary>
        </template>
    </Modal>
</template>
