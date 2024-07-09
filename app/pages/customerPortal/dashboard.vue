<script setup>


const features = [
    {
        icon: 'mdi:cart',
        text: 'Products in Cart',
        class: 'w-12 h-12 p-2 bg-primary rounded-full text-white'

    },
    {
        icon: 'mdi:heart',
        text: 'Products in Wishlist',
        class: 'w-12 h-12 p-2 bg-red-700 rounded-full text-white'
    },
    {
        icon: 'fluent:box-16-filled',
        text: 'Total Order Products',
        class: 'w-12 h-12 p-2 bg-green-500 rounded-full text-white'
    }
];
</script>
<template>
    <div class=" flex flex-col gap-16">
        <div class="flex lg:flex-row flex-col gap-8">
            <div v-for="i in features" :key="i.text" class="w-[30%] shadow-2xl p-4 rounded-lg">
                <div class="flex flex-col gap-8">
                    <div class="flex gap-8 items-center rounded-full">

                        <Icon :name="i.icon" :class="i.class" />
                        <p class=" text-2xl">45 </p>
                    </div>
                    <p>{{ i.text }}</p>
                </div>

            </div>
        </div>
        <div class="w-full flex flex-col gap-4">
            <h1 class=" text-2xl font-bold">Track My order</h1>
            <div class="w-full shadow-lg h-[251px] rounded-xl p-4 flex gap-4 border">
                <div class=" w-[30%] h-full  overflow-hidden rounded-xl ">
                    <img class=" w-full h-full object-cover"
                        src="https://5.imimg.com/data5/FN/UG/MY-45072009/195-65r15-perfinza-clx1-tl-tyer-500x500.png">

                </div>
                <div class=" flex w-full flex-col gap-8">
                    <h1 class=" font-bold text-xl">Apollo 2 wheel Tyre</h1>
                    <p class="text-sm">$400</p>
                    <p class=" text-sm">Ordered on 12 October,2023</p>
                    <div class="flex w-full gap-4">
                        <Button class="w-full">
                            <Icon name="mdi:tick-circle" class="text-2xl"></Icon>
                            <p>Delivered</p>
                        </Button>
                        <Button class="bg-green-500 w-full">
                            <Icon class=" text-2xl" name="fluent:recycle-20-filled"> </Icon>
                            <p>Re-Order</p>
                        </Button>
                        <Button class=" bg-black w-full">
                            <Icon class="text-2xl" name="mdi:share" </Icon>

                                <p>Share</p>

                        </Button>
                    </div>
                </div>

            </div>

        </div>
        <div class=" flex gap-8 flex-col">
            <h1 class=" text-2xl font-bold">Track My order</h1>
            <div class=" flex gap-8 justify-center">
                <ProductCardMe v-for="(_, index) in 3"></ProductCardMe>
            </div>

        </div>

    </div>
</template>
