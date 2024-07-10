<script setup lang="ts">
import { watch } from "vue"
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "radix-vue"

interface Props {
    title: string
}
const props = defineProps<Props>()
const model = defineModel()
const emit = defineEmits(['open', 'close'])

</script>

<template>
    <DialogRoot>
        <DialogTrigger>
            <slot name="btn"></slot>
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="bg-white/50 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
            <DialogContent
                class="border shadow-lg data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none z-[100]">
                <DialogTitle class="text-2xl font-semibold">
                    {{ title }}
                </DialogTitle>
                <div>
                    <slot name="content"></slot>
                </div>
                <DialogClose
                    class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close">
                    <Icon name="lucide:x" />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
