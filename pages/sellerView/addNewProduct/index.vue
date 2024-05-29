<script setup>
import { ref } from 'vue';

const response = ref({
    title: 'ffssd',
    description: "dssdfdf",
    tags: 'dflksdjf',
    location: ['Addldfd'],
    price: 1000,
    currency_id: 4,
    stock_amount: '5',
    category_id: "automobiles_tools",
    condition_id: "dfsadf",
    negotiable: '1',
    age: '500',
    origin: 'dsfsa',
    typeId: 'fasds',
    bd: 'afs',
    extra_field_1: 'fsd',
    type_id: 1,
    extra_field_2: 'asf',
    image: []
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
        // Handle the response

    } catch (error) {
        console.log(error);
    }
};

const handleFileChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        response.value.image.push(files[i]);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    setProducts();
};
</script>


<template>
    <form @submit="handleSubmit">
        {{ response }}
        <div class="p-8 flex flex-col gap-8">
            <HeaderWithHr header="Add New Product"></HeaderWithHr>

            <div class="productCategory">
                <HeaderWithDot header="Add Information"></HeaderWithDot>
                <div class="shadow-2xl border p-4">
                    <HeaderWithDot header="Product Category" area="w-[40%]"></HeaderWithDot>
                    <div class="flex w-full justify-around">
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-2 items-center text-xl">
                                <Icon name="fluent:box-16-regular"></Icon>
                                <p>Product</p>
                            </div>
                            <RadioGroup v-model="response.category_id">
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="autoMobiles_tools" value="automobiles_tools" />
                                    <Label for="autoMobiles_tools">Automobiles Tools</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="equipment" value="equipment" />
                                    <Label for="equipment">Equipment</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="electronics" value="electronics" />
                                    <Label for="electronics">Electronics</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex gap-2 items-center text-xl">
                                <Icon name="fluent:key-20-regular"></Icon>
                                <p>Services</p>
                            </div>
                            <RadioGroup v-model="response.typeId">
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="engyne" value="engyne" />
                                    <Label for="engyne">Engyne</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="lpg" value="lpg" />
                                    <Label for="lpg">Lpg</Label>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <RadioGroupItem id="airCondition" value="airCondition" />
                                    <Label for="airCondition">Air Condition</Label>
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
                        <Select v-model="response.origin">
                            <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Brands</SelectLabel>
                                    <SelectItem value="apple">Apple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
                                <template v-for="(file, index) in response.image" :key="index">
                                    <Icon name="fluent:image-16-filled" class="text-8xl"></Icon>
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
