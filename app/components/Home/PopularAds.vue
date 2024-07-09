<script setup>
function getQueryVariable(variable = 'v', url) {
    var query = url.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
const url = new URL('https://www.youtube.com/watch?v=vP9QpcqzSns')
console.log(getQueryVariable('v', url));
getCetagories()

const store = useUtils()
const upperLeftAds = await store.getAds('Home Page - Upper Left')
const upperRightAds = await store.getAds('Home Page - Upper Right')


</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <h1 class=" font-bold text-xl">Popular Ads</h1>
        <div class="w-full h-[580px] flex gap-8   ">
            <div class="border w-full h-full  ">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/vP9QpcqzSns"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="w-full flex h-full gap-4 flex-col">
                <div class="border w-full h-[50%]">

                </div>
                <div class=" border w-full h-[50%] ">

                </div>
            </div>
        </div>
    </div>
</template>