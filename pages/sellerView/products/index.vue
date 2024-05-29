<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./columns"
import NullTable from '~/components/NullTable.vue';



const data = ref<any[]>([])

async function getData(): Promise<any[]> {
    // Fetch data from your API here.
    return [

        {
            "Order": "006589",
            "Number_of_Products": 50,
            "Customer": "Faruk Hossain",
            "Seller": "Faruk Hossain",
            "Amount": "$450",
            "Payment_Method": "Cash",
            "Payment_Status": "Paid"
        },
        {
            "Order": "006589",
            "Number_of_Products": 50,
            "Customer": "Faruk Hossain",
            "Seller": "Faruk Hossain",
            "Amount": "$450",
            "Payment_Method": "Cash",
            "Payment_Status": "Paid"
        },
        {
            "Order": "006589",
            "Number_of_Products": 50,
            "Customer": "Faruk Hossain",
            "Seller": "Faruk Hossain",
            "Amount": "$450",
            "Payment_Method": "Cash",
            "Payment_Status": "Paid"
        },
        {
            "Order": "006589",
            "Number_of_Products": 50,
            "Customer": "Faruk Hossain",
            "Seller": "Faruk Hossain",
            "Amount": "$450",
            "Payment_Method": "Cash",
            "Payment_Status": "Paid"
        }
    ]



}

onMounted(async () => {
    data.value = await getData();

});
</script>

<template>
    <div class="lg:p-8 w-full flex flex-col gap-8 ">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">Category Product</h1>

        </div>
        <div class="grid md:grid-cols-3 grid-cols-2 place-items-center gap-4 ">
            <div class="bg-gradient-to-r shadow-xl rounded w-[304px] h-[137px] from-[#E67418] to-[#49301C] ">
                <div class=" text-center p-4 text-white">
                    <Icon name="mdi:box-upload" class="text-primary text-6xl"></Icon>
                    <h1 class="text-2xl  font-bold ">44</h1>
                    <p>Total Uploads</p>

                </div>

            </div>
            <div class=" shadow-xl rounded w-[304px] h-[137px]  ">
                <div class=" text-center p-4">
                    <Icon name="mdi:plus-circle" class="text-primary text-6xl"></Icon>

                    <p class="font-bold">Total Uploads</p>

                </div>

            </div>
            <div class="bg-gradient-to-r shadow-xl rounded w-[304px] h-[137px] text-white bg-primary ">
                <div class=" text-center p-4">
                    <Icon name="mdi:box-upload" class=" text-6xl"></Icon>
                    <h1 class="text-2xl font-bold ">44</h1>
                    <p>Total Uploads</p>

                </div>

            </div>


        </div>
        <div class="container py-10 mx-auto w-full flex justify-center">

            <NullTable class="w-full" :columns="columns" :data="data" />
        </div>
    </div>
</template>