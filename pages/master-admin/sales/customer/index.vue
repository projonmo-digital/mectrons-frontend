<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from "./columns"



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
    <div class="lg:p-8 w-full ">
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">Customers</h1>
            <AddButton type="Category"></AddButton>
        </div>
        <hr class="mt-4 h-[2px]">
        <div class="container py-10 mx-auto w-full flex justify-center">

            <CategoryProductDataTable :columns="columns" :data="data" />
        </div>
    </div>
</template>