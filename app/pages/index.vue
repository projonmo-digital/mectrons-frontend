<script setup>
import ProductsByCategories from '~/components/Common/ProductsByCategories.vue';
const { categories, loading } = storeToRefs(useAppStore())

useHead({
  title: 'Home - Mectrons',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})
</script>

<template>
    <HomeCategorySlider></HomeCategorySlider>
    <HomeFilterZone></HomeFilterZone>
    <HomeHotSale></HomeHotSale>
    <ProductsByCategories :categories="categories" :params="{ marker: ['featured'] }" title="Featured products"></ProductsByCategories>
    <HomeBestSale></HomeBestSale>
    <HomeDealsofMonth></HomeDealsofMonth>
    <ProductsByCategories :categories="(categories[1]?.children || [])" :params="{ marker: ['electric'] }" title="Electronics Products"></ProductsByCategories>
    <HomePopulerAdd></HomePopulerAdd>
    <HomeBrands></HomeBrands>
</template>