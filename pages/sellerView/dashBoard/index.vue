<script setup>

</script>

<template>
    <div class="w-full flex-col flex justify-center items-center">
        <div class=" flex flex-col gap-8 justify-center">
            <div class="grid md:grid-cols-3 grid-cols-2 place-items-center gap-4 ">
                <div class="bg-gradient-to-r shadow-xl rounded w-[304px] h-[137px] from-[#E67418] to-[#49301C] ">
                    <div class=" text-center p-4 text-white">
                        <Icon name="mdi:box-upload" class="text-primary text-6xl"></Icon>
                        <h1 class="text-2xl  font-bold ">44</h1>
                        <p>Total Uploads</p>

                    </div>

                </div>
                <NuxtLink to="/sellerView/addNewProduct"
                    class="scale-100 hover:scale-105 transform transition duration-300 ease-in-out">
                    <div class="shadow-xl rounded w-[304px] h-[137px]">
                        <div class="text-center p-4">
                            <Icon name="mdi:plus-circle" class="text-primary text-6xl"></Icon>
                            <p class="font-bold">Total Uploads</p>
                        </div>
                    </div>
                </NuxtLink>
                <div class="bg-gradient-to-r shadow-xl rounded w-[304px] h-[137px] text-white bg-primary ">
                    <div class=" text-center p-4">
                        <Icon name="mdi:box-upload" class=" text-6xl"></Icon>
                        <h1 class="text-2xl font-bold ">44</h1>
                        <p>Total Uploads</p>

                    </div>

                </div>


            </div>
            <div class=" flex md:flex-row flex-col gap-4">
                <div class="w-[304px] h-[196px] bg-primary rounded p-4 text-white">
                    <div class="w-full justify-end flex">
                        <Icon name="fluent:arrow-growth-20-filled" class=" text-8xl text-white"></Icon>
                    </div>
                    <div>
                        <p>Total Sales</p>
                        <h1 class="text-4xl font-bold">$1034</h1>
                    </div>
                </div>

                <div class=" border-2 shadow rounded w-[304px] p-4 flex flex-col gap-4">
                    <div>
                        <h1 class=" font-bold text-primary"> Orders</h1>
                        <p>This month</p>

                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center gap-2">
                            <Icon name="fluent:box-16-filled" class=" text-5xl text-primary"></Icon>
                            <div>
                                <p>New Order</p>
                                <p class="text-2xl font-bold">46</p>
                            </div>

                        </div>
                        <div class="flex items-center gap-2">
                            <Icon name="fluent:box-16-filled" class=" text-5xl text-primary"></Icon>
                            <div>
                                <p>New Order</p>
                                <p class="text-2xl font-bold">46</p>
                            </div>

                        </div>
                        <div class="flex items-center gap-2">
                            <Icon name="fluent:box-16-filled" class=" text-5xl text-primary"></Icon>
                            <div>
                                <p>New Order</p>
                                <p class="text-2xl font-bold">46</p>
                            </div>

                        </div>
                        <div class="flex items-center gap-2">
                            <Icon name="fluent:box-16-filled" class=" text-5xl text-primary"></Icon>
                            <div>
                                <p>New Order</p>
                                <p class="text-2xl font-bold">46</p>
                            </div>

                        </div>
                    </div>


                </div>
                <div class="w-[304px] h-[196px] bg-primary rounded p-4 flex flex-col gap-4 text-white">
                    <p class=" font-bold">Sold Amount</p>
                    <p>Your Sold Amount ( Current Month)</p>
                    <div>

                        <h1 class="text-4xl font-bold">$1034</h1>
                    </div>
                    <p>Last month:$0.00</p>

                </div>
            </div>



        </div>

    </div>
    <div class="flex flex-col gap-4 p-4">
        <HeaderWithHr header="My products"></HeaderWithHr>
        <Slider></Slider>
    </div>
</template>