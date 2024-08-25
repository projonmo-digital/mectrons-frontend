<script setup>
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { getUrl } from '~/helper'
import { RadioTree } from '@shishir0019/radio-tree'
import '@shishir0019/radio-tree/style.css'
const { toast } = useToast()

definePageMeta({
    middleware: ["auth", "seller"]
})

useHead({
    title: 'Add Product - Mectrons Seller',
    meta: [
        { name: 'description', content: 'Mectrons' }
    ]
})

const router = useRouter()
const secondSearchBar = reactive({
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: ''
})

const categoryId = reactive({
    grandparentCategoryId: '',
    parentCategoryId: '',
    childrenCategoryId: ''
})

const categoryIdProxy = reactive({
    grandparentCategoryId: '',
    parentCategoryId: '',
    childrenCategoryId: ''

})

const loading = ref(false)
const formData = ref({
    image: [],
    attributes: []
})
const isBn = ref(false)
const errors = ref({})

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
    location: ['sdklf'],
    type_id: 1,
    image: []
});

const proxyResponse = ref({
    title: '',
    description: "",
    // tags: '',
    // location: [''],
    price: 1000,
    currency_id: 12,
    stock_amount: '5',
    model: '',
    make: '',
    year: '',
    cc: '',
    engyne: '',
    parts: '',

    category_id: '',
    // condition_id: "dfsadf",
    // negotiable: '1',
    // age: '500',
    // origin: 'dsfsa',
    // typeId: 'fasds',
    bd: 'afs',
    location: ['sdklf'],
    type_id: 1,
    image: []
});

const chooseImageHandler = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/png, image/gif, image/jpeg, image/webp'
    input.onchange = (event) => {
        let files = event.target.files
        formData.value.image.push(...files)
    }
    input.click()
}

const removeFile = (index) => {
    formData.value.image.splice(index, 1)
}

const handleSubmit = async (e) => {
    errors.value = {}
    const token = useCookie('token');
    const body = new FormData();
    loading.value = true

    Object.keys(formData.value).forEach(key => {
        if (key === 'image') {
            formData.value.image.forEach((file, index) => {
                body.append(`image[${index}]`, file);
            });
        }else if(key === 'attributes') {
            formData.value.attributes.forEach((attribute, index) => {
                body.append(attribute.key, attribute.value);
            });
        }else {
            body.append(key, formData.value[key]);
        }
    });

    try {
        const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/product`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.value}`,
            },
            body
        });
        errors.value = error.value.data.errors    
        if (error) {
            errors.value = error.value.data.errors
            toast({
                class: 'bg-red-500',
                title: 'Error',
                description: error.value.data.message
            });
        }
        if (data.value) {
            toast({
                class: 'bg-green-500',
                title: 'Success',
                description: data.value.message
            });
            router.go('/seller/product')
        }
    } catch (error) {

    } finally {
        loading.value = false
    }
};


const getMake = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data`)
    secondSearchBar.make = data.value
    console.log(secondSearchBar)

}
getMake()
const getModel = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}`)
    secondSearchBar.model = data.value
    console.log(secondSearchBar.model)
}


const getYear = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}`)
    secondSearchBar.year = data.value


}
const getCC = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}`)
    secondSearchBar.cc = data.value
    console.log(data.value)
}
const getEngyne = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}&cc=${response.value.cc}`)
    secondSearchBar.engyne = data.value
}

const getParts = async () => {
    const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${response.value.make}&models=${response.value.model}&year=${response.value.year}&cc=${response.value.cc}&engine=${response.value.engyne}`)
    secondSearchBar.parts = data.value
}

const service = ref('')
const category = ref('')
const categoryData = ref('')

const getCetagories = async () => {
    const res = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`)
    categoryData.value = res.data.value
}

getCetagories()
const formRester = ref('')

const isDisabled = ref(true);

const toggleDisabled = () => {
    isDisabled.value = !isDisabled.value;
};

const productOrService = ref('product');

watch(productOrService, () => {
    if (productOrService.value === 'product') {
        isDisabled.value = true

    } else {
        isDisabled.value = false
    }
})
</script>

<template>
    <HeaderWithHr header="Add New Prouduct"></HeaderWithHr>
    <div>
        <div class="flex flex-col gap-8">
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
                    <tr>
                        <td class="py-3"><Label for="productName">Brand Name</Label></td>
                        <td class="py-3"><Input id="brandName" type="text" v-model="formData.brand"
                                placeholder="Brand" /></td>
                    </tr>
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
                                    <Textarea placeholder="Description BN" v-if="isBn" v-model="formData['bn[description]']"
                                        rows="8"></Textarea>
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
                    <div class="border rounded-lg flex flex-wrap gap-3 p-5 items-center min-h-[132px]">
                        <template class="w-full h-full" v-for="(file, index) in formData.image" :key="index">
                            <div class="w-20 h-20 relative border">
                                <img :src="getUrl(file)" class="min-w-full min-h-full object-cover"></img>
                                <button @click="removeFile(index)"
                                    class="w-4 h-4 absolute flex items-center justify-center -top-2 -right-2 bg-red-500 rounded-full p-[2px] text-white"
                                    v-if="typeof file !== 'string'">
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
                <!-- <div class="flex gap-8">
                    <div class="w-full max-w-sm flex text-nowrap items-center gap-2">
                        <Label for="videoProvider">Video Provider</Label>
                        <Select v-model="response.extra_field_1">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Providers</SelectLabel>
                                    <SelectItem value="youtube">YouTube</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="videoLinks">Video Links</Label>
                        <Input id="videoLinks" type="text" v-model="response.extra_field_2" placeholder="Video Links" />
                    </div>
                </div> -->
            </div>

            <div v-if="isDisabled" class="max-w-[600px] w-full">
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
            </div>
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
                            <td>{{ index+1 }}</td>
                            <td><input class="border w-full p-1" placeholder="Key" v-model="attribute['key']" type="text"></td>
                            <td><input class="border w-full p-1" placeholder="Value" v-model="attribute['value']" type="text"></td>
                            <td>
                                <button @click="formData.attributes.splice(index, 1)">
                                    <icon class="text-gray-500 hover:text-red-500 text-2xl" name="lets-icons:dell"/>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <button @click="addAttribute" class="mt-3 border border-primary text-primary hover:text-orange-500 text-sm px-2 py-1 rounded-full">
                    <icon class="text-xl" name="ic:baseline-plus"/>
                    Add Attribute</button>
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
                        <ButtonPrimary type="button" :disabled="loading" @click="handleSubmit">
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
