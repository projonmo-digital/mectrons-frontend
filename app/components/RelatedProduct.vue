<script setup lang="ts">
import Slider from '~/components/Home/Pertials/Slider.vue'
const props = defineProps(['products'])

</script>


<template>
    <Slider :products="products" :loading="false" />
</template>