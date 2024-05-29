<script setup>
import Card1 from '@/components/master-admin/Card1'
import Card2 from '@/components/master-admin/Card2'
import Card3 from '@/components/master-admin/Card3'
import Logos from '@/components/master-admin/Logos'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const Icon = ['']
const auth = useAuthStore();

onMounted(() => {
    initFlowbite();
})
definePageMeta({
    middleware: ["auth", "admin"]
})

</script>

<template>
    <div class="flex flex-col w-full items-center lg:p-8 gap-8">
        <div class="flex">
            <div class="flex flex-col md:gap-8">
                <div class="md:flex justify-end items-end">
                    <Card1 icon="mdi:people-group" type="Customer" class="">
                        <div class="flex flex-col ">
                            <p>
                                <Icon name="fa-solid:circle" class="text-primary text-[14px]"></Icon> Top Customers
                            </p>
                            <div style="position: relative;">
                                <Avatar class="h-[20px] w-[20px] z-40" style="position: absolute; top: 0; left:10px;">
                                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar class="h-[20px] w-[20px] z-30" style="position: absolute; top: 0; left: 10px;">
                                    <AvatarImage src="" alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <Avatar class="h-[20px] w-[20px] z-20" style="position: absolute; top: 0; left: 20px;">
                                    <AvatarImage
                                        src="https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?t=st=1715862620~exp=1715866220~hmac=5f335ffc86f5244c80478368fed15e1470707cf10256ee5bbfe2a1c56b018537&w=900"
                                        alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <Avatar class="h-[20px] w-[20px] z-10" style="position: absolute; top: 0; left: 30px;">
                                    <AvatarImage
                                        src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?t=st=1715862646~exp=1715866246~hmac=0da8dbb0167eecf72f44ccc5e8c79b763280631cb31107c5eb493de78cf5399e&w=900"
                                        alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar class="h-[20px] w-[20px] z-0" style="position: absolute; top: 0; left: 40px;">
                                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                    </Card1>
                    <Card1 icon="prime:box" type="products">
                        <div>
                            <p>
                                <Icon name="fa-solid:circle" class="text-[#348110] text-[14px] uppercase"></Icon> In
                                house
                                products
                            </p>
                            <p>
                                <Icon name="fa-solid:circle" class="text-primary text-[14px]"></Icon> Seller products
                            </p>
                        </div>


                    </Card1>
                </div>
                <div class="md:flex">
                    <Card2 type="Categories" icon='mdi-light:view-dashboard'>
                        <div>
                            <div class="flex justify-between">
                                <p>
                                    <Icon name="fa-solid:circle" class="text-[#348110] text-[14px] uppercase"></Icon>
                                    Tyres
                                </p>
                                <p>$100</p>
                            </div>
                            <div class="flex justify-between">
                                <p>
                                    <Icon name="fa-solid:circle" class="text-primary text-[14px] uppercase"></Icon>
                                    Break
                                </p>
                                <p>$100</p>
                            </div>
                            <div class="flex justify-between">
                                <p>
                                    <Icon name="fa-solid:circle" class="text-[#348110] text-[14px] uppercase"></Icon>
                                    Engyne
                                </p>
                                <p>$100</p>
                            </div>
                        </div>


                    </Card2>
                    <Card2 class="bg-[#2489BE]/40" type="Top Sells" icon="mdi:coupon-outline">
                        <div class="h-[233px] ">
                            <Badge
                                class="flex rounded justify-between bg-[#2489BE] text-[14px] text-white font-bold h-[39px]">
                                <span>Sale in
                                    this
                                    month</span><span>$48,345456</span>
                            </Badge>
                            <div class="p-2">
                                <div class="flex justify-between">
                                    <p>
                                        <Icon name="fa-solid:circle" class="text-primary text-[14px] uppercase"></Icon>
                                        Break
                                    </p>
                                    <p>$100</p>
                                </div>
                                <div class="flex justify-between">
                                    <p>
                                        <Icon name="fa-solid:circle" class="text-[#348110] text-[14px] uppercase">
                                        </Icon>
                                        Engyne
                                    </p>
                                    <p>$100</p>
                                </div>
                            </div>
                        </div>
                    </Card2>
                </div>
            </div>
            <Card3 type="Top Seller" icon="hugeicons:manager">
                <div class="flex flex-col gap-2">
                    <p>
                        <Icon name="fa-solid:circle" class="text-[#348110] text-[14px] uppercase"></Icon> In house
                        products
                    </p>
                    <p>
                        <Icon name="fa-solid:circle" class="text-primary text-[14px]"></Icon> Seller products
                    </p>
                </div>
                <div style="position: relative;">
                    <Avatar class="h-[20px] w-[20px] z-40" style="position: absolute; top: 0; left:10px;">
                        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar class="h-[20px] w-[20px] z-30" style="position: absolute; top: 0; left: 10px;">
                        <AvatarImage src="" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Avatar class="h-[20px] w-[20px] z-20" style="position: absolute; top: 0; left: 20px;">
                        <AvatarImage
                            src="https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg?t=st=1715862620~exp=1715866220~hmac=5f335ffc86f5244c80478368fed15e1470707cf10256ee5bbfe2a1c56b018537&w=900"
                            alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Avatar class="h-[20px] w-[20px] z-10" style="position: absolute; top: 0; left: 30px;">
                        <AvatarImage
                            src="https://img.freepik.com/free-photo/portrait-successful-man-having-stubble-posing-with-broad-smile-keeping-arms-folded_171337-1267.jpg?t=st=1715862646~exp=1715866246~hmac=0da8dbb0167eecf72f44ccc5e8c79b763280631cb31107c5eb493de78cf5399e&w=900"
                            alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar class="h-[20px] w-[20px] z-0" style="position: absolute; top: 0; left: 40px;">
                        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <hr class="border-t-2 border-dashed  border-gray-300 my-16">
                <div class="flex flex-col gap-4 ">
                    <Button class=" bg-[#348110]/50 rounded text-[#348110]">All sellers</Button>
                    <Button class="bg-[#D70E0E]/30 rounded text-[#D70E0E]">Pending Sellers</Button>


                </div>



            </Card3>
        </div>
        <div class="flex gap-4">
            <div class=" shadow rounded w-[472px] h-[335px] border flex  gap-4   p-4">
                <div class="flex flex-col gap-4">
                    <div class="w-[205px] h-[207px] border p-4 roud" style=" border-radius: 9px">
                        <h1 class="text-2xl">77</h1>
                        <p class="text-lg text-slate-400 ">Total Orders</p>
                        <Button class="h-[33px] mt-10 rounded w-full text-white bg-blue-400  ">All orders</Button>

                    </div>
                    <div class="w-[205px] h-[56px] border p-4 bg-[#D70E0E] flex justify-between items-center text-white"
                        style=" border-radius: 9px">
                        <p>Pending Orders</p>
                        <p class=" text-white text-2xl">47</p>
                    </div>



                </div>
                <div class="flex flex-col gap-4">
                    <div class="w-[205px] h-[56px] border p-4 bg-[#0575B3]/20 flex justify-between items-center text-[#0575B3]"
                        style=" border-radius: 9px">
                        <p>Pending Orders</p>
                        <p class=" text-[#0575B3] text-2xl">47</p>
                    </div>
                    <div class="w-[205px] h-[56px] border p-4 bg-[#348110]/40  flex justify-between items-center text-[#348110]"
                        style=" border-radius: 9px">
                        <p>Pending Orders</p>
                        <p class=" text-[#348110] text-2xl">47</p>
                    </div>
                    <div class="w-[205px] h-[56px] border p-4 bg-[#D70E0E]/30 flex justify-between items-center text-[#D70E0E]"
                        style=" border-radius: 9px">
                        <p>Pending Orders</p>
                        <p class=" text-[#D70E0E] text-2xl">47</p>
                    </div>
                    <div class="w-[205px] h-[56px] border p-4 bg-[#FFD11B]/20 flex justify-between items-center "
                        style=" border-radius: 9px">
                        <p>Pending Orders</p>
                        <p class="  text-2xl">47</p>
                    </div>


                </div>


            </div>
            <div class="shadow rounded w-[472px] h-[335px] border flex flex-col  gap-4   p-4 ">
                <div class=" flex  justify-between w-full " id="top seller">
                    <div>
                        <p class="font text-lg font-bold items-center">Top Seller & Products</p>
                    </div>

                    <div class="w-[199px] h-7 flex gap-2 ">

                        <div
                            class=" hover:bg-[#FBE2CD]  cursor-pointer hover:text-[#F57F20] w-[52px] text-center   h-[28px] hover:-skew-x-12 ">
                            <p class=" skew-x-0">All</p>
                        </div>
                        <div
                            class=" hover:bg-[#FBE2CD]  cursor-pointer hover:text-[#F57F20] w-[52px] text-center   h-[28px] hover:-skew-x-12 ">
                            <p class=" skew-x-0">Today</p>
                        </div>
                        <div
                            class=" hover:bg-[#FBE2CD]  cursor-pointer hover:text-[#F57F20] w-[52px] text-center   h-[28px] hover:-skew-x-12  ">
                            <p class=" skew-x-0">Week</p>
                        </div>
                        <div
                            class=" hover:bg-[#FBE2CD]  cursor-pointer hover:text-[#F57F20] w-[52px] text-center   h-[28px] hover:-skew-x-12 ">
                            <p class=" skew-x-0">Month</p>
                        </div>

                    </div>

                </div>

                <div class="text-lg">
                    <h1 class="">By sales</h1>
                </div>
                <div>

                    <Logos></Logos>
                </div>
                <div class="mt-10">
                    <table class="w-full text-center">
                        <tr class="  border-b-4">
                            <th>Item</th>
                            <th>Quality</th>
                            <th>Total Price</th>

                        </tr>
                        <tr>
                            <td>Appolo 2 wheel Tyre</td>
                            <td>20</td>
                            <td>$2000</td>
                        </tr>
                    </table>
                </div>



            </div>

        </div>
    </div>

</template>