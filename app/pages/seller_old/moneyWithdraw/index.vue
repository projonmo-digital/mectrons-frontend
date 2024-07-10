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
            <h1 class="text-2xl font-bold ">Money Withdraw</h1>
            <Button class=" ">
                <Icon name="mdi:plus-circle" </Icon>
                    <div>Add new product</div>
            </Button>
        </div>
        <Separator class="my-4 ">


        </Separator>
        <div class="w-full flex gap-4">
            <div
                class="h-[137px] rounded-xl text-white flex-col  w-[50%] border shadow-lg bg-gradient-to-r flex justify-center items-center from-[#E67418] to-[#49301C] ">
                <h1 class="font-bold text-2xl text-white">$459.00</h1>
                <p>Pending Balance</p>

            </div>
            <Dialog class="w-[50%]">
                <DialogTrigger class="w-full">
                    <div class="h-[137px] rounded-xl  border shadow-lg flex flex-col justify-center items-center">


                        <div
                            class="w-[70px] h-[70px] bg-primary  rounded-full flex justify-center items-center text-4xl text-white">
                            <Icon name="entypo:paper-plane" class=" font-bold"></Icon>
                        </div>

                        <p class=" font-bold">Send Withdraw Request</p>

                    </div>
                </DialogTrigger>
                <DialogContent class="bg-white">\
                    <HeaderWithHr header="Send Request"></HeaderWithHr>


                </DialogContent>
            </Dialog>

        </div>

        <div class="">

        </div>
        <div class="container  py-10 mx-auto w-full flex flex-col justify-center">
            <div class="p-4 ">
                <p class=" text-2xl font-bold">Withdraw History</p>

            </div>

            <NullTable :columns="columns" class="w-full" :data="data" />

        </div>


    </div>
</template>
