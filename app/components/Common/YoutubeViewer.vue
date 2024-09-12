<script lang="ts" setup>
interface Props {
    src: string
}
const props = defineProps<Props>()

const youtube_parser = (url: string): string | boolean => {
    let VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    let match = url.match(VID_REGEX)
    return match ? match[1] : ''
}
</script>
<template>
    <iframe width="100%" height="100%"
        :src="`https://www.youtube-nocookie.com/embed/${youtube_parser(src)}?autoplay=1&mute=1&controls=0&enablejsapi=1&clipboard-write=0`"
        title="YouTube video player" frameborder="0"
        allow="autoplay;"
        referrerpolicy="strict-origin-when-cross-origin"></iframe>
</template>