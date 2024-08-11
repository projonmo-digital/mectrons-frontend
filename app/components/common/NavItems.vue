<script setup lang="ts">
import NavItems from './NavItems.vue'

const props = defineProps(['items'])

</script>

<template>
    <ul>
        <li v-for="(item, index) in items" :key="`category-index-${index}-${item.id}`">
            <NuxtLink :to="`/category/${item.id}`">{{ item.name }}</NuxtLink>
            <NavItems v-if="item.children.length" :items="item.children" />
        </li>
    </ul>
</template>

<style lang="scss">
.nav-side-menu ul {
    @apply flex flex-col list-none w-full z-50 gap-1 justify-center;
}

.nav-side-menu ul li {
    @apply bg-white relative text-sm text-gray-700 rounded-lg;
}

.nav-side-menu ul li:hover {
    @apply bg-primary text-white;
}

.nav-side-menu ul ul {
    @apply bg-white text-gray-700 hidden absolute rounded-xl;
}

.nav-side-menu>ul {
    @apply flex;
}

.nav-side-menu>ul>li ul {
    @apply left-full top-0;
}

.nav-side-menu>ul>li ul ul {
    @apply left-full top-0;
}

.nav-side-menu>ul>li:hover>ul,
.nav-side-menu>ul>li li:hover>ul {
    display: inherit;
}

.nav-side-menu a {
    @apply no-underline p-2 flex items-center;
}

.nav-side-menu a:not(:only-child) {
    @apply p-2 flex items-center;
}

.nav-side-menu a:not(:only-child)::after {
    @apply absolute right-2;
    content: ">";
}
</style>