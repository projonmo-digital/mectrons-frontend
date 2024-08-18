<script setup lang="ts">
import logo from '~/assets/images/logo.svg'
const route = useRoute()

interface ISidebarItem {
    header: string
    icon: string
    url: string
}

type TSidebar = ISidebarItem []

const sidebarList: TSidebar = [
    {
        header: 'Dashboard',
        icon: "eva:home-outline",
        url: '/user/dashboard'
    },
    {
        header: 'Purchased History',
        icon: "eva:inbox-outline",
        url: '/user/purchased-history'
    },
    {
        header: "Wishlist",
        icon: "eva:shopping-bag-outline",
        url: '/user/wishlist'
    },
    {
        header: "Settings",
        icon: "mdi:tools",
        url: '/user/settings'
    }
]

</script>


<template>
    <div class="w-full min-w-[380px] max-w-[630px] p-6 rounded-lg min-h-[981px] shadow-xl border bg-gradient-to-t from-primary to-white">
        <div class="w-full flex justify-center my-5">
            <img :src="logo" alt="">
        </div>

        <!-- <div class="my-8 flex items-center justify-center">
            <img :src="''" class="w-20 h-20 rounded-full" alt="">
        </div> -->
        
        <div class="w-full flex justify-center">
            <ul class="w-full flex flex-col gap-3">
                <li v-for="(menu, index) in sidebarList" :key="`item-${menu}`">
                    <NuxtLink :to="menu.url" class="flex gap-3 items-center py-3 px-5 rounded-lg text-primary bg-gray-300 hover:bg-primary hover:text-white" :class="{ 'text-white bg-primary' : route.path === menu.url}">        
                        <Icon :name="menu.icon"></Icon>
                        {{ menu.header }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>