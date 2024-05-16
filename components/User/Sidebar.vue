<script setup>
const token = useTokenStore();
const auth = useAuthStore();
</script>
<template>
  <div class="sidebar basis-72">
    <div>
      <div class="s-categories px-3 py-4 rounded-md">
        <h4 class="text-xl font-semibold mb-4">Marketplace</h4>
        <nuxt-link
          to="/user/create"
          class="text-white flex items-center w-full gap-x-1 mt-5 bg-gradient-to-r bg-[#F57F20] font-medium rounded-lg text-sm ps-12 py-2 me-2 mb-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 26 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 22V14.5H15.5V22H21.75V12H25.5L13 0.75L0.5 12H4.25V22H10.5Z"
              fill="white"
            />
          </svg>
          <span class="text-sm">Dashboard</span>
        </nuxt-link>
        <ul class="space-y-2 font-medium text-sm">
          <li>
            <!-- :to="`${auth?.user?.name?.replaceAll(' ', '-')}/${
                auth?.user?.id
              }/products`" -->
            <nuxt-link
              to="user/product"
              target="_blank"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9] font-medium"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.6875 1.2187H9.59375C9.85265 1.2187 10.0625 1.42855 10.0625 1.68745V10.5937C10.0625 10.8526 9.85265 11.0624 9.59375 11.0624H0.6875C0.428604 11.0624 0.21875 10.8526 0.21875 10.5937V1.68745C0.21875 1.42855 0.428604 1.2187 0.6875 1.2187ZM17.2201 0.476519L22.5234 5.77984C22.7065 5.96289 22.7065 6.25966 22.5234 6.44274L17.2201 11.746C17.0371 11.9291 16.7403 11.9291 16.5572 11.746L11.2539 6.44271C11.0709 6.25966 11.0709 5.96289 11.2539 5.77981L16.5572 0.476519C16.7403 0.293472 17.0371 0.293472 17.2201 0.476519ZM0.6875 12.9374H9.59375C9.85265 12.9374 10.0625 13.1473 10.0625 13.4062V22.3124C10.0625 22.5713 9.85265 22.7812 9.59375 22.7812H0.6875C0.428604 22.7812 0.21875 22.5713 0.21875 22.3124V13.4062C0.21875 13.1473 0.428604 12.9374 0.6875 12.9374ZM12.4063 12.9374H21.3125C21.5714 12.9374 21.7813 13.1473 21.7813 13.4062V22.3124C21.7813 22.5713 21.5714 22.7812 21.3125 22.7812H12.4063C12.1474 22.7812 11.9375 22.5713 11.9375 22.3124V13.4062C11.9375 13.1473 12.1474 12.9374 12.4063 12.9374Z"
                  fill="#F24E1E"
                />
              </svg>

              <span>Products</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/user/announcement"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9] font-medium"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="30" height="30" fill="url(#pattern0_710_791)" />
                <defs>
                  <pattern
                    id="pattern0_710_791"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_710_791"
                      transform="scale(0.0078125)"
                    />
                  </pattern>
                  <image
                    id="image0_710_791"
                    width="128"
                    height="128"
                    xlink:href="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <span>Orders</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/user/bookmark"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="30" height="30" fill="url(#pattern0_710_801)" />
                <defs>
                  <pattern
                    id="pattern0_710_801"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_710_801"
                      transform="scale(0.0078125)"
                    />
                  </pattern>
                  <image
                    id="image0_710_801"
                    width="128"
                    height="128"
                    xlink:href="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <span>Settings</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/user/review"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.667969 27.3333V3.33329C0.667969 2.59996 0.929302 1.9724 1.45197 1.45063C1.97464 0.928848 2.60219 0.667515 3.33464 0.666626H24.668C25.4013 0.666626 26.0293 0.927959 26.552 1.45063C27.0746 1.97329 27.3355 2.60085 27.3346 3.33329V19.3333C27.3346 20.0666 27.0737 20.6946 26.552 21.2173C26.0302 21.74 25.4022 22.0008 24.668 22H6.0013L0.667969 27.3333ZM6.0013 16.6666H16.668V14H6.0013V16.6666ZM6.0013 12.6666H22.0013V9.99996H6.0013V12.6666ZM6.0013 8.66663H22.0013V5.99996H6.0013V8.66663Z"
                  fill="#F24E1E"
                />
              </svg>

              <span>Chats</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/user/report"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_819_4814)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.5 3.75C23.4565 3.74995 24.3769 4.11541 25.0728 4.7716C25.7688 5.4278 26.1876 6.32513 26.2438 7.28L26.25 7.5V25C26.2499 25.2081 26.1979 25.4129 26.0987 25.5958C25.9994 25.7787 25.8561 25.9339 25.6816 26.0474C25.5072 26.1609 25.3072 26.229 25.0998 26.2456C24.8923 26.2622 24.684 26.2268 24.4937 26.1425L24.3438 26.065L20.9375 23.9675L17.53 26.065C17.3555 26.1722 17.1573 26.2349 16.9528 26.2476C16.7483 26.2602 16.5439 26.2224 16.3575 26.1375L16.22 26.065L12.8125 23.9675L9.405 26.065C9.22641 26.1749 9.02304 26.2381 8.81361 26.2489C8.60418 26.2596 8.39542 26.2174 8.20655 26.1263C8.01768 26.0351 7.85478 25.898 7.73283 25.7274C7.61089 25.5567 7.53383 25.3582 7.50875 25.15L7.5 25V17.5H5C4.69383 17.5 4.39833 17.3876 4.16954 17.1841C3.94074 16.9807 3.79457 16.7003 3.75875 16.3962L3.75 16.25V6.875C3.74988 6.0816 4.05154 5.31786 4.5938 4.73869C5.13606 4.15953 5.87831 3.8083 6.67 3.75625L6.875 3.75H22.5ZM18.75 15H13.75C13.4185 15 13.1005 15.1317 12.8661 15.3661C12.6317 15.6005 12.5 15.9185 12.5 16.25C12.5 16.5815 12.6317 16.8995 12.8661 17.1339C13.1005 17.3683 13.4185 17.5 13.75 17.5H18.75C19.0815 17.5 19.3995 17.3683 19.6339 17.1339C19.8683 16.8995 20 16.5815 20 16.25C20 15.9185 19.8683 15.6005 19.6339 15.3661C19.3995 15.1317 19.0815 15 18.75 15ZM6.875 6.25C6.70924 6.25 6.55027 6.31585 6.43306 6.43306C6.31585 6.55027 6.25 6.70924 6.25 6.875V15H7.5V6.875C7.5 6.70924 7.43415 6.55027 7.31694 6.43306C7.19973 6.31585 7.04076 6.25 6.875 6.25ZM20 10H13.75C13.4314 10.0004 13.125 10.1223 12.8933 10.3411C12.6616 10.5598 12.5222 10.8587 12.5035 11.1767C12.4849 11.4948 12.5883 11.808 12.7928 12.0523C12.9973 12.2966 13.2874 12.4536 13.6038 12.4913L13.75 12.5H20C20.3186 12.4996 20.625 12.3777 20.8567 12.1589C21.0884 11.9402 21.2278 11.6413 21.2465 11.3233C21.2651 11.0052 21.1617 10.692 20.9572 10.4477C20.7527 10.2034 20.4626 10.0464 20.1463 10.0087L20 10Z"
                    fill="#F24E1E"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_819_4814">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span>Payments History</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/user/report"
              class="flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 active:bg-[#F57F20] gap-x-2 ps-12 py-2 bg-[#D9D9D9]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect width="30" height="30" fill="url(#pattern0_710_811)" />
                <defs>
                  <pattern
                    id="pattern0_710_811"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_710_811"
                      transform="scale(0.0078125)"
                    />
                  </pattern>
                  <image
                    id="image0_710_811"
                    width="128"
                    height="128"
                    xlink:href="data:image/png;base64,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"
                  />
                </defs>
              </svg>

              <span>Payments History</span>
            </nuxt-link>
          </li>

          <template v-if="token.getStatus">
            <li
              @click.prevent="auth.logout()"
              class="cursor-pointer flex items-center px-2 py-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group active:bg-violet-700"
            >
              <svg
                class="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
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
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
