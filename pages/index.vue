<script setup>
useHead({
  title: 'Mectrons - Home',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})
</script>


<template>
    <div v-show="isLoading" class="w-full h-screen  flex justify-center items-center">
        <Icon name="fluent:spinner-ios-16-filled" class=" text-primary animate-spin text-8xl"></Icon>
    </div>


    <div v-if="!isLoading">
        <!-- ========== Start Category and Slider Section ========== -->
        <HomeCategorySlider></HomeCategorySlider>


        <!-- ========== Start Search and Ads Section ========== -->

        <HomeNewFilterZone></HomeNewFilterZone>

        <HomeNewHotSale></HomeNewHotSale>

        <!-- ========== Start Featured Products Section ========== -->
        <HomeFeaturedProducts></HomeFeaturedProducts>


        <!-- ========== Best Sale Section ========== -->
        <HomeBestSale></HomeBestSale>


        <!-- ========== Home Deals Month Section ========== -->
        <HomeDealsofMonth></HomeDealsofMonth>


        <!-- ========== Electronic Products Section ========== -->
        <HomeElectronicProducts></HomeElectronicProducts>


        <!-- ========== Home Brands Section ========== -->
        <HomeBrands></HomeBrands>
    </div>

</template>