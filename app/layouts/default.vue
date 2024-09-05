<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { initTawkTo, getHashValue } from '~/helper/twakTo';
const appStore = useAppStore()
const cartStore = useCartStore()
const { user } = storeToRefs(useAuthStore())

function googleTranslateElementInit() {
  //@ts-ignore
  new google.translate.TranslateElement({}, 'google_translate_element')
}

onMounted(() => {
  googleTranslateElementInit()
  appStore.getCetagories()
  appStore.getFlashSale()
  cartStore.getLocalProducts()
  cartStore.getPaymentMethods()
  if (user.value?.type === 'buyer') {
    getHashValue().then((hash: any) => {
      initTawkTo(user.value!, hash) 
    })
  }
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