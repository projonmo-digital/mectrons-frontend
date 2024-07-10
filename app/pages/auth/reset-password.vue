<script setup>
import { onMounted, ref } from 'vue'
import { Modal, initFlowbite } from 'flowbite';

onMounted(() => {
    initFlowbite();
})


useSeoMeta({
  title: 'Reset Password - My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'image',
  twitterCard: 'image',
})

const toaster = useToasterStore();
const auth = useAuthStore();
const route = useRoute();
definePageMeta({
    middleware: ["guest"]
});

const form = reactive({
    password: null,
    password_confirmation: null,
    linkPeram: route.fullPath.split("?")[1],
})

const errors = ref([]);
const loadbtn = ref(false);
const success_msg = ref(null);

const handleSubmit = async() => {
    loadbtn.value = true;
    try{
        const data = await auth.resetPassword(form);
        loadbtn.value = false;
        success_msg.value = data.message;
        toaster.addSuccess(data.message);
    }catch(error){
        toaster.addWrong(error.data.message);
        errors.value = error.data.errors;
        loadbtn.value = false;
    }
}
</script>
<template>
    <div class="mx-auto w-full max-w-3xl my-4">
        <div class="flex gap-x-3 bg-white rounded shadow">
            <div class="mx-auto w-full max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <div>
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white text-center">Reset Password</h5>
                        <div class="flex justify-center items-center gap-x-3 text-gray-400 mt-2">
                            <hr class="border-gray-400 w-12">
                            <p class="text-center text-sm">&#10051;</p>
                            <hr class="border-gray-400 w-12">
                        </div>
                    </div>
                    <p class="mb-2 text-gray-500">
                        Enter your email address below and we’ll send you a link to reset your password
                    </p>
                    <div v-if="success_msg" class="p-4 my-4 text-sm text-green-800 text-center rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span class="font-medium">{{ success_msg }}</span>
                    </div>
                    <div>
                        <FormLabel for="password">New Password</FormLabel>
                        <FormInput type="password" name="password" id="password" placeholder="password" v-model="form.password"/>
                        <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password[0] }}</span>
                    </div>
                    <div>
                        <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                        <FormInput type="password" name="password_confirmation" id="password_confirmation" placeholder="password_confirmation" v-model="form.password_confirmation"/>
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
                            <span>Change Password</span>
                        </div>
                    </ButtonPrimary>
                    <div class="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
                        Please Try? <nuxt-link to="/auth/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</nuxt-link>
                    </div>
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