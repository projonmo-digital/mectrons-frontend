<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
const appStore = useAppStore()

// 
function googleTranslateElementInit() {
  new google.translate.TranslateElement({}, 'google_translate_element')
}

onMounted(() => {
  googleTranslateElementInit()
  appStore.getCetagories()
})
</script>

<template>
  <Toaster />
  <div class="bg-primary bg-opacity-10 poppins-regular">
    <div class="hidden" id="google_translate_element"></div>
    <div class="container mx-auto max-w-[1440px] bg-white p-0">
      <Header></Header>
      <slot />
      <Footer></Footer>
      <!-- <ToasterAlert></ToasterAlert> -->
      <!-- <Toaster /> -->
    </div>
  </div>
</template>

<style>
body {
  top: 0 !important;
}

body>.skiptranslate {
  display: none;
}
</style>