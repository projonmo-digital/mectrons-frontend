<script setup>
const emit = defineEmits(['search'])
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

// methods

const submit = () => {
    emit('search', selectedsecondSearchBar)
}

const getMake = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data`)
    secondSearchBar.make = response
}

const getModel = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}`)
    secondSearchBar.model = response
}

const getYear = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}`)
    secondSearchBar.year = response
}
const getCC = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}`)
    secondSearchBar.cc = response
}
const getEngyne = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}`)
    secondSearchBar.engyne = response
}

const getParts = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/car-data?make=${selectedsecondSearchBar.make}&models=${selectedsecondSearchBar.model}&year=${selectedsecondSearchBar.year}&cc=${selectedsecondSearchBar.cc}&engine=${selectedsecondSearchBar.engyne}`)
    secondSearchBar.parts = response
}

const categoryData = ref('')

const getCetagories = async () => {
    const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/general-categories`, { lazy: true })
    categoryData.value = response
}

onMounted(() => {
    getCetagories()
    getMake()
})
</script>

<template>
    <div class="bg-primary rounded-xl flex notranslate">
        <div class="flex-1 flex items-center p-3 gap-3">
            <select class="h-[35px] w-1/6 rounded px-2" @change="getModel" v-model="selectedsecondSearchBar.make">
                <option value="" disabled selected>Model </option>
                <option v-for="i in secondSearchBar.make" :value="i.make">{{ i.make }}</option>
            </select>
            <select @change="getYear" :disabled="!selectedsecondSearchBar.make" class="h-[35px]  rounded px-2"
                v-model="selectedsecondSearchBar.model">
                <option value="" disabled selected>Model </option>
                <option v-for="i in secondSearchBar.model" :value="i.models">{{ i.models }}</option>
            </select>
            <select @change="getCC" :disabled="!secondSearchBar.year" class="h-[35px] w-1/6 rounded px-2"
                v-model="selectedsecondSearchBar.year">
                <option value="" disabled selected>Year</option>
                <option v-for="i in secondSearchBar.year" :value="i.year">{{ i.year }}</option>
            </select>
            <select @change="getEngyne" :disabled="!secondSearchBar.cc" class="h-[35px] w-1/6 rounded px-2"
                v-model="selectedsecondSearchBar.cc">
                <option value="" disabled selected>CC</option>
                <option v-for="i in secondSearchBar.cc" :value="i.cc">{{ i.cc }}</option>
            </select>
            <select @change="getParts" :disabled="!secondSearchBar.engyne" class="h-[35px] w-1/6 rounded px-2"
                v-model="selectedsecondSearchBar.engyne">
                <option value="" disabled selected>Engine</option>
                <option v-for="i in secondSearchBar.engyne" :value="i.engine">{{ i.engine }}</option>
            </select>

            <select :disabled="!secondSearchBar.parts" class="h-[35px] w-1/6 rounded px-2"
                v-model="selectedsecondSearchBar.parts">
                <option value="" disabled selected>Parts</option>
                <option v-for="i in categoryData?.categories" :value="i.name">{{ i.name }}</option>
            </select>
        </div>
        <button :disabled="!secondSearchBar.parts"
            class=" cursor-pointer text-primary bg-white bg-opacity-50 hover:bg-opacity-30 px-5 rounded-e-xl" @click="submit">
            <Icon class="text-2xl" name="fa:search"></Icon>
        </button>
    </div>
</template>