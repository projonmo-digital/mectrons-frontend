<script setup lang="ts">
import { ref } from 'vue'
const loading = ref<boolean>(true)
import { useAlert } from '@/composables/sweetalert'
const alert = useAlert()

const submit = async(event: any) => {    
    const formData = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        message: event.target.message.value,
    }

    try {
        loading.value = true
        const response = await $fetch<any>(
            `${useRuntimeConfig().public.baseUrl}/contact`,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: formData,
            }
        );
        alert({ title: response.message })
    } catch (error) {
        const err = error as any;
        if (err.response._data) {
        }
    } finally {
        loading.value = false;
    }
}

</script>

<template>
    <div class="p-5 lg:p-8">
        <div class="max-w-screen-2xl block h-full mx-auto">
            <h1 class="font-bold text-2xl text-primary mb-4 mt-3">Contact Us</h1>
            <hr class="my-5">
            <div class="grid md:grid-cols-8 gap-5">
                <aside class="w-full bg-primary/20 p-5 rounded-xl col-span-1 md:col-span-3 lg:col-span-2">
                    <h4 class="text-lg font-bold mb-3">Get in Touch</h4>
                    <p class="text-sm font-medium text-gray-700">
                        The Alumalite Big Step Side Bars install in minutes, providing great looks, convenience
                        and safety for your vehicle. The Alumalite Big Step Side Bars install in minutes,
                        providing great looks, convenience and safety for your vehicle.
                    </p>
                    <h1 class='text-lg font-bold mt-3'>Office Location</h1>
                    <p class="text-sm font-medium text-gray-700">
                        House No- A7, Dog Squid Road, Plot No-1/2, Kafrul, Mirpur -13, Dhaka.
                    </p>
                    <h1 class='text-lg font-bold mt-3'>Store Location</h1>
                    <p class="text-sm font-medium text-gray-700">
                        House No- A7, Dog Squid Road, Plot No-1/2, Kafrul, Mirpur -13, Dhaka.
                    </p>
                    <div class="mt-6">
                        <ul class="">
                            <li class="pb-4">
                                <div class="flex items-center gap-x-2">
                                    <svg class="w-4 h-4 text-primary dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                                    </svg>
                                    <a class="text-sm text-primary hover:underline" href="tel:+880170672751"> +880 1706 727 51</a>
                                </div>
                            </li>
                            <li class="pb-4">
                                <div class="flex items-center gap-x-2">
                                    <svg class="w-4 h-4 text-primary dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                        <path
                                            d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                                    </svg>
                                    <a href="mainto:mectrons@gmail.com"
                                        class="text-sm text-primary hover:underline">mectrons@gmail.com</a>
                                </div>
                            </li>

                        </ul>
                    </div>
                </aside>
                <div class="mx-auto w-full col-span-1 md:col-span-5 lg:col-span-6">
                    <div class="bg-white flex justify-center py-3">
                        <form @submit.prevent="submit" class="p-4 md:p-5 shadow-2xl rounded">
                            <div class="grid gap-4 mb-4 grid-cols-2">
                                <div class="col-span-2 sm:col-span-1">
                                    <label for="name"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" placeholder="Name" autocomplete="off"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required>
                                </div>
                                <div class="col-span-2 sm:col-span-1">
                                    <label for="phone"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input type="tel" name="phone" placeholder="Phone number" autocomplete="off"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required>
                                </div>
                                <div class="col-span-2">
                                    <label for="email"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                    <input type="email" name="email" placeholder="example@demo.com" autocomplete="off"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        required>
                                </div>
                                <div class="col-span-2">
                                    <label for="message"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                    <textarea name="message" rows="4" placeholder="Your message" autocomplete="off" required
                                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                </div>
                            </div>
                            <button type="submit"
                                class="text-white flex justify-center items-center bg-primary hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send
                                Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="google-maps mt-8 rounded-xl overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7303.803081458796!2d90.40272168770831!3d23.75089023487959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad339cb5%3A0x20c70986185ad2ba!2sMogbazar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1711012197350!5m2!1sen!2sbd"
                width="100%" height="450" style="border:0;" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>

</template>
