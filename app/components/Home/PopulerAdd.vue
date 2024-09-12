<script setup lang="ts">
import YoutubeViewer from "@/components/Common/YoutubeViewer.vue"
import type { IAdvertisement } from "~/types/advertisment";

const store = useUtils()
const homePageBottomLeft = await store.getAds<IAdvertisement>('Home Page - Bottom Left')
const homePageBottomRightUp = await store.getAds<IAdvertisement>('Home Page - Bottom Right Up')
const homePageBottomRightDown = await store.getAds<IAdvertisement>('Home Page - Bottom Right Down')

</script>

<template>
    <div class="container">
        <h1 class="text-2xl font-bold mb-5">Populer Ads</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
            <div>
                <YoutubeViewer v-if="homePageBottomLeft?.type === 'youtube'" :src="homePageBottomLeft?.url || ''" />
                <img v-else class="min-w-full min-h-full object-cover"
                    :src="useRuntimeConfig().public.imageUrl + '/' + homePageBottomLeft?.url.replaceAll('public', 'storage')"
                    alt="">
            </div>
            <div class="flex flex-col gap-3 lg:gap-5">
                <div>
                    <YoutubeViewer v-if="homePageBottomRightUp?.type === 'youtube'" :src="homePageBottomRightUp?.url || ''" />
                    <img v-else class="min-w-full min-h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + homePageBottomRightUp?.url.replaceAll('public', 'storage')"
                        alt="">
                </div>
                <div>
                    <YoutubeViewer v-if="homePageBottomRightDown?.type === 'youtube'" :src="homePageBottomRightDown?.url || ''" />
                    <img v-else class="min-w-full min-h-full object-cover"
                        :src="useRuntimeConfig().public.imageUrl + '/' + homePageBottomRightDown?.url.replaceAll('public', 'storage')"
                        alt="">
                </div>
            </div>
        </div>
    </div>
</template>