<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toast } from '~/components/ui/toast'
import { getFileUrl } from '~/helper'
import type { IUserResponse } from '~/types/auth';

const authStore = useAuthStore()

definePageMeta({
    middleware: ["auth", "user"]
})

useHead({
  title: 'Settings - Mectrons User',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})


// state
const preloader = ref(true)
const formData = ref<any>({})
const errors = ref<any>({})

const chooseImageHandler = (event: any) => {
    let input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', async(event: any) => {
        let imageFile = event.target.files[0]
        const fd = new FormData()
        const token = useCookie('token')
        fd.append('profile_picture', imageFile)
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/profile-picture`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body: fd
        });
        if(response){
            getSettings()
        }
    })
    input.click()
}

const submit = async () => {
    const token = useCookie('token');
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/profile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body: JSON.stringify(formData.value)
        });
        getSettings()
        toast({ description: response.message, variant: 'default' })
    } catch (error) {
        errors.value = error.response._data.errors
    }
};

const getUrl = (data: File | string) => {
    if(data instanceof File) return URL.createObjectURL(data)
    else return getFileUrl(data)
}

const getSettings = async (params = {}) => {
    const token = useCookie('token')
    const user = useCookie("user");
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/profile?${new URLSearchParams(params).toString()}`;
        const response = await $fetch<IUserResponse>(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        user.value = JSON.stringify(response)
        authStore.user = response
        if (response) {
            let data = {
                email: response['email'] || "",
                name: response['name'] || "",
                mobile: response['mobile'] || "",
                profile_picture: response.profile_picture || '',
                address: response.profile.address || "",
            }
            formData.value = data
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

onMounted(() => {
    getSettings()
})
</script>

<template>
    <div class="flex flex-col gap-5 relative">
        <div class="flex flex-col">
            <HeaderWithHr header="Settings" />
        </div>
        <div v-if="preloader" class=" absolute inset-0 bg-white bg-opacity-50 w-full h-screen  flex justify-center items-center">
                <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
            </div>
        <div v-else class="flex flex-col gap-5">
            <div class="flex flex-col">
                <div class="flex flex-col gap-8">
                    <div class="flex --items-center">
                        <table class="w-full max-w-[600px]">
                            <tr>
                                <td class="py-3"><Label for="email">Email</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.email" disabled type="text" placeholder="email" />
                                    <small class="text-red-500" v-if="errors['email']">{{ errors['email'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="name">Name</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.name" type="text" placeholder="Name" />
                                    <small class="text-red-500" v-if="errors['name']">{{ errors['name'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="mobile">Mobile</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.mobile" type="text" placeholder="mobile" />
                                    <small class="text-red-500" v-if="errors['mobile']">{{ errors['mobile'][0] }}</small>
                                </td>
                            </tr>
                            
                            <tr>
                                <td class="py-3"><Label for="address">Address</Label></td>
                                <td class="py-3">
                                    <textarea class="w-full border" v-model="formData.address"></textarea>
                                    <small class="text-red-500" v-if="errors['address']">{{ errors['address'][0] }}</small>
                                </td>
                            </tr>
                        </table>
                        <div class="flex-1">
                            <div class="flex justify-center items-center mt-24">
                                <div @click="chooseImageHandler" class="border cursor-pointer rounded-lg bg-gray-200 w-[160px] h-[160px] relative overflow-hidden">
                                    <img :src="getUrl(formData.profile_picture)" class="w-full h-full object-cover" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <Button type="button" @click="submit" class="px-12">Save</Button>
            </div>
        </div>
    </div>
</template>