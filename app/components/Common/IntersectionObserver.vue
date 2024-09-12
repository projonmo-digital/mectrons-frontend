<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emits = defineEmits(['visibility-change'])

const observer = ref<any>(null)
const observedElement = ref<any>(null)
const isVisible = ref(false)

const createObserver = () => {
    if (!('IntersectionObserver' in window)) {
        console.warn('Intersection Observer is not supported by this browser.');
        return;
    }

    observer.value = new IntersectionObserver(
        ([entry]) => {
            isVisible.value = entry.isIntersecting;
            emits('visibility-change', isVisible.value);
        },
        {
            root: null, // Use the viewport as the container
            rootMargin: '0px',
            threshold: 0.1, // Trigger when 10% of the element is visible
        }
    );
    observer.value.observe(observedElement.value);
}

onMounted(() => {
    createObserver()
})

onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
})
</script>

<template>
    <div ref="observedElement" :class="{ 'is-visible': isVisible }">
        <slot></slot>
    </div>
</template>


<style scoped>
.is-visible {
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
}
</style>