<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
</script>

<template>
    <Card class="w-[292px] shadow-xl   hover:scale-105">
        <CardHeader class=" bg-center   object-contain h-[261px]  p-2 w-full"
            style="background: url('https://5.imimg.com/data5/FN/UG/MY-45072009/195-65r15-perfinza-clx1-tl-tyer-500x500.png');">
            <Icon name="mdi:heart" class="text-2xl"></Icon>

        </CardHeader>
        <CardContent>
            <div class="flex items-center p-4">
                <Icon name="mdi:star" class="text-[#FFD11B] text-3xl"></Icon>
                <Icon name="mdi:star" class="text-[#FFD11B] text-3xl"></Icon>
                <Icon name="mdi:star" class="text-[#FFD11B] text-3xl"></Icon>
                <Icon name="mdi:star" class="text-[#FFD11B] text-3xl"></Icon>
                <Icon name="mdi:star" class="text-[#FFD11B] text-3xl"></Icon>
                <span>(75)</span>
            </div>
            <hr>
            <div class="p-1 font-bold">
                <h1>Appolo 2 wheel Tyre</h1>

            </div>
            <hr>
            <div class="w-full flex pt-2   gap-2">
                <Badge class="text-white rounded">-30%</Badge>
                <span class="text-primary">$100.00</span>
                <del class="text-slate-400">$180.00</del>
            </div>

        </CardContent>
        <CardFooter class="">
            <Button class=" rounded-full hover:bg-gray-300 hove:text-gray-800 mx-auto">
                <Icon name="mdi:cart-arrow-down" class="text-2xl"></Icon>
                <span>Add to cart</span>
            </Button>
        </CardFooter>
    </Card>
</template>