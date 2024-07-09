<script setup>
import { ref } from 'vue';
import { toast } from '~/components/ui/toast';
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

    image: [],

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

    image: [],

});


const setProducts = async () => {
    const token = useTokenStore();
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
        const { data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/product`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.getToken}`,
            },
            body
        });

        // Handle th e response
        toast({ description: 'Product Successfully Added', variant: 'default' })
        response.value = proxyResponse.value
        categoryId.childrenCategoryId = ''
        categoryId.parentCategoryId = ''
        categoryId.grandparentCategoryId = ''
    } catch (error) {

        toast({ description: 'Something went wrong', variant: 'destructive' })
    }
};

const handleFileChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        response.value.image.push(files[i]);
        console.log(files[i])
    }
};

const handleSubmit = (e) => {
    // const form = document.getElementById('myForm');
    // const resetButton = document.getElementById('resetButton');

    // resetButton.addEventListener('click', function() {
    //     form.reset();
    // });
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
    <form @submit="handleSubmit" id="myForm">



        <div class="p-8 flex flex-col gap-8">
            <HeaderWithHr header="Add New Prouduct"></HeaderWithHr>

            <div class="productCategory">
                <HeaderWithDot header="Add Information"></HeaderWithDot>
                <div class="shadow-xl border p-4">
                    <HeaderWithDot header="Product Category" area="w-[40%]"></HeaderWithDot>
                    <div class="flex w-full justify-around">
                        <div class="flex flex-col gap-2">
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
                        <div class="flex flex-col gap-2">
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

            <div class="inputs">
                <div class="grid grid-cols-2 gap-4">
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="productName">Product Name</Label>
                        <Input id="productName" type="text" v-model="response.title" placeholder="Product Name" />
                    </div>
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="stock">Stock</Label>
                        <Input id="stock" type="text" v-model="response.stock_amount" placeholder="Stock" />
                    </div>
                    <div class="w-full max-w-sm flex text-nowrap items-center gap-2">
                        <Label for="brandName">Brand Name</Label>
                        <Input id="brandName" type="text" v-model="response.brand" placeholder="Brand" />
                    </div>
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="tags">Tags</Label>
                        <Input id="tags" type="text" v-model="response.tags" placeholder="Tags" />
                    </div>
                    <div>
                        <Label for="description">Description</Label>
                        <Textarea id="description" v-model="response.description"
                            class="h-[331px] resize-none"></Textarea>
                    </div>
                </div>
            </div>
            <div v-if="isDisabled"
                class="  lg:h-[71px] mt-4   w-full place-content-center   grid grid-cols-2 md:grid-cols-2 p-4 gap-4  rounded-2xl ">

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


            <div id="fileMedia" class="w-full flex flex-col gap-4">
                <HeaderWithDot header="File & Media"></HeaderWithDot>
                <div class="w-full">
                    <div id="filemedia" class="flex text-nowrap w-full gap-1.5">
                        <div class="flex w-full flex-col gap-4">
                            <div class="flex items-center gap-4">
                                <Label for="picture">Picture</Label>
                                <Input id="picture" type="file" multiple @change="handleFileChange" />
                            </div>
                            <div class="border h-[131px] rounded flex gap-x-8 p-4">
                                <template class="w-full h-full" v-for="(file, index) in response.image" :key="index">
                                    <img :src="file.File" class="w-10 h-10"></img>
                                </template>
                                <Icon name="fluent:add-circle-16-filled" class="text-8xl"></Icon>
                            </div>
                        </div>
                    </div>
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

            <div class="w-full flex flex-col gap-4">
                <HeaderWithDot header="Price Stock"></HeaderWithDot>
                <div class="flex flex-col gap-8">
                    <div class="flex text-nowrap w-full items-center gap-1.5">
                        <Label for="unitPrice">Unit Price</Label>
                        <Input id="unitPrice" type="number" v-model="response.price" placeholder="0" />
                    </div>
                    <div class="flex gap-8">
                        <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                            <Label for="currencyId">Currency</Label>
                            <Input id="currencyId" type="text" v-model="response.currency_Id" placeholder="Currency" />
                        </div>
                        <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                            <Label for="conditionId">Condition</Label>
                            <Input id="conditionId" type="text" v-model="response.condition_id"
                                placeholder="Condition" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col gap-4">
                <HeaderWithDot header="Shipping Configuration"></HeaderWithDot>
                <div class="grid grid-cols-2 gap-16">
                    <div class="flex items-center space-x-2 w-full justify-between">
                        <Label for="cashOnDelivery">Cash on Delivery</Label>
                        <Switch id="cashOnDelivery" v-model="response.negotiable" />
                    </div>
                    <div class="flex items-center space-x-2 w-full justify-between">
                        <Label for="flashRate">Flash Rate</Label>
                        <Switch id="flashRate" v-model="response.extra_field_1" />
                    </div>
                    <div class="flex items-center space-x-2 w-full justify-between">
                        <Label for="freeShipping">Free Shipping</Label>
                        <Switch id="freeShipping" v-model="response.extra_field_2" />
                    </div>
                    <div class="flex items-center space-x-2 w-full justify-between">
                        <Label for="isProductQuantityMultiply">Is Product Quantity Multiply</Label>
                        <Switch id="isProductQuantityMultiply" v-model="response.bd" />
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col gap-4">
                <HeaderWithDot header="SEO"></HeaderWithDot>
                <div class="flex text-nowrap w-full items-center gap-1.5">
                    <Label for="seoTitle">Media Title</Label>
                    <Input id="seoTitle" type="text" v-model="response.title" placeholder="Media Title" />
                </div>
                <div>
                    <Label for="seoDescription" class="">Description</Label>
                    <Textarea id="seoDescription" v-model="response.description"
                        class="h-[331px] resize-none"></Textarea>
                </div>
            </div>

            <div class="flex justify-end">
                <div class="flex gap-4">
                    <Button type="button" class="bg-gray-300 text-black">Save & Unpublish</Button>
                    <Button type="submit">Save & Publish</Button>
                </div>
            </div>
        </div>
    </form>
</template>
