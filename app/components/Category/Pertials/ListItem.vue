<script setup>
const auth = useAuthStore();
const props = defineProps(['item'])

</script>

<template>
    <div class="border relative border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md rounded-xl overflow-hidden my-5 bg-white">
        <nuxt-link :to="`/category/${item.id}`" class="p-5 flex flex-col items-center justify-center">
            <div class="image flex justify-center items-center">
                <img :src="`/_nuxt/${item.img}`" alt="Image" class="w-16 h-16 object-cover">
            </div>
            <h4 class="title text-2xl font-bold mt-2">{{ item.name }}</h4>
        </nuxt-link>
    </div>
</template>