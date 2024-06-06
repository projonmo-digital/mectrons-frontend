<script setup>
const sideBarData = [{
    icon: 'mdi:home',
    title: "Dashboard",
    link: '/customerPortal/dashboard',
},
{
    icon: 'fluent:cloud-checkmark-32-filled',
    title: "Purchansed History",
    link: '/customerPortal/history',
},
{
    icon: 'mdi:heart',
    title: "Wishlist",
    link: '/customerPortal/wishlist',
},
{
    icon: 'fluent:pen-16-filled',
    title: "Reviews",
    link: '/customerPortal/reviews',

},
{
    icon: 'mdi:message-bulleted',
    title: "Chats",
    link: '/customerPortal/chats',
},
{
    icon: 'fluent:settings-16-filled',
    title: "Settings",
    link: '/customerPortal/settings',
}
]

</script>

<template>
    <div class="w-[360px] p-4 flex flex-col gap-4 lg:border-r lg:h-[832px]">
        <div class="flex gap-2 justify-center flex-col text-center">
            <div>
                <Icon name="fluent:emoji-16-filled" class=" text-8xl rounded-full text-primary"></Icon>
                <p>Faruk Ahmed</p>
            </div>
        </div>
        <div class=" flex  flex-col gap-8 ">
            <nuxt-link :to="i.link" class=" w-full" v-for="i in sideBarData">
                <Button
                    class="hover:bg-primary w-full hover:text-white text-start  bg-white text-black flex justify-start gap-4 ">
                    <Icon :name="i.icon" class="text-primary hover:text-white text-2xl"></Icon>
                    {{ i.title }}

                </Button>
            </nuxt-link>
        </div>

    </div>
</template>