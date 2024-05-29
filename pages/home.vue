<script setup>
import sideBar from "../components/HomeNew/sideBar.vue";
import caro from "../components/HomeNew/caro.vue";
import CardCollection from "~/components/HomeNew/CardCollection.vue";



</script>

<template>
    <div class="w-full flex gap-8  flex-col">
        <div class="flex w-full">
            <side-bar></side-bar>
            <caro></caro>


        </div>
        <div class="w-full">
            <HomeNewFilterZone></HomeNewFilterZone>

        </div>
        <div class="w-">
            <HomeNewHotSale></HomeNewHotSale>
        </div>

        <div class=" w-full flex justify-center">
            <HomeNewFeaturedProduct></HomeNewFeaturedProduct>
        </div>
        <div>
            <HomeBrands></HomeBrands>
        </div>
    </div>
</template>