<script setup>
import { ref, onMounted } from 'vue'
import { toast } from '~/components/ui/toast'
import { getFileUrl } from '~/helper'

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
const formData = ref({})
const errors = ref({})

const chooseImageHandler = (event) => {
    console.log(event.target.files);
        let imageFile = event.target.files[0]
        formData.value.logo = imageFile
}

const submit = async () => {
    const token = useCookie('token');
    const fd = new FormData();

    Object.keys(formData.value).forEach(key => {
        if(key !== 'logo'){
            fd.append(key, formData.value[key])
        }
        if(key === 'logo' && formData.value[key] instanceof File){
            fd.append(key, formData.value[key])
        }
    });

    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/saler-settings`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body: fd
        });
        getSettings()
        toast({ description: response.message, variant: 'default' })
    } catch (error) {
        errors.value = error.response._data.errors
    }
};

const getUrl = (data) => {
    if(data instanceof File) return URL.createObjectURL(data)
    else return getFileUrl(data)
}

const getSettings = async (params = {}) => {
    const token = useCookie('token')
    try {
        preloader.value = true
        let url = `${useRuntimeConfig().public.baseUrl}/saler-settings?${new URLSearchParams(params).toString()}`;
        const response = await $fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        })
        if (response) {
            let data = {
                name: response['name'] || "",
                name_bn: response['name_bn'] || "",
                logo: response['logo'] || "",
                phone: response['phone'] || "",
                location: response['location'] || "",
                address: response['address'] || "",
                meta_title: response['meta_title'] || "",
                meta_desc: response['meta_desc'] || "",
                facebook: response['facebook'] || "",
                instragram: response['instragram'] || "",
                twitter: response['twitter'] || "",
                google: response['google'] || "",
                youtube: response['youtube'] || ""
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
            <div class="flex flex-col border p-5 rounded-lg">
                <div class="pb-2">
                    <h1 class="text-2xl">Basic Info</h1>
                </div>
                <hr>
                <div class="flex flex-col gap-8">
                    <div class="flex --items-center">
                        <table class="w-full max-w-[600px]">
                            <tr>
                                <td class="py-3"><Label for="shop_name">Shop Name</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.name" type="text" placeholder="Shop Name" />
                                    <small class="text-red-500" v-if="errors['name']">{{ errors['name'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="shop_name">Shop Name BN</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.name_bn" type="text" placeholder="Shop Name" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="picture">Picture</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" type="file" @change="chooseImageHandler" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="shop_phone">Shop Phone</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.phone" type="text" placeholder="Shop Phone" />
                                    <small class="text-red-500" v-if="errors['phone']">{{ errors['phone'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="shop_address">Shop Location</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.location" type="text" placeholder="Shop Phone" />
                                    <small class="text-red-500" v-if="errors['location']">{{ errors['location'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="street_address">Street Address</Label></td>
                                <td class="py-3">
                                    <input class="border px-3 py-2 rounded-md w-full" v-model="formData.address" type="text" placeholder="Street Address" />
                                    <small class="text-red-500" v-if="errors['address']">{{ errors['address'][0] }}</small>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="meta_title">Meta Title</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.meta_title" type="text" placeholder="Meta Title" /></td>
                            </tr>
                            <tr>
                                <td class="py-3" style="vertical-align: top;">
                                    <Label for="description">Meta Description</Label>
                                </td>
                                <td class="py-3"><Textarea v-model="formData.meta_desc" class="h-[331px] resize-none"></Textarea></td>
                            </tr>
                        </table>
                        <div class="flex-1">
                            <div class="flex justify-center items-center mt-24">
                                <div class="border rounded-lg bg-gray-200 w-[160px] h-[160px] relative overflow-hidden">
                                    <img :src="getUrl(formData.logo)" class="w-full h-full object-cover" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col border p-5 rounded-lg">
                <div class="pb-2">
                    <h1 class="text-2xl">Media Link</h1>
                </div>
                <hr>
                <div class="flex flex-col gap-8">
                    <div class="flex items-center">
                        <table class="w-full max-w-[600px]">
                            <tr>
                                <td class="py-3"><Label for="shop_name">Facebook</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.facebook" type="text" placeholder="Facebook" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="instagram">Instagram</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.intstagram" type="text" placeholder="Instagram" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="twitter">Twitter</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.twitter" type="text" placeholder="Twitter" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="google">Google</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.google" type="text" placeholder="Google" /></td>
                            </tr>
                            <tr>
                                <td class="py-3"><Label for="youtube">Youtube</Label></td>
                                <td class="py-3"><input class="border px-3 py-2 rounded-md w-full" v-model="formData.youtube" type="text" placeholder="Youtube" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex">
                <Button type="button" @click="submit" class="px-12">Save</Button>
            </div>
        </div>
    </div>
</template>