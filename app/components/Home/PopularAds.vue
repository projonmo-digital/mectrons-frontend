<script setup>
function getYouTubeEmbedUrl(url) {
    const parsedUrl = new URL(url);
    const videoId = parsedUrl.searchParams.get('v');
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        console.log('No video ID found in URL:', url);
        return null;
    }
}



const store = useUtils()
const bottomLeftAds = await store.getAds('Home Page - Bottom Left')
const bottomRightAdsUp = await store.getAds('Home Page - Bottom Right Up')
const bottomRightAdsDown = await store.getAds('Home Page - Bottom Right Down')
console.log(bottomRightAdsUp.value)

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1 class=" font-bold text-xl">Popular Ads</h1>
        <div class="w-full h-[580px] flex gap-8   ">
            <div class="border w-full h-full rounded o  ">
                <iframe v-if="bottomLeftAds.type === 'youtube'" width="100%" height="100%"
                    :src="getYouTubeEmbedUrl(bottomLeftAds.url)" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <img v-if="bottomLeftAds.type === 'image'" class="w-full h-full object-cover">
            </div>
            <div class="w-full flex h-full gap-4 flex-col">
                <div class="border w-full h-[50%]">
                    <iframe v-if="bottomRightAdsUp.type === 'youtube'" width="100%" height="100%"
                        :src="getYouTubeEmbedUrl(bottomRightAdsUp.url)" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <img v-if="bottomRightAdsUp.type === 'image'" class="w-full h-full object-cover">


                </div>
                <div class=" border w-full h-[50%] ">
                    <iframe v-if="bottomRightAdsUp.type === 'youtube'" width="100%" height="100%"
                        :src="getYouTubeEmbedUrl(bottomRightAdsDown.url)" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <img v-if="bottomRightAdsUp.type === 'image'" class="w-full h-full object-cover">

                </div>
            </div>
        </div>
    </div>
</template>