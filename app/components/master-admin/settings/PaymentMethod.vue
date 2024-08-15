<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IMethod } from '~/types/method';
import { useToast } from "@/components/ui/toast/use-toast"

interface Props {
    method: IMethod
}

const props = defineProps<Props>()
const { toast } = useToast()

const preloader = ref(false)
const fromData = ref<any>({})
const editable = ref(false)

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

onMounted(() => {
    fromData.value = {
        method: props.method.method,
        number: props.method.number
    }
})

</script>
<template>
    <div class="p-3 bg-orange-50 flex justify-between items-center">
        <span>{{ method.method }}</span>
        <div class="flex gap-3 items-center">
        <input v-model="fromData.number" class="p-2 border" type="text" :disabled="!editable">
        <button v-if="!editable" class="text-gary-900 hover:text-primary" @click="editable = true"><icon name="lucide:edit"/></button>
        <button v-else class="text-gary-900 hover:text-primary" @click="submit"><icon name="material-symbols:check"/></button>
        </div>
    </div>
</template>