<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./columns"
import NullTable from '~/components/NullTable.vue';




const data = ref<any[]>([])

async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    return [
        {
            "name": "Apollo wheel Tyre",
            "info": {
                "numOfSale": 0,
                "rating": 0,
                "basePrice": 72.10
            },
            "stock": 50,
            "todaysDeal": false,
            "published": true
        },
        {
            "name": "Apollo wheel Tyre",
            "info": {
                "numOfSale": 0,
                "rating": 0,
                "basePrice": 72.10
            },
            "stock": 50,
            "todaysDeal": false,
            "published": true
        },
        {
            "name": "Apollo wheel Tyre",
            "info": {
                "numOfSale": 0,
                "rating": 0,
                "basePrice": 72.10
            },
            "stock": 50,
            "todaysDeal": false,
            "published": true
        },
        {
            "name": "Apollo wheel Tyre",
            "info": {
                "numOfSale": 0,
                "rating": 0,
                "basePrice": 72.10
            },
            "stock": 50,
            "todaysDeal": false,
            "published": true
        },
        {
            "name": "Apollo wheel Tyre",
            "info": {
                "numOfSale": 0,
                "rating": 0,
                "basePrice": 72.10
            },
            "stock": 50,
            "todaysDeal": false,
            "published": true
        }
    ]



}

onMounted(async () => {
    data.value = await getData();

});
</script>

<template>
    <div class="lg:p-8 w-full">
        <div class=" flex justify-between">
            <h1 class="text-2xl font-bold ">Payment History</h1>
            <Button class=" ">
                <Icon name="mdi:plus-circle" </Icon>
                    <div>Add product</div>
            </Button>
        </div>
        <Separator class="my-4"></Separator>
        <div class="container py-10 mx-auto w-full flex justify-center">

            <NullTable :columns="columns" class="w-full" :data="data" />

        </div>


    </div>
</template>