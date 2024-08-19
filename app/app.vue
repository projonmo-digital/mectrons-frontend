<script setup>
import { ref, onMounted, nextTick } from 'vue'
import logo from '~/assets/images/logo.svg'

const nuxtApp = useNuxtApp()

const loading = ref(false);
nuxtApp.hook("page:start", () => {
    loading.value = true;
});
nuxtApp.hook("page:finish", () => {
    loading.value = false;
});

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66c1d0de0cca4f8a7a7748ab/1i5ihfq4c';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

onMounted(() => {
    nextTick(() => {
        window.Tawk_API.autoStart = false;
        window.Tawk_API.onChatStarted = function () {
            //place your code here
            console.log('started');
        };
        window.Tawk_API.visitor = {
            name: 'Shishir 11',
            email: 'email@email.com',
            hash: 'email@email.com'
        };

    })
})

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