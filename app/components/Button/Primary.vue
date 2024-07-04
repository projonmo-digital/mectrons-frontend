<template>
    <button v-bind="$attrs"
        class="w-full text-white bg-[rgba(245,_127,_32,_1)] hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in-out duration-300">
        <slot/>
    </button>
</template>