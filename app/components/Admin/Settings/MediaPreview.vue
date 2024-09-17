<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import { getFileUrl } from '~/helper';
interface Props {
    modelValue: any,
    class: string
}

const mediaType = (url: string) => {
    if(url.includes('/gallery/image/')) return 'image'
    if(url.includes('/gallery/video/')) return 'video'
}

const props = defineProps<Props>()
</script>
<template>
    <div class="w-[100px]">
        <div v-if="mediaType(modelValue.url) === 'image'">
            <img :src="modelValue.url ? getFileUrl(modelValue.url) : ''" />
        </div>
        <div v-if="mediaType(modelValue.url) === 'video'">
            <video :src="modelValue.url ? getFileUrl(modelValue.url) : ''"></video>
        </div>
    </div>
</template>