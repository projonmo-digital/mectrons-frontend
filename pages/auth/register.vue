<script setup>
import { onMounted, ref } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})


useSeoMeta({
  title: 'Register - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const toaster = useToasterStore();
const auth = useAuthStore();
definePageMeta({
    middleware: ["guest"]
})

const form = reactive({
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
})

const errors = ref([]);
const loadbtn = ref(false);

const handleSubmit = async() => {
    loadbtn.value = true;
    try{
        await auth.register(form);
        loadbtn.value = false;
    }catch(error){
        toaster.addWrong(error.data.message);
        errors.value = error.data.errors;
        loadbtn.value = false;
    }
}


const passHideShow = ref(false);
const passHideShow1 = ref(false);
</script>
<template>
    <div class="mx-auto w-full max-w-3xl my-4">
        <div class="flex gap-x-3 bg-white rounded shadow">
            <div class="mx-auto w-full max-w-sm p-4 bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">Registation</h5>
                        <div class="flex justify-center items-center gap-x-3 text-gray-400 mt-2">
                            <hr class="border-gray-400 w-12">
                            <p class="text-center text-sm">&#10051;</p>
                            <hr class="border-gray-400 w-12">
                        </div>
                    </div>
                    <div>
                        <FormLabel for="name">Name</FormLabel>
                        <FormInput type="name" name="name" id="name" placeholder="Your name" v-model="form.name"/>
                        <span v-if="errors.name" class="text-sm text-red-500">{{ errors.name[0] }}</span>
                    </div>
                    <div>
                        <FormLabel for="email">Email</FormLabel>
                        <FormInput type="email" name="email" id="email" placeholder="name@gmail.com" v-model="form.email"/>
                        <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</span>
                    </div>
                    <div>
                        <FormLabel for="password">Your Password</FormLabel>
                        <div class="relative">
                            <FormInput :type="passHideShow ? 'text' : 'password'" class="pe-7" name="password" id="password" placeholder="password" v-model="form.password"/>
                            <div v-if="passHideShow" @click="passHideShow = false" class="absolute inset-y-0 end-2 flex items-center ps-3 cursor-default">
                                <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </div>
                            <div v-else @click="passHideShow = true" class="absolute inset-y-0 end-2 flex items-center ps-3 cursor-default">
                                <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </div>
                        </div>
                        <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password[0] }}</span>
                    </div>
                    <div>
                        <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                        <div class="relative">
                            <FormInput :type="passHideShow1 ? 'text' : 'password'" class="pe-7" name="password_confirmation" id="password_confirmation" placeholder="password_confirmation" v-model="form.password_confirmation"/>
                            <div v-if="passHideShow1" @click="passHideShow1 = false" class="absolute inset-y-0 end-2 flex items-center ps-3 cursor-default">
                                <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </div>
                            <div v-else @click="passHideShow1 = true" class="absolute inset-y-0 end-2 flex items-center ps-3 cursor-default">
                                <svg class="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </div>
                        </div>
                        <span v-if="errors.password_confirmation" class="text-sm text-red-500">{{ errors.password_confirmation[0] }}</span>
                    </div>
                    <ButtonPrimary type="submit">
                        <div class="flex items-center justify-center gap-x-2">
                            <div role="status" v-if="loadbtn">
                                <svg aria-hidden="true" class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                            <span>Register</span>
                        </div>
                    </ButtonPrimary>
                    <div class="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
                        Already have an account? <nuxt-link to="/auth/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</nuxt-link>
                    </div>

                    <!-- <SocialLogin/> -->
                </form>
            </div>

            <div class="mx-auto w-full max-w-sm ">
                <div class="flex flex-col gap-x-5 px-4 py-3">
                    <img class="w-60 mx-auto mb-6" src="assets/images/auth/auth.png" alt="Auth Image"/>
                    <div class="shadow-md p-4 rounded-lg bg-gray-100">
                        <h4 class="text-md font-semibold mb-2">Stay Safe</h4>
                        <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700">
                        <p class="mb-2 text-sm leading-6 text-gray-500">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <p class="mb-2 text-sm leading-6 text-gray-500">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>