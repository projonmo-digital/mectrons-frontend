<script setup lang="ts">

const sidebarSchema = [
    {
        header: "Dashboard",
        icon: "eva:home-outline",
        subMenu: [
            {
                label: "Dashboard",
                action: '/master-admin/dashboard'
            },

        ]
        // No submenu for Dashboard
    },

    {
        header: "Products",
        icon: "eva:inbox-outline",
        subMenu: [
            {
                label: "Add new product",
                action: '/master-admin/add-new-product'
            },
            {
                label: "All products",
                action: '/master-admin/product/allProduct'
            },
            {
                label: "CategoryProduct",
                action: '/master-admin/product/categoryProduct'
            }
        ]
    },
    {
        header: "Sales",
        icon: "eva:shopping-bag-outline",
        subMenu: [
            {
                label: "Customer",
                action: '/master-admin/sales/customer'
            },

        ]
    },
    {
        header: "Seller",
        icon: "eva:people-outline",
        subMenu: [
            {
                label: "All Seller",
                action: '/master-admin/Seller/allSeller'
            },
            {
                label: "Payout",
                action: '/master-admin/Seller/payout'
            },
            {
                label: "Payout Request",
                action: '/master-admin/Seller/payOutRequest'
            },
            {
                label: "Seller Commission",
                action: '/master-admin/Seller/sellerCommission'
            },

        ]
    },
    {
        header: "Report",
        icon: "eva:person-outline",
        subMenu: [
            {
                label: "In House Product Sale",
                action: '/master-admin/report/inHouse'
            },
            {
                label: "Seller Product Sale",
                action: '/master-admin/report/sellerProduct'
            },
            {
                label: "Product Stock",
                action: '/master-admin/report/productStock'
            }
        ]
    },

    {
        header: "Offer",
        icon: "eva:gift-outline",
        // subMenu: [
        //     {
        //         label: "Current Offers",
        //         action: null
        //     },
        //     {
        //         label: "Expired Offers",
        //         action: null
        //     }
        // ]
    }
]

</script>


<template>
    <div class="w-[403px] shadow-md  mb-4  bg-gradient-to-b from-[#EAEAEA] to-[#F57F20] h-[981px] rounded-lg bg"
        style="box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);">
        <div class="w-full flex justify-center p-4">
            <svg width="178" height="35" viewBox="0 0 178 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.5508 17.6192L24.5356 13.924C24.7514 13.7633 25.0494 13.924 25.0455 14.1917L24.8533 21.7964L19.5508 17.6192Z"
                    fill="#F15724" />
                <path d="M14.375 13.9046L14.4731 13.8315L19.5481 17.6436L14.5593 21.5239L14.426 21.4265L14.375 13.9046Z"
                    fill="#F15724" />
                <path
                    d="M30.0066 30.2483H9.74559C7.67085 30.2483 5.98047 28.1499 5.98047 25.5745V10.4138C5.98047 7.83833 7.67085 5.73999 9.74559 5.73999H30.0066C32.0814 5.73999 33.7718 7.83833 33.7718 10.4138V25.5745C33.7718 28.1499 32.0853 30.2483 30.0066 30.2483ZM9.74559 6.7137C8.10227 6.7137 6.76487 8.37388 6.76487 10.4138V25.5745C6.76487 27.6144 8.10227 29.2746 9.74559 29.2746H30.0066C31.65 29.2746 32.9874 27.6144 32.9874 25.5745V10.4138C32.9874 8.37388 31.65 6.7137 30.0066 6.7137H9.74559Z"
                    fill="#F15724" />
                <path d="M14.6947 29.7322H13.875V33.7974H14.6947V29.7322Z" fill="#F15724" />
                <path d="M20.2259 29.7322H19.4062V33.7974H20.2259V29.7322Z" fill="#F15724" />
                <path d="M25.7572 29.6836H24.9375V33.7488H25.7572V29.6836Z" fill="#F15724" />
                <path d="M14.7884 2.04468H13.9688V6.10992H14.7884V2.04468Z" fill="#F15724" />
                <path d="M20.3158 2.04468H19.4961V6.10992H20.3158V2.04468Z" fill="#F15724" />
                <path d="M25.847 1.99121H25.0273V6.05645H25.847V1.99121Z" fill="#F15724" />
                <path d="M33.4805 24.1981L33.4805 25.2156L36.7553 25.2156L36.7553 24.1981L33.4805 24.1981Z"
                    fill="#F15724" />
                <path d="M33.4844 17.3323L33.4844 18.3499L36.7592 18.3499L36.7592 17.3323L33.4844 17.3323Z"
                    fill="#F15724" />
                <path d="M33.4414 10.4649L33.4414 11.4824L36.7163 11.4824L36.7163 10.4649L33.4414 10.4649Z"
                    fill="#F15724" />
                <path d="M2.95703 24.1983L2.95703 25.2158L6.2319 25.2158L6.2319 24.1983L2.95703 24.1983Z"
                    fill="#F15724" />
                <path d="M2.95703 17.3328L2.95703 18.3503L6.2319 18.3503L6.2319 17.3328L2.95703 17.3328Z"
                    fill="#F15724" />
                <path d="M2.91797 10.4654L2.91797 11.4829L6.19284 11.4829L6.19284 10.4654L2.91797 10.4654Z"
                    fill="#F15724" />
                <path
                    d="M60.4572 6.46045V27.5413H57.049V13.8314L52.4994 27.5461H49.9188L45.3457 13.8314V27.5461H41.9375V6.46532H45.8046L51.2052 22.142L56.6058 6.46532H60.4572V6.46045Z"
                    fill="#F15724" />
                <path
                    d="M67.2207 9.87346V15.1607H72.939V18.5151H67.2207V24.0994H73.6685V27.5414H63.8125V6.4314H73.6685V9.87346H67.2207Z"
                    fill="#F15724" />
                <path
                    d="M77.0631 11.4022C77.8162 9.76152 78.8476 8.48109 80.1537 7.5658C81.4597 6.65051 82.9226 6.19287 84.5463 6.19287C86.4446 6.19287 88.1075 6.79657 89.5351 8.00397C90.9627 9.21137 91.9589 10.8862 92.5276 13.0186H88.6095C88.2212 12.0108 87.6721 11.2562 86.9662 10.7547C86.2602 10.2532 85.4444 10.0001 84.5228 10.0001C83.5344 10.0001 82.652 10.2873 81.8833 10.8618C81.1146 11.4363 80.5106 12.2445 80.0831 13.2912C79.6517 14.338 79.4399 15.5648 79.4399 16.9767C79.4399 18.3642 79.6556 19.5911 80.0831 20.6476C80.5106 21.7041 81.1146 22.522 81.8833 23.0916C82.652 23.6661 83.5344 23.9533 84.5228 23.9533C85.4484 23.9533 86.2641 23.6953 86.9662 23.1841C87.6682 22.6729 88.2212 21.9085 88.6095 20.9056H92.5276C91.9589 23.0624 90.9666 24.7372 89.5469 25.9348C88.1271 27.1325 86.4602 27.7313 84.5463 27.7313C82.9226 27.7313 81.4597 27.2737 80.1537 26.3584C78.8476 25.4431 77.8162 24.1676 77.0631 22.5366C76.3101 20.9056 75.9336 19.0556 75.9336 16.9767C75.9336 14.8978 76.3101 13.0429 77.0631 11.4022Z"
                    fill="#F15724" />
                <path d="M107.003 6.46045V9.8733H102.477V27.5413H99.069V9.8733H94.543V6.46045H107.003Z"
                    fill="#F15724" />
                <path
                    d="M118.242 27.5462L114.497 19.3329H112.889V27.5462H109.48V6.46533H115.858C117.172 6.46533 118.289 6.75258 119.215 7.32707C120.14 7.90155 120.835 8.67565 121.294 9.65423C121.756 10.6328 121.988 11.7234 121.988 12.9308C121.988 14.3183 121.662 15.5744 121.015 16.6893C120.364 17.8091 119.399 18.5783 118.121 19.0018L122.184 27.551H118.242V27.5462ZM112.889 16.1586H115.736C116.662 16.1586 117.352 15.8811 117.803 15.3261C118.258 14.7711 118.485 14.0018 118.485 13.0135C118.485 12.0447 118.258 11.2949 117.803 10.7643C117.348 10.2287 116.658 9.96582 115.736 9.96582H112.889V16.1586Z"
                    fill="#F15724" />
                <path
                    d="M128.588 26.3681C127.258 25.443 126.203 24.1577 125.427 22.517C124.65 20.8763 124.258 19.0165 124.258 16.9425C124.258 14.888 124.646 13.0428 125.427 11.4021C126.207 9.76143 127.258 8.47614 128.588 7.55111C129.917 6.62609 131.376 6.16357 132.969 6.16357C134.573 6.16357 136.04 6.62609 137.361 7.55111C138.683 8.47614 139.73 9.76143 140.499 11.4021C141.268 13.0428 141.656 14.8929 141.656 16.9425C141.656 19.0165 141.271 20.8763 140.499 22.517C139.73 24.1577 138.679 25.443 137.346 26.3681C136.016 27.2931 134.557 27.7556 132.965 27.7556C131.376 27.7556 129.917 27.2931 128.588 26.3681ZM135.667 23.1207C136.443 22.5462 137.055 21.7283 137.491 20.6572C137.93 19.591 138.15 18.3496 138.15 16.9425C138.15 15.5355 137.93 14.2989 137.491 13.2424C137.051 12.186 136.443 11.3729 135.667 10.813C134.886 10.2483 133.988 9.96591 132.965 9.96591C131.941 9.96591 131.039 10.2483 130.251 10.813C129.462 11.3778 128.85 12.186 128.415 13.2424C127.98 14.2989 127.756 15.5355 127.756 16.9425C127.756 18.3544 127.976 19.591 128.415 20.6572C128.854 21.7235 129.466 22.5462 130.251 23.1207C131.035 23.6952 131.941 23.9825 132.965 23.9825C133.988 23.9825 134.89 23.6952 135.667 23.1207Z"
                    fill="#F15724" />
                <path
                    d="M158.707 27.5463H155.299L147.584 13.077V27.5463H144.176V6.4314H147.584L155.299 20.9299V6.4314H158.707V27.5463Z"
                    fill="#F15724" />
                <path
                    d="M164.731 27.001C163.782 26.4995 163.033 25.7741 162.48 24.8247C161.927 23.8802 161.645 22.7605 161.629 21.4703H165.28C165.327 22.3369 165.574 23.0234 166.022 23.5248C166.469 24.0263 167.08 24.2794 167.857 24.2794C168.653 24.2794 169.277 24.0409 169.732 23.5686C170.187 23.0964 170.414 22.4781 170.414 21.7089C170.414 21.0857 170.261 20.5696 169.951 20.1704C169.642 19.7663 169.257 19.4498 168.794 19.221C168.332 18.9873 167.696 18.7342 166.884 18.4518C165.782 18.0477 164.884 17.6534 164.194 17.259C163.504 16.8646 162.911 16.2707 162.417 15.4771C161.923 14.6835 161.676 13.6173 161.676 12.2931C161.676 11.0467 161.927 9.95617 162.429 9.03115C162.931 8.10613 163.637 7.39532 164.547 6.90359C165.457 6.41187 166.492 6.16357 167.661 6.16357C169.414 6.16357 170.838 6.69425 171.932 7.75072C173.026 8.8072 173.63 10.2824 173.744 12.1762H169.998C169.967 11.4508 169.72 10.852 169.257 10.3797C168.794 9.90749 168.183 9.66893 167.422 9.66893C166.755 9.66893 166.225 9.87828 165.829 10.3018C165.433 10.7254 165.233 11.3388 165.233 12.1422C165.233 12.7069 165.382 13.1743 165.684 13.5443C165.982 13.9192 166.355 14.221 166.802 14.4498C167.249 14.6835 167.877 14.9464 168.689 15.2483C169.791 15.6524 170.693 16.0516 171.391 16.4557C172.089 16.8598 172.689 17.4635 173.191 18.2668C173.693 19.0701 173.944 20.1314 173.944 21.4362C173.944 22.5657 173.709 23.6125 173.238 24.5764C172.767 25.5404 172.077 26.3145 171.171 26.889C170.261 27.4635 169.183 27.7507 167.935 27.7507C166.747 27.7556 165.68 27.5024 164.731 27.001Z"
                    fill="#F15724" />
                <path
                    d="M25.3276 23.7731H14.4598C13.5499 23.7731 12.8086 22.8529 12.8086 21.7234V13.7926C12.8086 12.6631 13.5499 11.7429 14.4598 11.7429H25.3276C26.2375 11.7429 26.9788 12.6631 26.9788 13.7926V21.7234C26.9827 22.8529 26.2414 23.7731 25.3276 23.7731ZM14.4598 12.2249C13.7656 12.2249 13.2008 12.926 13.2008 13.7877V21.7186C13.2008 22.5803 13.7656 23.2814 14.4598 23.2814H25.3276C26.0218 23.2814 26.5866 22.5803 26.5866 21.7186V13.7926C26.5866 12.9308 26.0218 12.2298 25.3276 12.2298H14.4598V12.2249Z"
                    fill="#F15724" />
            </svg>
        </div>
        <div class="w-[262px] bg-[#EAE5E2]/50 p-4 flex flex-col gap-8 ">
            <h1 class="text-center text-2xl font-bold text-primary">Categories</h1>
            <DropdownMenu class="bg-white" v-for="(i, j) in sidebarSchema">
                <DropdownMenuTrigger as-child>
                    <Button
                        class="border h-[55px] border-none text-black  bg-[#D9D9D9] rounded hover:text-white hover:bg-primary "
                        :key="j">
                        <div class="flex w-full flex-start gap-4 px-[35px] py-2  ">
                            <Icon class=" h-[30px] w-[30px]  font-extrabold text-primary hover:text-white rounded "
                                :name="i.icon"></Icon>
                            <p class="text-lg">{{ i.header }}</p>
                        </div>

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class=" bg-white">
                    <NuxtLink :to="k.action" v-for="k in i.subMenu">
                        <DropdownMenuItem>
                            <Button
                                class="border w-full h-[55px] border-none text-black  bg-[#D9D9D9] rounded hover:text-white hover:bg-primary ">
                                <div class="flex w-full flex-start gap-4 px-[35px] py-2  ">

                                    <p class="text-lg">{{ k.label }}</p>
                                </div>

                            </Button>

                        </DropdownMenuItem>
                    </NuxtLink>


                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    </div>

</template>
<!-- <script setup lang="ts">
const items= [
      {
        "icon": "brakes",
        "label": "Brakes",
        "action": null,
        "subMenu": [
          {
            "label": "Brake Pads",
            "action": null
          },
          {
            "label": "Brake Fluid",
            "action": null
          }
        ]
      },
      {
        "icon": "filter",
        "label": "Filter",
        "action": {
          "type": "button",
          "label": "Apply Filter"
        },
        "subMenu": [
          {
            "label": "Air Filters",
            "action": null
          },
          {
            "label": "Oil Filters",
            "action": null
          }
        ]
      },
      {
        "icon": "lubricant",
        "label": "Lubricant",
        "action": null,
        "subMenu": [
          {
            "label": "Engine Oil",
            "action": null
          },
          {
            "label": "Grease",
            "action": null
          }
        ]
      },
      {
        "icon": "tyre",
        "label": "Tyre",
        "action": null,
        "subMenu": [
          {
            "label": "Summer Tyres",
            "action": null
          },
          {
            "label": "Winter Tyres",
            "action": null
          }
        ]
      },
      {
        "icon": "horn",
        "label": "Horn",
        "action": null,
        "subMenu": [
          {
            "label": "Standard Horn",
            "action": null
          },
          {
            "label": "Air Horn",
            "action": null
          }
        ]
      }
    ]
   

</script>

<template>
  <div class="w-[262px] bg-[#EAE5E2]/50 p-4 flex flex-col gap-8 ">
    <h1 class="text-center text-2xl font-bold text-primary">Categories</h1>
    <DropdownMenu class="bg-white" v-for="i in items">
      <DropdownMenuTrigger as-child>
        <Button class="border h-[55px] border-none text-black  bg-[#D9D9D9] rounded hover:text-white hover:bg-primary "
                    v-for=" (item, index) in sidebarSchema" :key="index">
                    <div class="flex w-full flex-start gap-4 px-[35px] py-2  ">
                        <Icon class=" h-[30px] w-[30px]  font-extrabold text-primary hover:text-white rounded "
                            :name="item.icon"></Icon>
                        <p class="text-lg">{{ item.header }}</p>
                    </div>

                </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 bg-white">
        <DropdownMenuItem v-for="j in i.subMenu">
          {{j.label}}
          
        </DropdownMenuItem>
       
        
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template> -->