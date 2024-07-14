<script setup>
import FeaturedProducts from '~/components/Home/FeatureProducts/Products.vue';

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
    <HomeNewHotSale></HomeNewHotSale>
    <!-- <FeaturedProducts></FeaturedProducts> -->
    <!-- <HomeBestSale></HomeBestSale> -->
    <!-- <HomeDealsofMonth></HomeDealsofMonth> -->
    <!-- <HomeElectronicProducts></HomeElectronicProducts> -->
    <!-- <HomeBrands></HomeBrands> -->
</template>