import { h } from "vue";

import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Badge from "~/components/ui/badge/Badge.vue";
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
  const token = useTokenStore();

  try {
    const response = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/approve/product/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.getToken}`,
        },
        body: {
          id: id,
          name: value,
        },
      }
    );
    alert("Marked");
    // toast({ title: "Approved!", variant: "default" });

    await refreshNuxtData();

    // Refresh products list after update
  } catch (error) {
    // toast({ title: "Something went wrong", variant: "desturctive" });
    await refreshNuxtData();
    alert("Unable to mark");
    console.log(error);
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: () => h("div", { class: "text-start" }, "Name"),
    // cell: ({ row }) => {
    //   return h(
    //     "div",
    //     { class: "text-right font-medium" },
    //     row.getValue("name")
    //   );
    // },
  },
  // {
  //   accessorKey: "info",
  //   header: () => h("div", { class: "text-start" }, "Info"),
  //   cell: ({ row }) => {
  //     const info = row.getValue("info");

  //     return h("div", { class: "text-start" }, [
  //       h("div", [
  //         h("span", { class: "font-bold" }, "Num of sale:"),
  //         ` ${info.numOfSale} times`,
  //       ]),
  //       h("div", [
  //         h("span", { class: "font-bold" }, "Base Price:"),
  //         ` $${info.basePrice}`,
  //       ]),
  //       h("div", [
  //         h("span", { class: "font-bold" }, "Rating:"),
  //         ` ${info.rating}`,
  //       ]),
  //     ]);
  //   },
  // },
  {
    accessorKey: "stock_amount",
    header: "Stock",
  },

  {
    accessorKey: "pending",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Status"),
    cell: ({ row }) => {
      const pending = row.original.status;
      const id = row.original.id; // Fix the typo here
      if (pending === "pending") {
        return h(
          Badge,
          {
            class: "bg-yellow-200",
          },
          pending
        );
      } else {
        return h(
          Badge,
          {
            class: "bg-green-500",
          },
          pending
        );
      }
    },
  },
  {
    id: "switch",
    header: () => h("div", { class: "text-right" }, "Best Sale"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:checked": () => markProductAs(id, "best-sale"),
      });
    },
  },
  {
    id: "switch",
    header: () => h("div", { class: "text-right" }, "Deal of the Month"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:checked": () => markProductAs(id, "deal-of-the-month"),
      });
    },
  },
  {
    id: "switch",
    header: () => h("div", { class: "text-right" }, "Electric"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:checked": () => markProductAs(id, "electric"),
      });
    },
  },
  {
    id: "switch",
    header: () => h("div", { class: "text-right" }, "Featured Product"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:checked": () => markProductAs(id, "featured-product"),
      });
    },
  },
  {
    id: "switch",
    header: () => h("div", { class: "text-right" }, "Flash Sale Offer"),
    cell: ({ row }) => {
      const id = row.original.id;
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:checked": () => markProductAs(id, "flash_sale_offers"),
      });
    },
  },
  {
    id: "switch",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Approval"),
    cell: ({ row }) => {
      const pending = row.original.status;
      const id = row.original.id; // Fix the typo here
      if (pending === "pending") {
        return h(Switch, {
          "onUpdate:checked": () => handleSwitchChange(id), // Wrap the handler in a function
        });
      } else {
        return h(Switch, {
          checked: true,
          disabled: true,
          "aria-readonly": true,
        });
      }
    },
  },
  // {
  //   id: "switch",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Todays Deal"),
  //   cell: ({ row }) => {
  //     const todayDeal = row.getValue("todayDeal");

  //     return h("div", { class: "relative  " }, h(Switch, { todayDeal }));
  //   },
  // },

  // {
  //   id: "published",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Published"),
  //   cell: ({ row }) => {
  //     const todayDeal = row.getValue("published");

  //     return h("div", { class: "relative  " }, h(Switch, { todayDeal }));
  //   },
  // },
  // {
  //   id: "buttonfordatatable",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Todays Deal"),
  //   cell: ({ row }) => {
  //     const todayDeal = row.getValue("todayDeal");

  //     return h("div", { class: "relative  " }, h(ButtonForDataTable));
  //   },
  // },
  // Add other columns as needed...
];
