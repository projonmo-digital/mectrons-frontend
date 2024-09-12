<script setup lang="ts">
import { ref } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import logo_white from '~/assets/images/logo_white.svg'
import logo from '~/assets/images/logo.svg'
import MobileMenu from '@/components/Common/MobileMenu.vue'

const { categories, loading, local } = storeToRefs(useAppStore())
const appStore = useAppStore()

const { productsCount } = storeToRefs(useCartStore())

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getFileUrl } from '~/helper'

const auth = useAuthStore()
const router = useRouter()

const searchText = ref('')
const handelSearchSubmit = () => {
    navigateTo(`/search?search=${searchText.value}`)
}

const store = useAuthStore()
const loginToggleBtnFun = async (value: any) => {
    let button;
    if (value == 'sellerLogin') {
        button = document?.getElementById('sellerLoginButton');
    } else {
        button = document?.getElementById('userLoginButton');
    }
    button?.click();
}

const menu = computed(() => {
    return [
        {
            text: "Home",
            link: "/",
        },
        {
            text: categories.value[0]?.name,
            link: `/category/${categories.value[0]?.id}`,
            children: categories.value[0]?.children.map(i => ({ text: i.name, link: `/category/${i.id}` }))
        },
        {
            text: categories.value[1]?.name,
            link: `/category/${categories.value[1]?.id}`,
            children: categories.value[1]?.children.map(i => ({ text: i.name, link: `/category/${i.id}` }))
        },
        {
            text: categories.value[2]?.name,
            link: `/category/${categories.value[2]?.id}`,
            children: categories.value[2]?.children.map(i => ({ text: i.name, link: `/category/${i.id}` }))
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

const isMenuOpen = ref(false)

const openMobileMenu = () => {
    document.querySelector('#__nuxt')?.classList.add('disable-scroll')
    isMenuOpen.value = true
}
const closeMobileMenu = (event: any, force: boolean = false) => {
    if(['FONT', 'A', 'BUTTON'].includes(event.target.nodeName) || force){
        document.querySelector('#__nuxt')?.classList.remove('disable-scroll')
        isMenuOpen.value = false
    }
}

const onChange = (value: any) => {
    const element: any = document.querySelector(".goog-te-combo")
    if (element) {
        element.value = value;
        element.dispatchEvent(new Event("change"))
        appStore.setLocal(value)
    }
};

</script>
<template>
    <header class="bg-primary text-white">
        <div class="p-3">
            <!-- header top panel -->
            <div class="md:flex justify-between items-center notranslate">
                <div class="flex items-center gap-4 notranslate">
                    <NuxtLink class="hover:underline text-sm" :to="{ name: 'auth-login' }">
                        {{ 'Seller Login' }}
                    </NuxtLink>
                    <NuxtLink class="hover:underline text-sm" to="/pages/cart/search">
                        {{ 'Track Order' }}
                    </NuxtLink>
                    <NuxtLink v-if="auth.user" class="hover:underline text-sm" :to="`/${auth.user.type}/dashboard`">
                        {{ 'My Panel' }}
                    </NuxtLink>
                </div>
                <div class=" hidden md:flex gap-8">
                    <small class="hidden lg:inline-block">
                        <i class="fa-solid fa-location-dot me-2"></i>
                        House No- A7, Dog squid road, plot no-1/2, Kafrul, Mirpur -13, Dhaka.</small>
                    <small>
                        <i class="fa-solid fa-phone mr-2"></i>+880 170672751</small>
                </div>
            </div>
            <div class="p-0 md:p-5 max-w-[1244px] mx-auto">
                <div class="flex flex-wrap items-center justify-between gap-5 my-3">
                    <!-- logo -->
                    <div>
                        <nuxt-link to="/" class="flex items-center w-[160px] sm:[200px]">
                            <img :src="logo_white" alt="">
                        </nuxt-link>
                    </div>
                    <div class="flex-1 hidden sm:block">
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
                        <div class="hidden md:inline-block">
                            <DropdownMenu v-if="!auth.authenticated" >
                                <DropdownMenuTrigger @click="auth.errors = {}">
                                    <span class="text-sm hover:underline notranslate">
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
                                    <span class="text-sm hover:underline notranslate">
                                        <i class="fa-solid fa-user me-2 text-2xl sm:text-sm"></i>
                                        <span class="hidden sm:inline-block notranslate">{{ auth.user?.name }}</span>
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="w-56">
                                    <div class="flex justify-center items-center p-5">
                                        <AvatarRoot
                                            class="notranslate inline-flex h-[32px] bg-orange-100 w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                            <AvatarImage class="h-full w-full rounded-[inherit] object-cover"
                                                :src="auth.user?.profile_picture ? getFileUrl(auth.user?.profile_picture) : ''"
                                                alt="Colm Tuite" />
                                            <AvatarFallback class="flex h-full w-full items-center justify-center p-2 font-bold text-sm text-primary"
                                                :delay-ms="600">
                                                AV
                                            </AvatarFallback>
                                        </AvatarRoot>
                                    </div>
                                    <DropdownMenuItem class="justify-center cursor-pointer"
                                        @select="router.push(`/${auth.user?.type}/dashboard`)">
                                        <div class="flex items-center gap-3 text-gray-700">
                                            <!-- <icon class="text-2xl" name="ion:log-in-outline" /> -->
                                            <span>Go inside Your Panel</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem @click="auth.logUserOut()" class="text-center cursor-pointer">
                                        <span class="text-red-500 hover:text-red-600 w-full text-lg">Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <button class="text-sm hover:underline hidden md:inline-block notranslate"
                            @click="onChange(local === 'bn' ? 'en' : 'bn')">{{ local === 'bn' ? 'EN' : 'BN' }}</button>
                        <nuxt-link to="/pages/cart"
                            class="relative inline-flex items-center p-3 text-sm font-medium text-center">
                            <i class="fa-solid fa-cart-shopping text-2xl sm:text-sm"></i>
                            <div
                                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                                {{ productsCount }}
                            </div>
                        </nuxt-link>
                        <div class="inline-block md:hidden">
                            <button @click="openMobileMenu">
                                <span class="text-sm hover:underline ml-3">
                                    <i class="fa-solid fa-bars me-2 text-2xl sm:text-sm"></i>
                                </span>
                            </button>
                            <Transition name="slide-fade">
                                <div v-if="isMenuOpen" class="fixed inset-0 bg-white text-gray-700 z-50" @click="closeMobileMenu">
                                    <div class="flex items-center justify-between z-[900] p-3">
                                        <nuxt-link to="/" class="flex items-center w-[160px] sm:[200px]">
                                            <img :src="logo" alt="">
                                        </nuxt-link>
                                        <button class="w-12 h-12 p-0 text-primary rounded-full hover:text-orange-500" @click="closeMobileMenu($event, true)">
                                            <icon class="w-full h-full" name="material-symbols:close" />
                                        </button>
                                    </div>
                                    <div v-if="auth.authenticated" class="px-3">
                                        <div class="flex items-center gap-3">
                                            <AvatarRoot
                                                class="notranslate inline-flex h-[32px] bg-orange-100 w-[32px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                                                <AvatarImage class="h-full w-full rounded-[inherit] object-cover"
                                                    :src="auth.user?.profile_picture ? getFileUrl(auth.user?.profile_picture) : ''"
                                                    alt="Colm Tuite" />
                                                <AvatarFallback class="flex h-full w-full items-center justify-center p-2 font-bold text-sm text-primary"
                                                    :delay-ms="600">
                                                    AV
                                                </AvatarFallback>
                                            </AvatarRoot>
                                            <span class="notranslate text-gray-500 text-2xl">{{ auth.user?.name }}</span>
                                        </div>
                                        <button @click="auth.logUserOut()"
                                        class="bg-red-500 text-white hover:bg-red-600 rounded-full px-4 py-1 text-sm mt-3 shadow-lg">
                                            Logout
                                        </button>
                                    </div>
                                    <div class="px-3" v-else>
                                        <nuxt-link to="/auth/login"
                                        class="bg-primary text-white hover:bg-orange-500 rounded-full px-4 py-1 text-sm mt-3 shadow-lg">
                                            Login
                                        </nuxt-link>
                                    </div>
                                    <hr class="mt-3">
                                    <div class="overflow-scroll p-3" :style="{ height: `calc(100vh - ${ auth.authenticated ? 157 : 109}px)`}">
                                        <ul>
                                            <li v-for="(item, index) in categories" :key="`mobile-category-index-${index}-${item.id}`">
                                                <MobileMenu :item="item" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
                <div class="flex-1 block sm:hidden">
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
                <div class="hidden md:flex items-center justify-center gap-3 mt-5">
                    <template v-if="!loading">
                        <template v-for="(item, index) in menu" :key="`menu-item-${index}`">
                            <div class="dropdown inline-block relative z-40">
                                <nuxt-link :to="item.link" class="text-white font-bold inline-flex items-center">
                                    <span class="mr-1">{{ item.text }}</span>
                                    <svg v-if="item.children" class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </nuxt-link>
                                <ul v-if="item.children"
                                    class="dropdown-menu absolute hidden text-gray-700 pt-1 shadow-lg">
                                    <li class="first:rounded-t-lg last:rounded-b-lg overflow-hidden"
                                        v-for="(sub, Sindex) in item.children || []" :key="`menu-${index}-${Sindex}`">
                                        <nuxt-link
                                            class="bg-white text-sm hover:bg-primary text-primary hover:text-white py-2 px-4 block whitespace-no-wrap w-[300px]"
                                            :to="sub.link">{{ sub.text }}</nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </template>
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

.disable-scroll {
    margin: 0;
    height: 100vh;
    overflow: hidden
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  /* opacity: 0; */
}
</style>