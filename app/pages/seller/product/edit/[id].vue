<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { getUrl } from '~/helper'
import { RadioTree } from '@shishir0019/radio-tree'
import type { IProduct } from '@/types/products';
import type { IpaginatedRespoinse } from '@/types/response';
import '@shishir0019/radio-tree/style.css'
const { toast } = useToast()

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
    title: 'Update Product - Mectrons Seller',
    meta: [
        { name: 'description', content: 'Mectrons' }
    ]
})

const router = useRouter()
const route = useRoute()
const secondSearchBar = reactive({
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: ''
})

const loading = ref(false)
const formData = ref<any>({
    image: [],
    video: [],
    removed: [],
    removedAttr: [],
    attributes: []
})
const isBn = ref(false)
const errors = ref<any>({})

const addAttribute = () => {
    formData.value.attributes.push({ key: '', value: '' })
}

const response = ref({
    title: '',
    description: "",
    tags: '',
    location: [''],
    price: 1000,
    currency_id: 4,
    stock_amount: '5',
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: '',

    category_id: '',
    condition_id: "dfsadf",
    negotiable: '1',
    age: '500',
    origin: 'dsfsa',
    typeId: 'fasds',
    bd: 'afs',
    type_id: 1,
    image: []
});

const chooseImageHandler = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/png, image/gif, image/jpeg, image/webp'
    input.onchange = (event: any) => {
        let files = event.target.files
        formData.value.image.push(...files)
    }
    input.click()
}
const chooseVideoHandler = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'video/*'
    input.onchange = (event) => {
        let files = event.target.files
        formData.value.video.push(...files)
    }
    input.click()
}

const removeFile = (index: number) => {
    let item = formData.value.image[index]
    if (item instanceof File) {
        formData.value.image.splice(index, 1)
    } else {
        formData.value.removed.push(item)
        formData.value.image.splice(index, 1)
    }
}
const removeVideoFile = (index: number) => {
    let item = formData.value.video[index]
    if (item instanceof File) {
        formData.value.video.splice(index, 1)
    } else {
        formData.value.removed.push(item)
        formData.value.video.splice(index, 1)
    }
}
const removeAtt = (index: number) => {
    let item = formData.value.attributes[index]
    if (item.id) {
        formData.value.removedAttr.push(item.id)
    }
    formData.value.attributes.splice(index, 1)
}

const submit = async () => {
    try {
        errors.value = {};
        loading.value = true;
        const token = useCookie('token');
        let body = new FormData()
        body.append('_method', 'PUT')

        Object.keys(formData.value).forEach(key => {
            if (key === 'image') {
                formData.value.image.forEach((file: any, index: any) => {
                    if (file instanceof File) {
                        body.append(`image[${index}]`, file);
                    }
                });
            } else if (key === 'video') {
                formData.value.video.forEach((file: any, index: any) => {
                    if (file instanceof File) {
                        body.append(`video[${index}]`, file);
                    }
                });
            } else if (key === 'attributes') {
                body.append(`attributes`, JSON.stringify(formData.value.attributes
                    .map((i: any) => {
                        let item: any = { name: i.key, value: i.value }
                        if (i.id) {
                            item.id = i.id
                            item.category_id = i.category_id
                            item.product_id = i.product_id
                        }
                        return item
                    })));
                // formData.value.attributes.forEach((attribute: any) => {
                //     // if(attribute.id){
                //     //     body.append(`attribute[${attribute.id}]`, attribute.value);
                //     // }else {
                //     //     body.append(attribute.key, attribute.value);
                //     // }
                // });
            } else {
                body.append(key, formData.value[key]);
            }
        });

        const response = await $fetch<any>(`${useRuntimeConfig().public.baseUrl}/product/${route.params.id}`,
            {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token.value}`,
                },
                body
            }
        );
        toast({
            title: "Success",
            description: response?.message,
        });
        router.push('/seller/product')
    } catch (error) {
        const err = error as any;
        errors.value = err.response._data.errors
    } finally {
        loading.value = false
    }
}

const getMake = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data`)
    secondSearchBar.make = data.value
}
getMake()
const getModel = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}`)
    secondSearchBar.model = data.value
}


const getYear = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}`)
    secondSearchBar.year = data.value


}
const getCC = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}`)
    secondSearchBar.cc = data.value
}
const getEngyne = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}&cc=${response.value.cc}`)
    secondSearchBar.engyne = data.value
}

const getParts = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}&cc=${response.value.cc}&engine=${response.value.engyne}`)
    secondSearchBar.parts = data.value
}

const categoryData = ref<any>('')

const getCetagories = async () => {
    const res = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`)
    categoryData.value = res.data.value
}

getCetagories()


const isDisabled = ref(true);

const preloader = ref(true);

const getProduct = async () => {
    preloader.value = true
    try {
        const token = useCookie('token')
        const response = await $fetch<{ product: IProduct, suggestion: IpaginatedRespoinse<IProduct> }>(`${useRuntimeConfig().public.baseUrl}/view-product/${route.params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        });
        console.log(response.product);
        formData.value = JSON.parse(JSON.stringify({
            category_id: response.product.category_id,
            title: response.product.title,
            brand: response.product.others.filter((i: any) => i.name === 'brand').name,
            price: response.product.price,
            stock_amount: response.product.stock_amount,
            description: response.product.description,
            // 'bn[description]': response.product
            // meta_title: response.product.meta_title,
            // meta_description: response.product.meta_description,

            image: response.product.picture,
            video: response.product.video,
            removed: [],
            removedAttr: [],
            attributes: response.product.others.filter((i: any) => i.name !== 'brand').map((i: any) => ({
                id: i.id,
                product_id: i.product_id,
                category_id: i.category_id,
                key: i.name,
                value: i.value
            }))
        }))
    } catch (error) {
        console.log('Somthing Wrong!');
    } finally {
        preloader.value = false
    }
}
onMounted(() => {
    getProduct()
})
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">Update Prouduct</h1>
        </div>
        <hr class="h-[2px] bg-slate-400 mt-4">
    </div>
    <div>
        <div v-if="!preloader" class="flex flex-col gap-8">
            <div class="my-3">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Product information</h1>
                </div>
                <div class="shadow-xl border p-4 mt-5">
                    <RadioTree v-model="formData.category_id" value="id" color="#f85606" label="name" name="category_id"
                        :list="categoryData.categories" />
                    <span v-if="Object.keys(errors).includes('category_id')" class="text-sm text-red-500">{{
                        errors.category_id[0] }}</span>
                </div>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Price Stock</h1>
                </div>
                <table class="flex-1">
                    <tr>
                        <td class="py-3"><Label for="productName">Product Name</Label></td>
                        <td class="py-3">
                            <Input type="text" v-model="formData.title" placeholder="Product Name" />
                            <span v-if="Object.keys(errors).includes('title')" class="text-sm text-red-500">{{
                                errors.title[0] }}</span>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td class="py-3"><Label for="productName">Brand Name</Label></td>
                        <td class="py-3">
                            <select disabled class="w-full p-2"v-model="formData.brand">
                                <option disabled>Choose brand</option>
                                <option v-for="(brand, index) in secondSearchBar.make" :value="brand.make">{{ brand.make }}</option>
                            </select>
                        </td>
                    </tr> -->
                    <tr>
                        <td class="py-3"><Label for="unitPrice">Unit Price</Label></td>
                        <td class="py-3">
                            <Input id="unitPrice" type="number" v-model="formData.price" placeholder="Unit Price" />
                            <span v-if="Object.keys(errors).includes('price')" class="text-sm text-red-500">{{
                                errors.price[0] }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-3"><Label for="unitPrice">Stock</Label></td>
                        <td class="py-3">
                            <Input id="unitPrice" type="number" :min="0" v-model="formData.stock_amount"
                                placeholder="Stock" />
                            <span v-if="Object.keys(errors).includes('stock_amount')" class="text-sm text-red-500">{{
                                errors.stock_amount[0] }}</span>
                        </td>
                    </tr>
                    <tr class="align-top">
                        <td class="py-3"><Label for="tags">Description</Label></td>
                        <td class="py-3">
                            <div class="relative notranslate">
                                <div class="p-1 bg-primary/40 flex items-center absolute top-0 right-0 rounded-bl-lg">
                                    <button class="text-primary hover:bg-primary hover:text-white text-sm w-12"
                                        :class="{ 'bg-primary text-white': !isBn }" @click="isBn = false">EN</button>
                                    <button class="text-primary hover:bg-primary hover:text-white text-sm w-12"
                                        :class="{ 'bg-primary text-white': isBn }" @click="isBn = true">BN</button>
                                </div>
                                <div>
                                    <Textarea placeholder="Description BN" v-if="isBn"
                                        v-model="formData['bn[description]']" rows="8"></Textarea>
                                    <Textarea placeholder="Description EN" v-else v-model="formData.description"
                                        rows="8"></Textarea>
                                    <span v-if="Object.keys(errors).includes('description')"
                                        class="text-sm text-red-500">{{
                                            errors.description[0] }}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">File & Media</h1>
                </div>
                <div class="flex flex-col gap-3">
                    <div>Images</div>
                    <div class="border rounded-lg flex flex-wrap gap-3 p-5 items-center min-h-[132px]">
                        <template class="w-full h-full" v-for="(file, index) in formData.image" :key="index">
                            <div class="w-20 h-20 relative border">
                                <img :src="getUrl(file)" class="min-w-full min-h-full object-cover"></img>
                                <button @click="removeFile(index)"
                                    class="w-4 h-4 absolute flex items-center justify-center -top-2 -right-2 bg-red-500 rounded-full p-[2px] text-white">
                                    <Icon name="material-symbols:close" />
                                </button>
                            </div>
                        </template>
                        <Icon name="fluent:add-circle-16-filled" @click="chooseImageHandler"
                            class="text-6xl text-gray-700 cursor-pointer hover:text-gray-900"></Icon>
                    </div>
                    <span v-if="Object.keys(errors).includes('image')" class="text-sm text-red-500">{{ errors.image[0]
                        }}</span>
                </div>
                <div class="flex flex-col gap-3">
                    <div>Videos</div>
                    <div class="border rounded-lg flex flex-wrap gap-3 p-5 items-center min-h-[132px]">
                        <template class="w-full h-full" v-for="(file, index) in formData.video" :key="index">
                            <div class="w-20 h-20 relative border">
                                <video :src="getUrl(file)" class="min-w-full min-h-full object-cover"></video>
                                <button @click="removeVideoFile(index)"
                                    class="w-4 h-4 absolute flex items-center justify-center -top-2 -right-2 bg-red-500 rounded-full p-[2px] text-white">
                                    <Icon name="material-symbols:close" />
                                </button>
                            </div>
                        </template>
                        <Icon name="fluent:add-circle-16-filled" @click="chooseVideoHandler"
                            class="text-6xl text-gray-700 cursor-pointer hover:text-gray-900"></Icon>
                    </div>
                    <span v-if="Object.keys(errors).includes('image')" class="text-sm text-red-500">{{ errors.image[0]
                        }}</span>
                </div>
            </div>

            <!-- <div v-if="isDisabled" class="max-w-[600px] w-full">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Others</h1>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4 my-5">
                    <select class="h-[35px] border rounded-lg" @change="getModel" v-model="response.make">
                        <option value="" disabled selected>Select Model </option>
                        <option v-for="i in secondSearchBar.make">{{ i.make }}</option>
                    </select>
                    <select @change="getYear" :disabled="!response.make" class="h-[35px] border rounded-lg"
                        v-model="response.model">
                        <option value="" disabled selected>Select Model </option>
                        <option v-for="i in secondSearchBar.model">{{ i.models }}</option>
                    </select>
                    <select @change="getCC" :disabled="!secondSearchBar.year" class="h-[35px] border rounded-lg"
                        v-model="response.year">
                        <option value="" disabled selected>Select Year</option>
                        <option v-for="i in secondSearchBar.year">{{ i.year }}</option>
                    </select>
                    <select @change="getEngyne" :disabled="!secondSearchBar.cc" class="h-[35px] border rounded-lg"
                        v-model="response.cc">
                        <option value="" disabled selected>Select CC</option>
                        <option v-for="i in secondSearchBar.cc">{{ i.cc }}</option>
                    </select>
                    <select @change="getParts" :disabled="!secondSearchBar.engyne" class="h-[35px] border rounded-lg"
                        v-model="response.engyne">
                        <option value="" disabled selected>Select Engine</option>
                        <option v-for="i in secondSearchBar.engyne">{{ i.engine }}</option>
                    </select>

                    <select :disabled="!secondSearchBar.parts" class="h-[35px] border rounded-lg"
                        v-model="formData.parts">
                        <option value="" disabled selected>Select Parts</option>
                        <option v-for="i in categoryData.categories">{{ i.name }}</option>
                    </select>
                </div>
            </div> -->
            <div class="max-w-[600px] w-full">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Attributes</h1>
                </div>
                <div>
                    <table class="table">
                        <tr v-if="formData.attributes.length">
                            <td class="p-1">#</td>
                            <td class="p-1">Key</td>
                            <td class="p-1">Value</td>
                            <td class="p-1"></td>
                        </tr>
                        <tr v-for="(attribute, index) in formData.attributes" :key="`attribute-${index}`">
                            <td>{{ index + 1 }}</td>
                            <td><input class="border w-full p-1" placeholder="Key" v-model="attribute['key']"
                                    type="text"></td>
                            <td><input class="border w-full p-1" placeholder="Value" v-model="attribute['value']"
                                    type="text"></td>
                            <td>
                                <button @click="removeAtt(index)">
                                    <icon class="text-gray-500 hover:text-red-500 text-2xl" name="lets-icons:dell" />
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <button @click="addAttribute"
                    class="mt-3 border border-primary text-primary hover:text-orange-500 text-sm px-2 py-1 rounded-full">
                    <icon class="text-xl" name="ic:baseline-plus" />
                    Add Attribute
                </button>
            </div>

            <div class="w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">SEO</h1>
                </div>
                <table class="w-full">
                    <tr>
                        <td class="py-3"><Label for="seoTitle">Media Title</Label></td>
                        <td class="py-3"><Input id="seoTitle" type="text" v-model="formData.meta_title"
                                placeholder="Media Title" />
                        </td>
                    </tr>
                    <tr class="align-top">
                        <td class="py-3"><Label>Description</Label></td>
                        <td class="py-3"><Textarea placeholder="Meta Description" v-model="formData.meta_description"
                                rows="8"></Textarea>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="w-full max-w-[600px]">
                <hr class="my-5 w-full max-w-[600px] border-dashed border-b-2">
                <div class="flex justify-end">
                    <div class="w-[200px]">
                        <ButtonPrimary type="button" :disabled="loading" @click="submit">
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
                                <span>Save & Publish</span>
                            </div>
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
