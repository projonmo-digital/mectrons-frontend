    <script setup>
    import {
        Pagination,
        PaginationEllipsis,
        PaginationFirst,
        PaginationLast,
        PaginationList,
        PaginationListItem,
        PaginationNext,
        PaginationPrev,
    } from '@/components/ui/pagination'
    import {
        Button,
    } from '@/components/ui/button'
    const secondSearchBar = reactive({
        model: '',
        make: '',
        year: '',
        cc: '',
        engyne: '',
        parts: ''
    })
    const selectedsecondSearchBar = reactive({
        model: '',
        make: '',
        year: '',
        cc: '',
        engyne: '',
        parts: ''
    })
    const route = useRoute()

    const getMake = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data`)
        secondSearchBar.make = data.value

    }
    getMake()
    const getModel = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}`)
        secondSearchBar.model = data.value
    }


    const getYear = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}`)
        secondSearchBar.year = data.value


    }
    const getCC = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}`)
        secondSearchBar.cc = data.value
    }
    const getEngyne = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}`)
        secondSearchBar.engyne = data.value
    }

    const getParts = async () => {
        const { data, pending } = await useFetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}&engine=${selectedsecondSearchBar.engyne}`)
        secondSearchBar.parts = data.value


    }



    const categoryData = ref('')

    const getCetagories = async () => {
        const res = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`)

        categoryData.value = res.data.value




    }
    getCetagories()
    const loading = ref(true)
    const data = ref('')
    const setFilter = async () => {
        const token = useCookie('token')

        try {
            const response = await useFetch(
                `${useRuntimeConfig().public.baseUrl}/car-data-search`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.getToken}`,
                    },
                    body: route.query,
                }
            );

            data.value = response.data.value

            loading.value = false


            // Refresh products list after update
        } catch (error) {

            console.log(error);
        }
    };

    setFilter()

</script>

<template>
    <div class="flex flex-col gap-8">
        <div class="flex">
            <CategorySideBar></CategorySideBar>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col  ">
                    <h1 class="text-2xl p-4 font-bold text-start">Shop By Categories</h1>
                    <div class="f">
                        <CategoryCaro class="md:w-full w-[400px]"></CategoryCaro>
                    </div>
                </div>
                <div class="">
                    <h4 class=" text-2xl p-4 font-bold">Best Seller Products</h4>
                    <HomeFeaturedProducts></HomeFeaturedProducts>
                </div>
            </div>
        </div>
        <div class=" flex justify-center w-full">
            <div
                class=" max-w-[1000px] lg:h-[71px]   w-full place-content-center   grid grid-cols-2 md:grid-cols-7 p-4 gap-4 bg-primary rounded-2xl ">

                <select class="h-[35px] rounded h-" @change="getModel" v-model="selectedsecondSearchBar.make">
                    <option value="" disabled selected>Model </option>
                    <option v-for="i in secondSearchBar.make">{{ i.make }}</option>

                </select>
                <select @change="getYear" :disabled="!selectedsecondSearchBar.make" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.model">
                    <option value="" disabled selected>Model </option>
                    <option v-for="i in secondSearchBar.model">{{ i.models }}</option>
                </select>
                <select @change="getCC" :disabled="!secondSearchBar.year" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.year">
                    <option value="" disabled selected>Year</option>
                    <option v-for="i in secondSearchBar.year">{{ i.year }}</option>
                </select>
                <select @change="getEngyne" :disabled="!secondSearchBar.cc" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.cc">
                    <option value="" disabled selected>CC</option>
                    <option v-for="i in secondSearchBar.cc">{{ i.cc }}</option>
                </select>
                <select @change="getParts" :disabled="!secondSearchBar.engyne" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.engyne">
                    <option value="" disabled selected>Engine</option>
                    <option v-for="i in secondSearchBar.engyne">{{ i.engine }}</option>
                </select>

                <select :disabled="!secondSearchBar.parts" class="h-[35px] rounded h-"
                    v-model="selectedsecondSearchBar.parts">
                    <option value="" disabled selected>Parts</option>
                    <option v-for="i in categoryData.categories">{{ i.name }}</option>
                </select>
                <NuxtLink :disabled="!secondSearchBar.parts"
                    :to="{ path: '/category/product', query: selectedsecondSearchBar }"><Button
                        :disabled="!secondSearchBar.parts"
                        class=" h-[35px] w-16 text-primary hover:bg-white  bg-red-200 " @click="">
                        <Icon class="text-2xl  bg" name="fa:search"></Icon>
                    </Button></NuxtLink>

            </div>
        </div>
        <div class="flex lg:flex-row justify-between flex-col">
            <div class="md:block hidden lg:flex flex-col gap-8">
                <div class=" w-[360px] h-[373px] ">
                    <img
                        src="https://img.freepik.com/free-psd/car-rental-instagram-social-media-post-banner_505751-3050.jpg">
                </div>
                <div class=" w-[360px] h-[373px]">
                    <img
                        src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cars-design-template-ff53ab6d91a2938b0cbadbc1c00c54e3_screen.jpg?ts=1657693584">
                </div>

            </div>
            <div class=" w-full justify-center">
                <h1 class=" text-2xl font-bold p-4">Other Product</h1>
                <div class="w-full h-full">
                    <div v-if="loading" class="h-[70vh] w-full flex justify-center items-center ">
                        <Icon name="fluent:spinner-ios-16-filled" class=" text-6xl text-primary animate-spin"></Icon>

                    </div>
                    <div v-else>
                        <div v-if="data.length > 0" class="grid grid-cols-3 gap-4">
                            <ProductCard v-for="i in data" product="i"></ProductCard>


                        </div>

                        <div v-else class="flex w-full h-[70vh] justify-center items-center">

                            <div class="flex justify-center items-center flex-col gap-4 text-center">
                                <Icon name="mdi:emoticon-sad" class="text-6xl">

                                </Icon>
                                <h1> Sorry we couldn't find any results</h1>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div class="flex justify-center ">

            <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>