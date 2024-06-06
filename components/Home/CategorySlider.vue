<script setup>
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const adstype = ref([]);
const categoryData = ref([])
const sideBarCategory = ref([])
const adsType = async () => {
    refreshNuxtData();
    try {
        const { pending, data } = await useFetch(`${useRuntimeConfig().public.baseUrl}/types`);
        adstype.value = data.value.data;
    } catch (error) {
        console.log(error);
    }
}
adsType();


const categories = ref([]);
const loading = ref(true);
const getCetagories = async () => {
    const res = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`)

    categoryData.value = res.data.value
    console.log(res.data.value)
    sideBarCategory.value = res.data.value.categories.slice(0, 5)


}

getCetagories()

</script>
<template>
    <div class="lg:flex">
        <aside id="default-sidebar" class="lg:block hidden z-40 w-64 h-auto " aria-label="Sidebar">
            <div class="h-full bg-[#EAE5E2] py-4 ">
                <div class="flex w-full ">
                    <div class=" w-full">
                        <div class="w-full  p-1  bg-[#EAE5E2]/50  flex flex-col gap-y-2 ">
                            <h1 class="text-center text-2xl font-bold text-primary">Categories</h1>

                            <DropdownMenu class="bg-white" v-for="(i, j) in sideBarCategory">
                                <DropdownMenuTrigger class="w-full" v-if="j <= 4" as-child>
                                    <Button
                                        class=" flex w-full  justify-between rounded-full h-auto hover:text-white text-sm bg-white text-black">
                                        <h1 class=" font-bold text-start text-wrap text-xs">
                                            {{ i.name.slice(0, 20) }}.....

                                        </h1>
                                        <Icon name="mdi:chevron-right" class="text-xl font-bold"> </Icon>
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent class="w-56 ml-[200px] bg-white">
                                    <!-- <DropdownMenuItem v-if="!j.children" v-for="(j, index2) in i.children"
                                        :key="index2">

                                        <Button class=" flex justify-between w-full h-auto text-sm bg-white text-black">
                                            <div class="text-wrap text-xs">
                                                {{ j.name }}
                                            </div>
                                            <Icon name="mdi:chevron-right" class="text-2xl font-bold"> </Icon>
                                        </Button>
                                    </DropdownMenuItem> -->


                                    <DropdownMenuSub class="bg-white" v-for="(j, index2) in i.children">
                                        <DropdownMenuSubTrigger>
                                            <div class="text-wrap text-xs">
                                                {{ j.name }}
                                            </div>

                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent class="bg-white">
                                                <DropdownMenuItem v-for="(k, index2) in j.children"><Button
                                                        class=" flex justify-between w-full h-auto text-sm bg-white text-black">
                                                        <div class="text-wrap text-xs">
                                                            {{ k.name }}
                                                        </div>

                                                    </Button></DropdownMenuItem>
                                                <DropdownMenuSeparator />

                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>



                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu class="bg-white">
                                <DropdownMenuTrigger class="px-2" as-child>
                                    <Button
                                        class=" flex w-full p-x-2 justify-between rounded-full h-auto hover:text-white text-sm bg-white text-black">
                                        <h1 class=" font-bold text-start text-wrap text-xs">
                                            All Categories

                                        </h1>
                                        <Icon name="mdi:chevron-right" class="text-2xl font-bold"> </Icon>
                                    </Button>
                                </DropdownMenuTrigger>


                            </DropdownMenu>


                        </div>
                    </div>




                </div>


            </div>

        </aside>

        <Sheet>
            <SheetTrigger class="lg:hidden " as-child>
                <Button variant="outline">
                    <Icon name="mdi:menu" class="text-2xl"></Icon>
                </Button>
            </SheetTrigger>
            <SheetContent class="bg-[#EAE5E2]/50">
                <div class="w-full  p-4 flex flex-col gap-2 ">
                    <h1 class="text-center text-2xl font-bold text-primary">Categories</h1>

                    <DropdownMenu class="bg-white" v-for="(i, j) in sideBarCategory">
                        <DropdownMenuTrigger class="px-2" v-if="j <= 4" as-child>
                            <Button class=" flex w-full p-x-2 justify-between h-auto text-sm bg-white text-black">
                                <div class=" text-start text-wrap text-xs">
                                    {{ i.name }}
                                </div>
                                <Icon name=">" class="text-5xl font-bold"> </Icon>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent class="w-56 bg-white">
                            <DropdownMenuItem v-for="(j, index2) in i.children" :key="index2">

                                <Button class=" flex justify-between w-full h-auto text-sm bg-white text-black">
                                    <div class="text-wrap text-xs">
                                        {{ j.name }}
                                    </div>
                                    <Icon name=">" class="text-5xl font-bold"> </Icon>
                                </Button>
                            </DropdownMenuItem>


                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </SheetContent>
        </Sheet>


        <div id="indicators-carousel" class="relative w-full z-10" data-carousel="static">
            <!-- Carousel wrapper -->
            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                <!-- Item 1 -->
                <div class="duration-700 ease-in-out" data-carousel-item="active">
                    <img src="assets/images/slide.png"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>
                <!-- Item 2 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="assets/images/slide.png"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>
                <!-- Item 3 -->
                <div class="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="assets/images/slide.png"
                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                </div>

            </div>
            <!-- Slider indicators -->
            <div class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-20 left-1/2">
                <button type="button" class="w-3 h-3 rounded-full text-red-500" aria-current="true" aria-label="Slide 1"
                    data-carousel-slide-to="0"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"
                    data-carousel-slide-to="1"></button>
                <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"
                    data-carousel-slide-to="2"></button>

            </div>
            <!-- Slider controls -->

        </div>

    </div>
</template>