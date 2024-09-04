<script setup lang="ts">

interface Props {
    loaderColor?: string
}

const props = withDefaults(defineProps<Props>(), { loaderColor: '#f1f1f1' })

</script>

<template>
    <div class="skeleton" :style="{ '--loader-color': loaderColor }">
        <slot></slot>
    </div>
</template>

<style lang="scss">
%loading-skeleton {
    color: transparent !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    // background-color: var(--default-border-color) !important;
    // border-color: var(--default-border-color) !important;
    background-color: var(--loader-color) !important;
    border-color: var(--loader-color) !important;

    &::placeholder {
        color: transparent !important;
    }
}
@keyframes loading-skeleton {
    from {
        opacity: .4;
    }
    to {
        opacity: 1;
    }
}
.skeleton {
    pointer-events: none;
    animation: loading-skeleton 1s infinite alternate;

    img {
        filter: grayscale(100) contrast(0%) brightness(1.8);
        background-color: var(--loader-color) !important;
    }
    label, h1, h2, h3, h4, h5, h6, span, small, button, a,
    p, li,
    .h1, .h2, .h3, .h4, .h5, .h6, .label {
        @extend %loading-skeleton;
    }
}
</style>
