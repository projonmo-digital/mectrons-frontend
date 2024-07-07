import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Badge from "~/components/ui/badge/Badge.vue";

// components
import ProductInfo from "~/components/master-admin/product/ProductInfo.vue";


const handleSwitchChange = async (id: string) => {
  const token = useTokenStore();

  try {
    const response = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/approve/product/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    );
    alert("Approved");
    // toast({ title: "Approved!", variant: "default" });

    window.location.reload();

    // Refresh products list after update
  } catch (error) {
    // toast({ title: "Something went wrong", variant: "desturctive" });
    await refreshNuxtData();
    alert("Not approved");
    console.log(error);
  }
};

const markProductAs = async (id: string, value: string) => {
  const token = useCookie('token')

  try {
    const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/product/mark-as`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          product_id: id,
          name: value,
        },
      }
    );

    console.log(error.value?.data);
    if (data.value) {
      toast({
        class: 'capitalize',
        title: data.value?.status,
        description: data.value?.message,
      });
    }    
    if(error.value){
      toast({
        class: 'bg-red-500 capitalize',
        title: error.value?.data.status,
        description: error.value?.data.message,
      });
    }
    await refreshNuxtData();
  } catch (error) {
    await refreshNuxtData();
    console.log(error);
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: () => h("div", { class: "text-start" }, "Name"),
  },
  {
    accessorKey: "stock_amount",
    header: "Info",
    cell: ({ row }) => {
      const id = row.original.id;
      return h(ProductInfo, {
        class: "text-right font-medium",
        modelValue: row.original
      });
    }
  },
  {
    accessorKey: "stock_amount",
    header: "Stock",
  },
  {
    accessorKey: "marker",
    header: "Todays deal",
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        checked: !!row.original.marker.find(i => i.name === 'todays-deal'),
        "onUpdate:checked": () => markProductAs(id, "todays-deal"),
      });
    },
  },
  {
    accessorKey: "approved_at",
    header: "Approved",
    cell: ({ row }) => {
      return h('small', {
        class: 'bg-red-500 px-3 py-2 rounded-full text-white',
        innerHTML: row.original.approved_at || 'Pending'
      })
    },
  },
  {
    accessorKey: "stock_amount",
    header: "Options",
  },
  // {
  //   accessorKey: "pending",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Status"),
  //   cell: ({ row }) => {
  //     const pending = row.original.status;
  //     const id = row.original.id; // Fix the typo here
  //     if (pending === "pending") {
  //       return h(
  //         Badge,
  //         {
  //           class: "bg-yellow-200",
  //         },
  //         pending
  //       );
  //     } else {
  //       return h(
  //         Badge,
  //         {
  //           class: "bg-green-500",
  //         },
  //         pending
  //       );
  //     }
  //   },
  // },
  // {
  //   id: "switch",
  //   header: () => h("div", { class: "text-right" }, "Best Sale"),
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(Switch, {
  //       class: "text-right font-medium",
  //       modelValue: row.original.featured,
  //       "onUpdate:checked": () => markProductAs(id, "best-sale"),
  //     });
  //   },
  // },
  // {
  //   id: "switch",
  //   header: () => h("div", { class: "text-right" }, "Deal of the Month"),
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(Switch, {
  //       class: "text-right font-medium",
  //       modelValue: row.original.featured,
  //       "onUpdate:checked": () => markProductAs(id, "deal-of-the-month"),
  //     });
  //   },
  // },
  // {
  //   id: "switch",
  //   header: () => h("div", { class: "text-right" }, "Electric"),
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(Switch, {
  //       class: "text-right font-medium",
  //       modelValue: row.original.featured,
  //       "onUpdate:checked": () => markProductAs(id, "electric"),
  //     });
  //   },
  // },
  // {
  //   id: "switch",
  //   header: () => h("div", { class: "text-right" }, "Featured Product"),
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(Switch, {
  //       class: "text-right font-medium",
  //       modelValue: row.original.featured,
  //       "onUpdate:checked": () => markProductAs(id, "featured-product"),
  //     });
  //   },
  // },
  // {
  //   id: "switch",
  //   header: () => h("div", { class: "text-right" }, "Flash Sale Offer"),
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     return h(Switch, {
  //       class: "text-right font-medium",
  //       modelValue: row.original.featured,
  //       "onUpdate:checked": () => markProductAs(id, "flash_sale_offers"),
  //     });
  //   },
  // },
  // {
  //   id: "switch",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Approval"),
  //   cell: ({ row }) => {
  //     const pending = row.original.status;
  //     const id = row.original.id;
  //     if (pending === "pending") {
  //       return h(Switch, {
  //         "onUpdate:checked": () => handleSwitchChange(id)
  //       });
  //     } else {
  //       return h(Switch, {
  //         checked: true,
  //         disabled: true,
  //         "aria-readonly": true,
  //       });
  //     }
  //   },
  // }
];
