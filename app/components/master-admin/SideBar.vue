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
        url: '/admin/dashboard'
    },
    {
        header: 'Products',
        icon: "eva:inbox-outline",
        url: '/admin/product'
    },
    {
        header: "Categories",
        icon: "eva:shopping-bag-outline",
        url: '/admin/categories'
    },
    {
        header: "Order",
        icon: "eva:shopping-bag-outline",
        url: '/admin/order'
    },
    {
        header: "Customer",
        icon: 'eva:people-outline',
        url: '/admin/customer'
    },
    {
        header: "Seller",
        icon: 'eva:people-outline',
        url: '/admin/seller'
    },
    {
        header: "Report",
        icon: 'eva:people-outline',
        url: '/admin/report'
    },
    {
        header: "Offer",
        icon: "eva:gift-outline",
        url: '/admin/offer'
    },
    {
        header: "Coupon",
        icon: "eva:gift-outline",
        url: '/admin/Coupon'
    },
    {
        header: "Advertisement",
        icon: 'eva:people-outline',
        url: '/admin/advertisement'
    },
    {
        header: "Withdraw",
        icon: 'eva:people-outline',
        url: '/admin/withdraw'
    },
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