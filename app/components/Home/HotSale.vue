<script setup lang="ts">
const { offerList } = storeToRefs(useAppStore())

</script>

<template>
    <div class="p-8 mt-3">
        <h1 class="flex gap-3 text-3xl font-bold items-center notranslate mb-3">
            <span>HOT Sale</span>
            <span class="w-28 h-2 bg-primary"></span>
        </h1>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="relative border h-[200px] overflow-hidden" v-for="(offer, index) in offerList"
                :key="`offfer-item-${offer.id}`">
                <div class="absolute inset-0">
                    <img class="h-full w-full object-cover" v-if="offer.image"
                        :src="useRuntimeConfig().public.imageUrl + '/' + offer.image.replaceAll('public', 'storage')"
                        alt="offer_image" />
                    <img class="h-full w-full object-cover" v-else src="assets/images/dummy-image.jpg" alt="Ads" />
                </div>
                <div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div class="text-2xl font-bold text-white text-stock">{{ offer.name }}</div>
                    <div class="text-sm hidden lg:inline-block font-medium text-stock text-white">
                        {{ new Date(offer.from).toLocaleString('en-BD', { dateStyle: 'medium' }) }} - {{ new Date(offer.to).toLocaleString('en-BD', { dateStyle: 'medium' }) }}</div>
                    <div class="text-3xl font-bold text-primary text-stock">{{ offer.amount }}% OFF</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-stock {
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000;
}
</style>