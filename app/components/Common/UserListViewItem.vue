<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
interface Props {
    modelValue: any,
    class?: string
}
const props = defineProps<Props>()
</script>
<template>
    <div class="flex items-center gap-3">
            <AvatarRoot class="bg-blackA3 inline-flex h-8 w-8 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="modelValue.profile_picture" alt="Colm Tuite" />
                <AvatarFallback class="text-grass11 leading-1 flex h-full w-full items-center justify-center bg-gray-300 text-white text-[15px] font-medium" :delay-ms="600">
                    {{ modelValue.name.split(' ').map((i: string) => i[0].toUpperCase()).join('') }}
                </AvatarFallback>
            </AvatarRoot>
        {{ modelValue.name }}
    </div>
</template>