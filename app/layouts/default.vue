<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
const appStore = useAppStore()
const cartStore = useCartStore()

// 
function googleTranslateElementInit() {
  new google.translate.TranslateElement({}, 'google_translate_element')
}

onMounted(() => {
  googleTranslateElementInit()
  appStore.getCetagories()
  appStore.getFlashSale()
  cartStore.getLocalProducts().then(res => {
    setTimeout(() => {
      cartStore.fromDateGenerator()
    })
  })
})
</script>

<template>
  <Toaster />
  <div class="bg-primary bg-opacity-10 poppins-regular">
    <div class="hidden" id="google_translate_element"></div>
    <div class="container mx-auto max-w-[1440px] bg-white p-0">
      <Header></Header>
      <slot></slot>
      <Footer></Footer>
      <!-- <ToasterAlert></ToasterAlert> -->
      <!-- <Toaster /> -->
    </div>
  </div>
</template>

<style>
#goog-gt-tt{
  display: none !important;
}
body {
  top: 0 !important;
}

.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc {
  display: none !important;
}

.VIpgJd-yAWNEb-VIpgJd-fmcmS-sn54Q {
  box-shadow: none;
  background-color: transparent !important;
}

body>.skiptranslate {
  display: none;
}
#goog-gt-tt{
  display: none !important;
}
</style>