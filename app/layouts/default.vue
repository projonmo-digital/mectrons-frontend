<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { initTawkTo, getHashValue } from '~/helper/twakTo';
import IntersectionObserver from '~/components/Common/IntersectionObserver.vue';

const { productsCount } = storeToRefs(useCartStore())

const appStore = useAppStore()
const cartStore = useCartStore()
const { user } = storeToRefs(useAuthStore())

function googleTranslateElementInit() {
  //@ts-ignore
  new google.translate.TranslateElement({}, 'google_translate_element')
}
 
const isSocialDrawerOpen = ref(false)

const visibilityChange = (e: any) => {
  isSocialDrawerOpen.value = e
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
      <IntersectionObserver @visibility-change="visibilityChange" />
      <slot></slot>
      <Footer></Footer>
    </div>
  </div>
  <Transition name="slide-fade">
    <div v-if="!isSocialDrawerOpen" class="fixed right-0 top-[30vh] z-50 flex flex-col items-end gap-3">
      <NuxtLink to="/pages/cart" class="w-10 h-10 relative flex justify-center items-center bg-white shadow-md border-orange-200 rounded-md">
        <icon class="w-8 h-8 text-primary" name="mdi:cart" />
        <small class="min-w-4 h-4 p-1 text-primary flex justify-center items-center absolute top-1 right-1 bg-white border border-primary rounded-full">{{ productsCount }}</small>
      </NuxtLink>
      <div class="flex flex-col gap-1 bg-white shadow-md border-orange-200 rounded-md p-1">
        <a class=" hover:scale-110 transition" target="_blank" title="Facebook" href="https://www.facebook.com/profile.php?id=61559661892435&mibextid=JRoKGi">
          <icon class="w-6 h-6" name="logos:facebook" />
        </a>
        <a class="hover:scale-110 transition relative" target="_blank" title="Facebook group"
          href="https://m.facebook.com/groups/1155393332352922/?ref=share&mibextid=NSMWBT">
          <icon class="w-4 h-4 absolute bottom-0 right-0" name="logos:facebook" />
          <icon class="w-6 h-6 text-primary" name="vaadin:group" />
        </a>
        <a class=" hover:scale-110 transition" target="_blank" title="Twitter" href="https://x.com/mectrons?t=JUrbwJfQO0B2xnkyBrbVmg&s=09">
          <icon class="w-6 h-6" name="logos:twitter" />
        </a>
        <a class=" hover:scale-110 transition" target="_blank" title="Instagram" href="https://www.instagram.com/mectrons1?igsh=MXJ1emF5M3VvNzR2Zg==">
          <icon class="w-6 h-6" name="skill-icons:instagram" />
        </a>
      </div>
    </div>
  </Transition>
</template>

<style>
#goog-gt-tt {
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

#goog-gt-tt {
  display: none !important;
}
</style>