<template>
    <div class="flex flex-col gap-x-5 px-4 py-3">
        <img class="w-60 mx-auto mb-6" src="assets/images/auth/auth.png" alt="Auth Image" />
        <div class="shadow-md p-4 rounded-lg bg-gray-100">
            <h4 class="text-md font-semibold mb-2">Stay Safe</h4>
            <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700">
            <p class="mb-2 text-sm leading-6 text-gray-500">Regular vehicle maintenance, including checks on
                oil, brake fluids, tires, and
                lights, is crucial for safety and performance. Proper tire care and timely brake inspections
                prevent accidents. Following traffic rules, practicing defensive driving, and avoiding
                distractions and fatigue are essential for safe driving
            </p>
            <NuxtLink to="/pages/safety-note" class="font-bold text-sm hover:text-primary">Read more <Icon
                    name="mdi:chevron-right" class=" text-xl"></Icon>
            </NuxtLink>
        </div>
    </div>
</template>