<script setup>
import { ref } from "vue";
import catImage from "../../assets/images/disc-brake-1.svg";

// const catImage = "assets/images/disc-brake-1.svg";

const adstype = ref([]);
const adsType = async () => {
  refreshNuxtData();
  try {
    const { pending, data } = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/types`
    );
    adstype.value = data.value.data;
  } catch (error) {
    console.log(error);
  }
};
adsType();

const getCetagories = async (typeId) => {
  try {
    const { pending, data } = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/categories/types/${typeId}`
    );
    if (data.value.data.length > 0) {
      categories.value = data.value.data;
      loading.value = false;
    } else {
      categories.value = null;
      loading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="flex">
    <aside id="default-sidebar" class="z-40 w-64 h-auto" aria-label="Sidebar">
      <div class="h-full px-3 py-4 bg-[#EAE5E2]">
        <div class="flex justify-center">
          <h2 class="font-bold text-2xl text-[rgba(245,_127,_32,_1)]">
            Categories
          </h2>
        </div>
        <ul class="space-y-2 font-medium mt-3">
          <li>
            <a
              href="#"
              class="group relative mb-3 md:mb-0 w-full justify-between bg-white hover:bg-[rgba(245,_127,_32,_1)] hover:text-white focus:ring-4 focus:outline-nonefont-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              <span class="flex gap-1"
                ><img :src="catImage" alt="" />Demo Item 1</span
              >
              <svg
                class="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <div
                class="hidden group-hover:block absolute left-full top-0 z-50 bg-white shadow rounded-lg py-1.5"
              >
                <ul class="menu font-normal text-gray-600">
                  <!-- <li v-if="loading">
                                <div class="flex justify-center w-10">
                                    <img src="assets/images/loader.gif" alt="Loading..." class="flex w-6">
                                </div>
                            </li> -->
                  <li>
                    <nuxt-link
                      :to="`/category`"
                      class="block px-4 py-1.5 rounded-lg whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700"
                      >Sub 1</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      :to="`/category`"
                      class="block px-4 py-1.5 rounded-lg whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700"
                      >Sub 1</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      :to="`/category`"
                      class="block px-4 py-1.5 rounded-lg whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700"
                      >Sub 1</nuxt-link
                    >
                  </li>
                  <li>
                    <nuxt-link
                      :to="`/category`"
                      class="block px-4 py-1.5 rounded-lg whitespace-nowrap hover:bg-gray-50 dark:hover:bg-gray-700"
                      >Sub 1</nuxt-link
                    >
                  </li>
                </ul>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div
      id="indicators-carousel"
      class="relative w-full z-10"
      data-carousel="static"
    >
      <!-- Carousel wrapper -->
      <div class="relative h-56 overflow-hidden md:h-96">
        <!-- Item 1 -->
        <div class="duration-700 ease-in-out" data-carousel-item="active">
          <img
            src="assets/images/slide.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="assets/images/slide.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img
            src="assets/images/slide.png"
            class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>
      <!-- Slider indicators -->
      <div
        class="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-20 left-1/2"
      >
        <button
          type="button"
          class="w-3 h-3 rounded-full text-red-500"
          aria-current="true"
          aria-label="Slide 1"
          data-carousel-slide-to="0"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 2"
          data-carousel-slide-to="1"
        ></button>
        <button
          type="button"
          class="w-3 h-3 rounded-full"
          aria-current="false"
          aria-label="Slide 3"
          data-carousel-slide-to="2"
        ></button>
      </div>
      <!-- Slider controls -->
    </div>
  </div>
</template>
