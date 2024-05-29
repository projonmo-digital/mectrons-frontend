<script setup>

</script>

<template>
    <div class="grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  place-items-center gap-8">
        <ProductCardMe v-for="(_, index) in 9" :key="index">


        </ProductCardMe>



    </div>
</template>