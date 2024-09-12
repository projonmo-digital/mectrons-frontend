<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SafetyNote from '~/components/Common/SafetyNote.vue';

useSeoMeta({
    title: 'Login - Mectrons',
})

const messages = ref<string[]>([])

const auth = useAuthStore();
definePageMeta({
})
const form = reactive({
    email: '',
    password: '',
})

const handleSubmit = async () => {
    auth.authenticateUser(form)
}

const passHideShow = ref(false);

onMounted(() => {
    if (auth.user && auth.user?.type !== 'seller') {
        messages.value.push('To access the seller panel, please log out of your current session first, then log in again as a seller to enter the seller panel.')
    }
})
</script>

<template>
    <div class="mx-auto w-full max-w-[800px] p-3 lg:px-8">
        <div v-for="(message, index) in messages" :key="index"
            class="bg-orange-50 text-primary text-sm p-3 mb-5 rounded-xl border border-primary">
            {{ message }}
        </div>
        <div class="grid lg:grid-cols-2 gap-3">
            <div>
                <div v-if="!auth.user" class="flex h-full items-center">
                    <div
                        class="bg-transparent w-full lg:bg-gray-100 border border-transparent lg:border-gray-200 p-5 rounded-lg lg:shadow">
                        <form class="space-y-6" @submit.prevent="handleSubmit">
                            <div>
                                <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">Sign In</h5>
                                <div class="flex justify-center items-center gap-x-3 text-gray-400 mt-2">
                                    <hr class="border-gray-400 w-12">
                                    <p class="text-center text-sm">&#10051;</p>
                                    <hr class="border-gray-400 w-12">
                                </div>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" name="email" placeholder="name@gmail.com" class="w-full border p-2"
                                    v-model="form.email" />
                                <span v-if="Object.keys(auth.errors).includes('email')" class="text-sm text-red-500">{{
                                    auth.errors.email[0] }}</span>
                            </div>
                            <div>
                                <label for="password">Password</label>
                                <div class="relative">
                                    <input tabindex="0" :type="passHideShow ? 'text' : 'password'"
                                        class="w-full border p-2" name="password" id="password" placeholder="password"
                                        v-model="form.password" />
                                    <icon class="w-6 h-6 absolute top-2 right-2 text-gray-500 cursor-pointer"
                                        @click="passHideShow = !passHideShow"
                                        :name="passHideShow ? 'mdi:eye' : 'mdi:eye-off'" />
                                </div>
                                <span v-if="Object.keys(auth.errors).includes('password')"
                                    class="text-sm text-red-500">{{
                                        auth.errors.password[0] }}</span>
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input type="checkbox" value=""
                                            class="accent-primary w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
                                    </div>
                                    <label class="ml-2">Remember me</label>
                                </div>
                                <nuxt-link to="/auth/forget-password"
                                    class="ms-auto text-sm text-primary hover:underline">Lost
                                    Password?</nuxt-link>
                            </div>

                            <ButtonPrimary type="submit" :disabled="auth.loading">
                                <div class="flex items-center justify-center gap-x-2">
                                    <div role="status" v-if="auth.loading">
                                        <svg aria-hidden="true"
                                            class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor" />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <span>Login</span>
                                </div>
                            </ButtonPrimary>
                            <div class="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
                                Not registered? <nuxt-link to="/auth/register"
                                    class="text-primary hover:underline">Create account</nuxt-link>
                            </div>

                            <!-- <SocialLogin/> -->
                        </form>
                    </div>
                </div>
                <div v-else>
                    <p class="text-2xl font-medium text-gray-500">Already logged in as a {{ auth.user.type }}.</p>
                    <NuxtLink v-if="auth.user" class="text-primary hover:underline text-sm"
                        :to="`/${auth.user?.type}/dashboard`">
                        {{ 'Go to your Panel' }}
                    </NuxtLink>
                    <hr class="my-5">
                    <button @click="auth.logUserOut()"
                        class="cursor-pointer bg-[#ff0000cf] hover:bg-[#f00] px-5 py-2 rounded-lg text-white">Logout
                    </button>
                </div>
            </div>
            <div class="hidden lg:block">
                <SafetyNote />
            </div>
        </div>
    </div>
</template>