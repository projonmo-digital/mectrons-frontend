<template>
  <div class="flex justify-between">
    <div>
      <img
        src="assets/images/ad1.png"
        alt=""
        srcset=""
        class="lg:w-[285px] lg:h-[285px]"
      />
    </div>
    <div class="mt-8 z-20 relative top-[-50px] mx-auto">
      <div class="flex">
        <nav
          class="border-gray-200 dark:bg-gray-900 flex justify-betweeen bg-[#F85606] rounded-lg w-full m-auto"
        >
          <div
            id="mega-menu"
            class="hidden md:flex md:w-auto gap-6 justify-between px-6 py-4"
          >
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-[#FFFFFF] w-32 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Make<svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-[#FFFFFF]  w-36 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Model
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-[#FFFFFF] focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  w-32"
              type="button"
            >
              Select Year
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-[#FFFFFF] focus:outline-none  w-36 focus:ring-blue-300 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Engine
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>

            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              class="bg-[#FFFFFF] focus:outline-none  w-32 focus:ring-blue-300 font-medium text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Select Part
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              id="dropdown"
              class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <button
            type="submit"
            class="p-2.5 m-1 ms-3 w-24 text-center flex items-center justify-center text-sm font-medium text-gray-900 bg-[rgba(251,_226,_205,_1)] rounded-e-lg hover:bg-[rgb(255,191,139)] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <img src="assets/images/material-symbols-light_search.svg" alt="" />
            <span class="sr-only">Search</span>
          </button>
        </nav>
      </div>

      <!-- ========== End Section ========== -->

      <!-- ========== Start Section ========== -->

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:flex lg:justify-between gap-x-5 gap-y-5"
      >
        <figure
          class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <figcaption class="flex items-center justify-center">
            <img
              class="rounded-full w-10 h-10"
              src="assets/images/product-2.png"
              alt="profile picture"
            />
            <div
              class="space-y-0.5 dark:text-white text-left rtl:text-right ms-3"
            >
              <div>Original Product</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Only parts from trusted brands
              </div>
            </div>
          </figcaption>
        </figure>
        <figure
          class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <figcaption class="flex items-center justify-center">
            <img
              class="rounded-full w-10 h-10"
              src="assets/images/product-2.png"
              alt="profile picture"
            />
            <div
              class="space-y-0.5 dark:text-white text-left rtl:text-right ms-3"
            >
              <div>7 Days Return</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Easy return /replacement
              </div>
            </div>
          </figcaption>
        </figure>
        <figure
          class="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700"
        >
          <figcaption class="flex items-center justify-center">
            <img
              class="rounded-full w-10 h-10"
              src="assets/images/product-2.png"
              alt="profile picture"
            />
            <div
              class="space-y-0.5 dark:text-white text-left rtl:text-right ms-3"
            >
              <div>Fast Delivery</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                All over Bangladesh
              </div>
            </div>
          </figcaption>
        </figure>
      </div>

      <div class="">
        <img src="assets/images/ad2.png" alt="" srcset="" />
      </div>
    </div>

    <div>
      <img
        src="assets/images/ad1.png"
        alt=""
        srcset=""
        class="lg:w-[285px] lg:h-[285px]"
      />
    </div>
  </div>
</template>
