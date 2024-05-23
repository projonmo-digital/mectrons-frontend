<script setup>
import { onMounted } from "vue";
import { Modal, initFlowbite } from "flowbite";

// const auth = useAuthStore();

onMounted(() => {
  initFlowbite();
});
// definePageMeta({
//   middleware: ["auth"],
// });
</script>
<template>
  <div class="content">
    <div class="max-w-screen-2xl flex gap-x-4 h-full mx-auto px-4 py-9">
      <UserSidebar></UserSidebar>

      <div class="w-[calc(100%-basis-72)] w-full">
        <div class="mx-auto w-full max-w-screen-2xl">
          <div class="rounded-md px-4 py-5">
            <h4 class="text-lg font-semibold mb-3">Overview</h4>
            <div
              class="adses rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5"
            >
              <div
                class="bg-gradient-to-r from-[#E67418] to-[#49301C] rounded-md p-3 shadow-xl"
              >
                <div class="text-center mt-2">
                  <img
                    class="m-auto w-12"
                    src="assets/images/upload-big-arrow 1.png"
                    alt=""
                  />
                  <h2 class="text-white text-xl font-semibold">44</h2>
                  <p class="font-medium text-[#d9d9d9]">Total Uploads</p>
                </div>
              </div>
              <div class="bg-white rounded-md shadow-xl p-3">
                <div class="text-center mt-4">
                  <img
                    class="m-auto w-12"
                    src="assets/images/add 1.png"
                    alt=""
                  />
                  <p class="font-medium text-dark-700">Add New Products</p>
                </div>
              </div>

              <div class="bg-[#E67418] rounded-md p-3 shadow-xl">
                <div class="text-center mt-2">
                  <img
                    class="m-auto w-12"
                    src="assets/images/box 1.png"
                    alt=""
                  />
                  <h2 class="text-white font-bold text-xl">44</h2>
                  <p class="font-medium text-white">Products Sold</p>
                </div>
              </div>
              <div class="bg-[#E67418] rounded-md p-3 shadow-xl h-48">
                <div class="text- mt-2">
                  <div class="flex justify-end">
                    <img
                      class="w-20"
                      src="assets/images/increasing 1.png"
                      alt=""
                    />
                  </div>
                  <h2 class="text-white text-sm">Total Sales</h2>
                  <p class="font-bold text-4xl text-white">$1034</p>
                </div>
              </div>
              <div class="bg-white rounded-md px-3 py-5 shadow-xl">
                <div class="mt-2">
                  <h3 class="text-[#E67418] text-xl font-bold">Orders</h3>
                  <p class="font-bold text-sm text-gray-700 p-3">This Month</p>
                  <div class="space-y-5 mt-8">
                    <div class="flex gap-4">
                      <img
                        class="w-12 h-12"
                        src="assets/images/box (3) 1.png"
                        alt=""
                      />
                      <div>
                        <p class="text-sm font-medium text-dark-700">
                          New Ordered
                        </p>
                        <h4 class="font-bold text-3xl text-gray-700">46</h4>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <img
                        class="w-12 h-12"
                        src="assets/images/cancel (1) 1.png"
                        alt=""
                      />
                      <div>
                        <p class="text-sm font-medium text-dark-700">
                          Cancelled
                        </p>
                        <h4 class="font-bold text-3xl text-gray-700">46</h4>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <img
                        class="w-12 h-12"
                        src="assets/images/on-time 1.png"
                        alt=""
                      />
                      <div>
                        <p class="text-sm font-medium text-dark-700">
                          On Delivery
                        </p>
                        <h4 class="font-bold text-3xl text-gray-700">46</h4>
                      </div>
                    </div>
                    <div class="flex gap-4">
                      <img
                        class="w-12 h-12"
                        src="assets/images/package-delivered 1.png"
                        alt=""
                      />
                      <div>
                        <p class="text-sm font-medium text-dark-700">
                          Delivered
                        </p>
                        <h4 class="font-bold text-3xl text-gray-700">46</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-[#E67418] rounded-md p-3 shadow-xl h-48">
                <div class="text- mt-2">
                  <h2 class="text-white font-semibold">Sold Amount</h2>
                  <p class="text-white font-light text-white-700">
                    Your Sold Amount ( Current Month)
                  </p>
                  <p class="font-bold text-4xl pt-3 pb-5 text-white">$1034</p>
                  <p class="text-white text-white-700 font-light">
                    Last Month : $0.00
                  </p>
                </div>
              </div>
            </div>
          </div>



          <!-- products area -->
          <div class="relative mt-20">
            <div class="w-[calc(100%-90px)] mx-auto">
              <h4 class="py-5 font-bold text-3xl">My Products</h4>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6"
              >
                <ProductCard
                  v-for="(product, index) of products"
                  :key="product.id"
                  :product="product"
                ></ProductCard>
              </div>
            </div>

            <div class="arrow">
              <button
                class="group prev absolute right-20 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300"
                data-filter="all"
              >
                <div class="relative">
                  <span
                    class="relative z-10 text-sm font-medium text-white w-10 h-8 flex justify-center items-center"
                  >
                    <svg
                      class="w-5 h-5 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                  </span>
                  <span
                    class="skew absolute w-10 h-8 left-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"
                  ></span>
                </div>
              </button>

              <button
                class="group next absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center ease-in-out duration-300"
                data-filter="all"
              >
                <div class="relative">
                  <span
                    class="relative z-10 text-sm font-medium text-white w-10 h-8 flex justify-center items-center"
                  >
                    <svg
                      class="w-5 h-5 text-white dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </span>
                  <span
                    class="skew absolute w-10 h-8 right-0 top-0 bg-[#F57F20] group-hover:bg-[#F57F20] z-0 -skew-x-12"
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
