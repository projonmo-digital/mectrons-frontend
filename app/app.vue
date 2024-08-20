<script setup>
import { ref } from 'vue'
import logo from '~/assets/images/logo.svg'

const nuxtApp = useNuxtApp()

const loading = ref(false);
nuxtApp.hook("page:start", () => {
    loading.value = true;
});
nuxtApp.hook("page:finish", () => {
    loading.value = false;
});
</script>

<template>
    <div v-show="loading"
        class="w-screen h-screen bg-white z-[500] fixed inset-0 flex flex-col items-center justify-center">
        <img :src="logo" class="w-[200px]" alt="">
    </div>
    <NuxtLoadingIndicator color="#f85606" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>