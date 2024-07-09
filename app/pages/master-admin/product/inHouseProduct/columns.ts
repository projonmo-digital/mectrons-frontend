import { h, reactive, ref, watch } from "vue";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";

const product = reactive({
  product_id: "",
  name: "",
});

const getProducts = async () => {
  try {
    const { pending, data } = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/filter`,
      {
        method: "POST",
        body: {},
      }
    );
    refreshNuxtData(); // Ensure this is called after fetching data
  } catch (error) {
    console.log(error);
  }
};

watch(product, getProducts);

const handleSwitchChange = async (id: string, value: string) => {
  try {
    await useFetch(`${useRuntimeConfig().public.baseUrl}/product/mark-as`, {
      method: "POST",
      body: { id, value },
    });
    getProducts(); // Refresh products list after update
  } catch (error) {
    console.log(error);
  }
};

export const columns = [
  {
    accessorKey: "Name",
    header: () => h("div", { class: "text-right" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, row.original.name);
    },
  },
  {
    accessorKey: "QTY",
    header: () => h("div", { class: "text-right" }, "Qty"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, row.original.qty);
    },
  },
  {
    accessorKey: "approval",
    header: () => h("div", { class: "text-right" }, "Approval"),
    cell: ({ row }) => {
      return h(
        Badge,
        { class: "text-right font-medium bg-green-500 text-white" },
        row.original.approval ? "Approved" : "Pending"
      );
    },
  },
  {
    accessorKey: "bestSale",
    header: () => h("div", { class: "text-right" }, "Best Sale"),
    cell: ({ row }) => {
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.bestSale,
        "onUpdate:modelValue": (value) =>
          handleSwitchChange(row.original.id, value),
      });
    },
  },
  {
    accessorKey: "month",
    header: () => h("div", { class: "text-right" }, "Deal of the Month"),
    cell: ({ row }) => {
      return h(Switch, {
        checked: row.original.bestSale,
        disabled: true,
        "aria-readonly": true,
        "onUpdate:checked": (value) =>
          handleSwitchChange(row.original.id, value),
      });
    },
  },
  {
    accessorKey: "electric",
    header: () => h("div", { class: "text-right" }, "Electric"),
    cell: ({ row }) => {
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.electric,
        "onUpdate:modelValue": (value) =>
          handleSwitchChange(row.original.id, value),
      });
    },
  },
  {
    accessorKey: "featured",
    header: () => h("div", { class: "text-right" }, "Featured Product"),
    cell: ({ row }) => {
      return h(Switch, {
        class: "text-right font-medium",
        modelValue: row.original.featured,
        "onUpdate:modelValue": (value) =>
          handleSwitchChange(row.original.id, value),
      });
    },
  },
  {
    id: "buttonfordatatable",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Options"),
    cell: ({ row }) => {
      return h("div", { class: "relative" }, h(ButtonForDataTable));
    },
  },
];
