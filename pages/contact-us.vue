<script setup>
import { onMounted } from "vue";
import { Modal, initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <div class="content">
    <div class="max-w-screen-2xl block h-full mx-auto px-4">
      <nav class="flex mb-3 mt-4" aria-label="Breadcrumb">
        <ol
          class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
        >
          <li class="inline-flex items-center">
            <a
              href="#"
              class="inline-flex items-center text-xs font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
              <a
                href="#"
                class="ms-1 text-xs font-normal text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >Projects</a
              >
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
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
              <span
                class="ms-1 text-xs font-normal text-gray-500 md:ms-2 dark:text-gray-400"
                >Flowbite</span
              >
            </div>
          </li>
        </ol>
      </nav>

      <h1 class="font-bold text-2xl text-[#F57F20] mb-5 mt-5">
        Contact Us
      </h1>
      <div
        class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-5"
      >
        <div class="col-span-3">
          <aside class="w-full rounded-lg">
            <div
              class="h-auto px-6 py-6 overflow-y-auto bg-[#F57F20]/35 dark:bg-gray-800 rounded-lg"
            >
              <div class="s-categories mb-3 space-y-8">
                <div>
                  <h4 class="text-lg font-medium mb-3">Get in Touch</h4>
                  <p class="text-sm text-dark-200">
                    The Alumalite Big Step Side Bars install in minutes,
                    providing great looks, convenience and safety for your
                    vehicle. The Alumalite Big Step Side Bars install in
                    minutes, providing great looks, convenience and safety for
                    your vehicle.
                  </p>
                </div>
                <p class="text-sm text-gray-900 font-medium mt-3">
                  New South Wles road , 25 Silicon Road, London D04 89GR
                </p>
                <div class="mt-6">
                  <ul class="">
                    <li class="pb-4">
                      <div class="flex items-center gap-x-2">
                        <svg
                          class="w-4 h-4 text-[#F24E1E] dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
                          />
                        </svg>
                        <span class="text-sm">+27 34 66 2455-198</span>
                      </div>
                    </li>
                    <li class="pb-4">
                      <div class="flex items-center gap-x-2">
                        <svg
                          class="w-4 h-4 text-[#F24E1E] dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"
                          />
                          <path
                            d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"
                          />
                        </svg>
                        <span class="text-sm">info@chromium.com</span>
                      </div>
                    </li>
                    <li class="pb-4">
                      <div class="flex items-center gap-x-2">
                        <svg
                          class="w-4 h-4 text-[#F24E1E] dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="text-sm"
                          >Monday – Friday 8:00 to 19:00</span
                        >
                      </div>
                    </li>
                  </ul>
                  <div class="flex flex-wrap justify-start gap-2">
                    <button
                      class="bg-[#3C5A9A] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 12 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6492 0.694092H7.75471C5.46851 0.694092 2.91734 1.61356 2.91734 4.79106C2.91734 5.89192 2.91734 6.95526 2.91734 8.14369H0.267578V12.1781H3.0221V23.7747H8.04433V12.0968H11.3596L11.6492 8.13118H7.9519C7.9519 8.13118 7.9519 6.3673 7.9519 5.86065C7.9519 4.60967 9.31992 4.67847 9.40003 4.67847H11.6492V0.694092Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button
                      class="bg-gradient-to-r from-[#FA8F21] to-[#D82D7E] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.36454 11.258C7.36454 10.5625 7.56781 9.8826 7.94862 9.30438C8.32944 8.72616 8.87068 8.27561 9.50385 8.00973C10.137 7.74386 10.8337 7.67461 11.5056 7.81075C12.1776 7.9469 12.7947 8.28231 13.2787 8.77456C13.7628 9.2668 14.0922 9.89375 14.2251 10.5761C14.358 11.2584 14.2886 11.9654 14.0255 12.6076C13.7625 13.2498 13.3176 13.7984 12.7473 14.1839C12.177 14.5694 11.5068 14.7745 10.8216 14.7733C10.3671 14.7733 9.91702 14.6823 9.49719 14.5056C9.07736 14.3288 8.69599 14.0698 8.3749 13.7433C8.0538 13.4168 7.79929 13.0292 7.62592 12.6028C7.45255 12.1763 7.36373 11.7193 7.36454 11.258ZM5.51587 11.258C5.51465 12.3284 5.82623 13.375 6.41119 14.2656C6.99616 15.1562 7.82821 15.8506 8.8021 16.2611C9.77598 16.6716 10.8479 16.7796 11.8823 16.5716C12.9167 16.3635 13.8671 15.8487 14.6131 15.0923C15.3592 14.3358 15.8675 13.3718 16.0737 12.3221C16.2798 11.2724 16.1747 10.1842 15.7714 9.1952C15.3681 8.20619 14.6849 7.36082 13.8082 6.76603C12.9315 6.17124 11.9007 5.85376 10.8462 5.85376C9.43358 5.85376 8.07872 6.42293 7.07926 7.43624C6.07981 8.44956 5.5175 9.82413 5.51587 11.258ZM15.1413 5.62858C15.1413 5.876 15.2136 6.11787 15.349 6.32359C15.4844 6.52931 15.6769 6.68966 15.9021 6.78434C16.1273 6.87902 16.3751 6.9038 16.6142 6.85553C16.8533 6.80726 17.0729 6.68811 17.2452 6.51316C17.4176 6.33821 17.535 6.1153 17.5825 5.87264C17.6301 5.62997 17.6057 5.37844 17.5124 5.14985C17.4191 4.92127 17.2611 4.72589 17.0585 4.58843C16.8558 4.45097 16.6175 4.3776 16.3737 4.3776C16.0469 4.3776 15.7334 4.5094 15.5023 4.744C15.2711 4.97861 15.1413 5.2968 15.1413 5.62858ZM6.63123 19.8335C5.97208 19.8309 5.31875 19.708 4.70245 19.4707C4.25506 19.2957 3.84858 19.0279 3.50902 18.6843C3.16947 18.3407 2.90431 17.929 2.73053 17.4754C2.50353 16.8479 2.38269 16.186 2.37312 15.5176C2.32382 14.4105 2.3115 14.0727 2.3115 11.258C2.3115 8.44329 2.3115 8.13055 2.37312 7.00466C2.38269 6.33628 2.50353 5.67436 2.73053 5.04688C2.90259 4.59156 3.16706 4.17806 3.50679 3.83323C3.84651 3.4884 4.25388 3.21995 4.70245 3.0453C5.32045 2.81419 5.97268 2.69151 6.63123 2.68252C7.72195 2.63248 8.04855 2.61997 10.8216 2.61997C13.5946 2.61997 13.9027 2.61997 15.0181 2.68252C15.6765 2.69295 16.3285 2.81558 16.9468 3.0453C17.3954 3.21627 17.8015 3.48534 18.1361 3.83342C18.4826 4.17263 18.7482 4.58766 18.9126 5.04688C19.1427 5.6735 19.2636 6.33597 19.27 7.00466C19.3193 8.11178 19.3316 8.44955 19.3316 11.258C19.3316 14.0665 19.3316 14.3855 19.27 15.5176C19.2636 16.1863 19.1427 16.8488 18.9126 17.4754C18.7499 17.9337 18.4841 18.3471 18.1361 18.6826C17.8032 19.0328 17.3966 19.3022 16.9468 19.4707C16.3302 19.707 15.6771 19.8298 15.0181 19.8335C13.9212 19.8898 13.5946 19.896 10.8216 19.896C8.04855 19.896 7.74044 19.896 6.63123 19.8335ZM6.54496 0.787281C5.68382 0.805149 4.83178 0.970083 4.0246 1.27516C3.33476 1.54641 2.70827 1.96076 2.18516 2.49173C1.66205 3.02271 1.25384 3.65862 0.986612 4.35884C0.686728 5.17835 0.524261 6.04308 0.505957 6.91709C0.456659 8.04298 0.444336 8.39951 0.444336 11.258C0.444336 14.1165 0.444335 14.4793 0.505957 15.6364C0.524261 16.5105 0.686728 17.3752 0.986612 18.1947C1.24811 18.8999 1.6558 19.5398 2.18209 20.0712C2.70334 20.6082 3.33444 21.0224 4.03076 21.2846C4.83749 21.5922 5.68959 21.7593 6.55113 21.7788C7.65417 21.8288 8.01157 21.8413 10.8277 21.8413C13.6439 21.8413 14.0013 21.8413 15.1043 21.7788C15.9659 21.7593 16.818 21.5922 17.6247 21.2846C18.321 21.0224 18.9521 20.6082 19.4734 20.0712C19.9996 19.5398 20.4073 18.8999 20.6688 18.1947C20.9717 17.376 21.1343 16.5108 21.1495 15.6364C21.1988 14.5106 21.2111 14.154 21.2111 11.258C21.2111 8.36198 21.2111 8.04298 21.1495 6.91709C21.1343 6.04275 20.9717 5.1775 20.6688 4.35884C20.4016 3.65862 19.9934 3.02271 19.4703 2.49173C18.9472 1.96076 18.3207 1.54641 17.6308 1.27516C16.8256 0.970657 15.9757 0.80573 15.1166 0.787281C14.0074 0.737242 13.6562 0.724731 10.8031 0.724731C7.94995 0.724731 7.62952 0.724732 6.52648 0.787281H6.54496Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button
                      class="bg-[#1DA1F2] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 21 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.53556 16.8898C14.0412 16.8898 18.1514 10.5973 18.1514 5.14306C18.1514 4.96792 18.1514 4.79278 18.1514 4.61139C18.9507 4.02856 19.6396 3.30384 20.1849 2.47221C19.4401 2.79993 18.6505 3.01084 17.8433 3.0977C18.6962 2.58515 19.3342 1.77282 19.6365 0.814656C18.8354 1.29499 17.9605 1.6354 17.0483 1.8217C16.4877 1.21844 15.762 0.799346 14.9647 0.618391C14.1674 0.437436 13.335 0.502906 12.5746 0.80637C11.8143 1.10983 11.1608 1.63739 10.6985 2.32111C10.2361 3.00483 9.98594 3.81339 9.98025 4.64266C9.97916 4.95884 10.0164 5.27396 10.0912 5.5809C8.4691 5.50047 6.88172 5.07532 5.43172 4.33295C3.98172 3.59058 2.70139 2.54753 1.67355 1.27127C1.14725 2.17592 0.98171 3.25063 1.21085 4.27517C1.43999 5.29971 2.04646 6.19652 2.906 6.78184C2.25777 6.76111 1.62386 6.5831 1.05732 6.26269V6.31898C1.05916 7.27408 1.38672 8.19908 1.98434 8.93682C2.58196 9.67455 3.41278 10.1795 4.33564 10.3659C3.98374 10.4606 3.6213 10.5089 3.25725 10.5098C2.9987 10.5102 2.74072 10.4851 2.48697 10.4347C2.74985 11.2559 3.25867 11.9732 3.94246 12.4868C4.62625 13.0003 5.45091 13.2844 6.3014 13.2995C4.86015 14.4551 3.07889 15.0872 1.24219 15.0946C0.916863 15.0944 0.591803 15.0756 0.268555 15.0383C2.13602 16.2581 4.30869 16.9093 6.5294 16.9148L6.53556 16.8898Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <button
                      class="bg-[#0575B3] p-2 font-semibold text-white inline-flex items-center space-x-2 rounded-full"
                    >
                      <svg
                        class="w-5 h-5 pill-current"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                          clip-rule="evenodd"
                        />
                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div class="col-span-9">
          <div class="">
            <button
              data-drawer-target="sidebar-multi-level-sidebar"
              data-drawer-toggle="sidebar-multi-level-sidebar"
              aria-controls="sidebar-multi-level-sidebar"
              type="button"
              class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <div class="mx-auto w-full">
              <div class="bg-white flex justify-center py-3">
                <form class="p-4 md:p-5 w-4/5 shadow rounded">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Name</label
                      >
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="phone"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Phone</label
                      >
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div class="col-span-2">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >E-mail</label
                      >
                      <input
                        type="text"
                        name="email"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div class="col-span-2">
                      <label
                        for="message"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Message</label
                      >
                      <textarea
                        id="message"
                        rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="button"
                    class="text-white flex justify-center items-center bg-[#F57F20] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="google-maps mt-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7303.803081458796!2d90.40272168770831!3d23.75089023487959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad339cb5%3A0x20c70986185ad2ba!2sMogbazar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1711012197350!5m2!1sen!2sbd"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>
