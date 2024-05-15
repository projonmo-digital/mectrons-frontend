<script setup>
const props = defineProps(["modelValue", "icon", "type", "placeholder"]);
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="flex border-0 bg-transparent p-0 p-e-0">
    <div class="relative w-full">
      <input
       
        id="search-dropdown"
        class="block p-4 bg-[#9caed247] w-full z-20 text-sm text-gray-900 rounded-xl rounded-s-gray-100 rounded-s-2 border-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        :type="type"
        :placeholder="placeholder"
        required
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <button
        type="submit"
        class="absolute pt-3 pb-5 px-6 top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-[#F57F20] rounded-xl border hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <span v-html="icon"></span>
      </button>
    </div>
  </div>
</template>
