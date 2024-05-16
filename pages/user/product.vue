<script setup>
import { onMounted } from "vue";
import { Modal, initFlowbite } from "flowbite";

const auth = useAuthStore();

onMounted(() => {
  initFlowbite();
});
definePageMeta({
  middleware: ["auth"],
});
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

          <!-- table area area -->

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
            <table
              class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Qty</th>
                  <th scope="col" class="px-6 py-3">Price</th>
                  <th scope="col" class="px-6 py-3">Approval</th>
                  <th scope="col" class="px-6 py-3">Published</th>
                  <th scope="col" class="px-6 py-3">Option</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white text-[#000] font-medium border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td class="px-6 py-4">Apollo 2 wheel Tyre</td>
                  <td class="px-6 py-4">2</td>
                  <td class="px-6 py-4">$450</td>
                  <td class="px-6 py-4">
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-[#348110] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 pt-1.5 pb-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Approved
                    </button>
                  </td>
                  <td class="px-6 py-4">
                    <label class="inline-flex items-center me-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        checked
                      />
                      <div
                        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-green-300  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
                      ></div>
                      
                      
                    </label>
                  </td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
