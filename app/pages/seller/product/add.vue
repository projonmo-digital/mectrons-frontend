<script setup>
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { getUrl } from '~/helper'
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
const formData = ref({})
const isBn = ref(false)
const errors = ref({})
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

const chooseImageHandler = () => {
    console.log('c');
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/png, image/gif, image/jpeg'
    input.onchange = (event) => {
        let files = event.target.files
        response.value.image.push(...files)
    }
    input.click()
}

const removeFile = (index) => {
    response.value.image.splice(index, 1)
}

const setProducts = async () => {
    errors.value = {}
    const token = useCookie('token');
    const body = new FormData();

    Object.keys(response.value).forEach(key => {
        if (key === 'image') {
            response.value.image.forEach((file, index) => {
                body.append(`image[${index}]`, file);
            });
        } else {
            body.append(key, response.value[key]);
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
        loading.value = pending
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
            response.value = proxyResponse.value
            categoryId.childrenCategoryId = ''
            categoryId.parentCategoryId = ''
            categoryId.grandparentCategoryId = ''
            router.go('/seller/product')
        }
    } catch (error) {
        console.log(error);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    setProducts();
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
        <div>
            <div class="my-3">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Product information</h1>
                </div>
                <div class="shadow-xl border p-4">
                    <h1 class="text-primary text-xl font-bold">Product Category</h1>
                    <div class="flex p-5">
                        <div class="flex-1 flex flex-col gap-2">
                            <div class="flex gap-2 items-center text-xl">
                                <Icon name="fluent:box-16-regular"></Icon>
                                <p>Product</p>
                                <RadioGroup v-model="productOrService">
                                    <RadioGroupItem value="product"></RadioGroupItem>
                                </RadioGroup>
                            </div>
                            <RadioGroup
                                :class="!isDisabled ? 'bg-slate-red-500  opacity-50  cursor-not-allowed' : 'flex flex-col gap-y-2'"
                                v-model="categoryId.grandparentCategoryId" class="flex flex-col gap-y-2">
                                <div class="flex flex-col " v-for="i in categoryData.categories" :key="i.id">
                                    <div v-if="!i.name.includes('Service')">
                                        <div class="flex gap-2 items-center">
                                            <RadioGroupItem :disabled="!isDisabled" :id="i.id" :value="i.id" />
                                            <Label :for="i.id">{{ i.name }}</Label>
                                        </div>
                                        <RadioGroup v-if="categoryId.grandparentCategoryId === i.id"
                                            class="flex flex-col gap-2 border-l pl-2 border-primary ml-4 justify-start"
                                            v-model="categoryId.parentCategoryId">
                                            <div class="flex flex-col gap-2  " v-for="j in i.children" :key="j.id">
                                                <div class="flex  items-center">
                                                    <RadioGroupItem :id="j.id" :value="j.id" />
                                                    <Label :for="j.id">{{ j.name }}</Label>
                                                </div>
                                                <RadioGroup
                                                    class="flex flex-col gap-2 border-l pl-2 border-primary ml-4 justify-start"
                                                    v-if="categoryId.parentCategoryId === j.id"
                                                    v-model="response.category_id">
                                                    <div class="flex justify-start  flex-col" v-for="k in j.children"
                                                        :key="k.id">
                                                        <div class="flex gap-2 ">
                                                            <RadioGroupItem :id="k.id" :value="k.id" />
                                                            <Label :for="k.id">{{ k.name }}</Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                        <div class="flex-1 flex flex-col gap-2">
                            <div class="flex gap-2 items-center text-xl">
                                <Icon name="fluent:key-20-regular"></Icon>
                                <p>Services</p>
                                <RadioGroup v-model="productOrService">
                                    <RadioGroupItem value="service"></RadioGroupItem>
                                </RadioGroup>
                            </div>

                            <RadioGroup
                                :class="isDisabled ? 'bg-slate-red-500  opacity-50  cursor-not-allowed' : 'flex flex-col gap-y-2'"
                                v-model="categoryId.grandparentCategoryId" class="flex flex-col gap-y-2">
                                <div class="flex flex-col " v-for="i in categoryData.categories" :key="i.id">
                                    <div v-if="i.name.includes('Service')">
                                        <div class="flex gap-2 items-center">
                                            <RadioGroupItem :disabled="isDisabled" :id="i.id" :value="i.id" />
                                            <Label :for="i.id">{{ i.name }}</Label>
                                        </div>
                                        <RadioGroup v-if="categoryId.grandparentCategoryId === i.id"
                                            class="flex flex-col gap-2 border-l pl-2 border-primary ml-4 justify-start"
                                            v-model="categoryId.parentCategoryId">
                                            <div class="flex flex-col gap-2  " v-for="j in i.children" :key="j.id">
                                                <div class="flex  items-center">
                                                    <RadioGroupItem :id="j.id" :value="j.id" />
                                                    <Label :for="j.id">{{ j.name }}</Label>
                                                </div>
                                                <RadioGroup
                                                    class="flex flex-col gap-2 border-l pl-2 border-primary ml-4 justify-start"
                                                    v-model="response.category_id"
                                                    v-if="categoryId.parentCategoryId === j.id">
                                                    <div class="flex justify-start  flex-col" v-for="k in j.children"
                                                        :key="k.id">
                                                        <div class="flex gap-2 ">
                                                            <RadioGroupItem :id="k.id" :value="k.id" />
                                                            <Label :for="k.id">{{ k.name }}</Label>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex gap-5 items-start">
                <table class="flex-1">
                    <tr>
                        <td class="py-3"><Label for="productName">Product Name</Label></td>
                        <td class="py-3">
                            <Input type="text" v-model="response.title" placeholder="Product Name" />
                            <span v-if="Object.keys(errors).includes('title')" class="text-sm text-red-500">{{
                                errors.title[0] }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="py-3"><Label for="productName">Brand Name</Label></td>
                        <td class="py-3"><Input id="brandName" type="text" v-model="response.brand"
                                placeholder="Brand" /></td>
                    </tr>
                    <tr class=" align-top">
                        <td class="py-3"><Label for="tags">Description</Label></td>
                        <td class="py-3">
                            <div class="relative">
                                <div class="p-1 bg-primary/40 flex items-center absolute top-0 right-0 rounded-bl-lg">
                                    <button class="text-primary hover:bg-primary hover:text-white text-sm w-12" :class="{ 'bg-primary text-white': !isBn }" @click="isBn = false">en</button>
                                    <button class="text-primary hover:bg-primary hover:text-white text-sm w-12" :class="{ 'bg-primary text-white': isBn }" @click="isBn = true">bn</button>
                                </div>
                                <div>
                                    <Textarea id="description" v-if="isBn" v-model="response['bn[description]']" rows="8"></Textarea>
                                    <Textarea id="description" v-else v-model="response.description" rows="8"></Textarea>
                                    <span v-if="Object.keys(errors).includes('description')" class="text-sm text-red-500">{{
                                errors.description[0] }}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="flex-1">
                    <tr>
                        <td class="py-3"><Label for="stock">Stock</Label></td>
                        <td class="py-3"><Input id="stock" type="text" v-model="response.stock_amount"
                                placeholder="Stock" /></td>
                    </tr>
                    <tr>
                        <td class="py-3"><Label for="tags">Tags</Label></td>
                        <td class="py-3"><Input id="tags" type="text" v-model="response.tags" placeholder="Tags" /></td>
                    </tr>
                </table>
            </div>

            <div v-if="isDisabled" class="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-[600px] w-full my-5">
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

                <select :disabled="!secondSearchBar.parts" class="h-[35px] border rounded-lg" v-model="response.parts">
                    <option value="" disabled selected>Select Parts</option>
                    <option v-for="i in categoryData.categories">{{ i.name }}</option>
                </select>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">File & Media</h1>
                </div>
                <div class="flex flex-col gap-3">
                    <!-- <table class="w-fflex flex-col gap-3ull">
                        <tr>
                            <td class="py-3"><Label for="stock">Picture</Label></td>
                            <td class="py-3"><Input id="picture" type="file" multiple @change="handleFileChange" /></td>
                        </tr>
                    </table> -->
                    <div class="border rounded-lg flex gap-x-3 p-5 items-center h-[132px]">
                        <template class="w-full h-full" v-for="(file, index) in response.image" :key="index">
                            <div class="w-20 h-20 relative">
                                <img :src="getUrl(file)" class="min-w-full min-h-full object-cover"></img>
                                <button @click="removeFile(index)" class="w-4 h-4 absolute flex items-center justify-center -top-2 -right-2 bg-red-500 rounded-full p-[2px] text-white" v-if="typeof file !== 'string'">
                                    <Icon name="material-symbols:close" />            
                                </button>
                            </div>
                        </template>
                        <Icon name="fluent:add-circle-16-filled" @click="chooseImageHandler" class="text-6xl text-gray-700 cursor-pointer hover:text-gray-900"></Icon>
                    </div>
                    <span v-if="Object.keys(errors).includes('image')" class="text-sm text-red-500">{{ errors.image[0]
                        }}</span>
                </div>
                <div class="flex gap-8">
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
                </div>
            </div>

            <div class="w-full max-w-[600px] my-5">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Price Stock</h1>
                </div>
                <div>
                    <table class="w-full">
                        <tr>
                            <td class="py-3"><Label for="unitPrice">Unit Price</Label></td>
                            <td class="py-3"><Input id="unitPrice" type="number" v-model="response.price"
                                    placeholder="0" /></td>
                        </tr>
                        <tr>
                            <td class="py-3"><Label for="currencyId">Currency</Label></td>
                            <td class="py-3"><Input id="currencyId" type="text" v-model="response.currency_Id"
                                    placeholder="Currency" /></td>
                        </tr>
                        <tr>
                            <td class="py-3"><Label for="conditionId">Condition</Label></td>
                            <td class="py-3"><Input id="conditionId" type="text" v-model="response.condition_id"
                                    placeholder="Condition" /></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">Shipping Configuration</h1>
                </div>
                <div class="grid grid-cols-2 gap-16">
                    <table class="w-full">
                        <tr>
                            <td class="py-3"><Label for="cashOnDelivery">Cash on Delivery</Label></td>
                            <td class="py-3">
                                <Switch id="cashOnDelivery" v-model="response.negotiable" />
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3"><Label for="flashRate">Flash Rate</Label></td>
                            <td class="py-3">
                                <Switch id="flashRate" v-model="response.extra_field_1" />
                            </td>
                        </tr>
                    </table>
                    <table class="w-full">
                        <tr>
                            <td class="py-3"><Label for="freeShipping">Free Shipping</Label></td>
                            <td class="py-3">
                                <Switch id="freeShipping" v-model="response.extra_field_2" />
                            </td>
                        </tr>
                        <tr>
                            <td class="py-3"><Label for="isProductQuantityMultiply">Is Product Quantity Multiply</Label>
                            </td>
                            <td class="py-3">
                                <Switch id="isProductQuantityMultiply" v-model="response.bd" />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="w-full max-w-[600px]">
                <div class="py-3 border-b-2 border-dashed">
                    <h1 class="text-primary text-xl font-bold">SEO</h1>
                </div>
                <table class="w-full">
                    <tr>
                        <td class="py-3"><Label for="seoTitle">Media Title</Label></td>
                        <td class="py-3"><Input id="seoTitle" type="text" v-model="response.meta_title"
                                placeholder="Media Title" />
                        </td>
                    </tr>
                    <tr class="align-top">
                        <td class="py-3"><Label for="seoDescription" class="">Description</Label></td>
                        <td class="py-3"><Textarea id="seoDescription" v-model="response.meta_description"
                                rows="8"></Textarea>
                        </td>
                    </tr>
                </table>
            </div>
            <hr class="my-5 w-full max-w-[600px] border-dashed border-b-2">
            <div class="flex justify-end w-full max-w-[600px]">
                <div class="flex gap-4">
                    <Button :disable="loading" type="submit" @click="handleSubmit">Save & Publish</Button>
                </div>
            </div>
        </div>
    </div>
</template>
