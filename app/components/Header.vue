<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'

import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import { Button } from '@/components/ui/button'
import logo_white from '~/assets/images/logo_white.svg'

const { categories, local } = storeToRefs(useAppStore())
const appStore = useAppStore()

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const auth = useAuthStore()
const router = useRouter()

const cart = useCartStore()

onMounted(() => {
    console.log(cart.products)
})

const searchText = ref('')
const handelSearchSubmit = () => {
    navigateTo(`/search?search=${searchText.value}`)
}

const store = useAuthStore()
const loginToggleBtnFun = async (value) => {
    let button;
    if (value == 'sellerLogin') {
        button = document?.getElementById('sellerLoginButton');
    } else {
        button = document?.getElementById('userLoginButton');
    }
    button.click();
}

const menu = computed(() => {
    return [
        {
            text: "Home",
            link: "/",
        },
        {
            text: "Automobile",
            link: "#",
            // children: categories.value.map(i => ({ text: i.name, link: `/category/${i.id}` }))
            children: categories.value.filter(c => [1,24].includes(c.id)).map(c => c.children).flat(Infinity).map(i => ({ text: i.name, link: `/category/${i.id}` }))
        },
        {
            text: "Electronics",
            link: "#",
            children: categories.value.filter(c => [71,104].includes(c.id)).map(c => c.children).flat(Infinity).map(i => ({ text: i.name, link: `/category/${i.id}` }))
        },
        {
            text: "Service",
            link: "/pages/services"
        },
        {
            text: "About Us",
            link: "/pages/about-us"
        },
        {
            text: "Contact Us",
            link: "/pages/contact-us"
        }
    ]
})

const onChange = (value) => {
    const element = document.querySelector(".goog-te-combo")
    element.value = value;
    element.dispatchEvent(new Event("change"))
    appStore.setLocal(value)
};

</script>
<template>
    <header class="bg-primary text-white">
        <div class="p-3">
            <!-- header top panel -->
            <div class="hidden sm:flex justify-between items-center px-3">
                <div class="flex items-center gap-4 notranslate">
                    <NuxtLink class="hover:underline text-sm" :to="{ name: 'auth-login' }">
                        {{ 'Seller Login' }}
                    </NuxtLink>
                    <NuxtLink class="hover:underline text-sm" :to="{ name: 'auth-login' }">
                        {{ 'Track Order' }}
                    </NuxtLink>
                </div>
                <div class="flex gap-8">
                    <small class="hidden lg:inline-block">
                        <i class="fa-solid fa-location-dot me-2"></i>
                        House No- A7, Dog squid road, plot no-1/2, Kafrul, Mirpur -13, Dhaka.</small>
                    <small>
                        <i class="fa-solid fa-phone mr-2"></i>+880 170672751</small>
                </div>
            </div>
            <div class="px-4 py-4  max-w-[1244px] mx-auto">
                <div class="flex flex-wrap items-center justify-between gap-5 my-3">
                    <!-- logo -->
                    <div>
                        <nuxt-link to="/" class="flex items-center w-[200px]">
                            <img :src="logo_white" alt="">
                        </nuxt-link>
                    </div>
                    <div class="flex-1 hidden md:block">
                        <form class="w-full flex rounded-lg bg-white" @submit.prevent="handelSearchSubmit">
                            <input v-model="searchText" type="search" class="w-full p-2 rounded-s-lg text-primary"
                                placeholder="Search all parts here" required />
                            <button type="submit" class="bg-primary bg-opacity-80 px-4 hover:bg-opacity-90">
                                <span class="">
                                    <Icon name="fa:search" class="text-white text-xl"></Icon>
                                </span>
                            </button>
                        </form>
                    </div>

                    <div class="flex items-center gap-1 md:gap-6">
                        <DropdownMenu v-if="!auth.authenticated">
                            <DropdownMenuTrigger @click="auth.errors = {}">
                                <span class="text-sm hover:underline">
                                    <i class="fa-solid fa-user me-2 text-2xl sm:text-sm"></i><span
                                        class="hidden sm:inline-block">Login</span>
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-100 p-0">
                                <LoginForm @loginToggleBtn="loginToggleBtnFun($event)">
                                </LoginForm>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu v-else>
                            <DropdownMenuTrigger>
                                <span class="text-sm hover:underline">
                                    <i class="fa-solid fa-user me-2 text-2xl sm:text-sm"></i>
                                    <span class="hidden sm:inline-block notranslate">{{ auth.user?.name }}</span>
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-56">
                                <div class="flex justify-center items-center p-5">
                                    <AvatarRoot
                                        class="inline-flex h-[48px] w-[48px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                        <AvatarImage class="h-full w-full rounded-[inherit] object-cover"
                                            :src="auth.user?.profile_picture" alt="Colm Tuite" />
                                        <AvatarFallback class="flex h-full w-full items-center justify-center"
                                            :delay-ms="600">
                                            AV
                                        </AvatarFallback>
                                    </AvatarRoot>
                                </div>
                                <DropdownMenuItem class="justify-center cursor-pointer font-bold"
                                    @select="router.push(`/${auth.user.role}/dashboard`)">Go To Your Panel
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-red-500 hover:text-red-600" @click="auth.logUserOut()">
                                    <Button class="w-full">Logout</Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button class="text-sm hover:underline hidden sm:inline-block notranslate"
                            @click="onChange(local === 'bn' ? 'en': 'bn')">{{ local === 'bn' ? 'EN' : 'BN' }}</button>
                        <nuxt-link to="/cart"
                            class="relative inline-flex items-center p-3 text-sm font-medium text-center">
                            <i class="fa-solid fa-cart-shopping text-2xl sm:text-sm"></i>
                            <span class="sr-only">Notifications</span>
                            <div
                                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                {{ cart.carts?.quantity > 0 ? cart.carts?.quantity : 0 }}
                            </div>
                        </nuxt-link>
                        <div class="inline-block sm:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <span class="text-sm hover:underline ml-3">
                                        <i class="fa-solid fa-bars me-2 text-2xl sm:text-sm"></i>
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-[100px] p-0">
                                    <nuxt-link v-for="i in items" :to="i.link" class=" block p-2">{{ i.text
                                        }}</nuxt-link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-3 mt-5">
                    <template v-for="(item, index) in menu" :key="`menu-item-${index}`">
                        <div class="dropdown inline-block relative z-40">
                            <NuxtLink :to="item.link" class="text-white font-bold inline-flex items-center">
                                <span class="mr-1">{{ item.text }}</span>
                                <svg v-if="item.children" class="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </NuxtLink>
                            <ul v-if="item.children" class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow-lg">
                                <li class="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
                                    v-for="(sub, Sindex) in item.children || []" :key="`menu-${index}-${Sindex}`">
                                    <NuxtLink
                                        class="bg-white text-sm hover:bg-primary text-primary hover:text-white py-2 px-4 block whitespace-no-wrap w-[300px]"
                                        :to="sub.link">{{ sub.text }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
.dropdown:hover .dropdown-menu {
    display: block;
}
</style>