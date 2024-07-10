import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Button from "~/components/ui/button/Button.vue";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "order",
    header: () => h("div", { class: "" }, "Order ID"),
    cell: ({ row }) => {
      return h("div", { class: " text-primary font-medium" }, "0000123");
    },
  },
  {
    accessorKey: "Qty",
    header: () => h("div", { class: "" }, "Qty"),
    cell: ({ row }) => {
      return h("div", { class: "  font-medium" }, "2");
    },
  },
  {
    accessorKey: "Coustomer",
    header: () => h("div", { class: "" }, "Customer"),
    cell: ({ row }) => {
      return h("div", { class: "  font-medium" }, "Faruk Hossen");
    },
  },
  {
    accessorKey: "Amount",
    header: () => h("div", { class: "" }, "Amount"),
    cell: ({ row }) => {
      return h("div", { class: "  font-medium" }, "$450");
    },
  },
  {
    accessorKey: "delivery",
    header: () => h("div", { class: "" }, "Delivery Status"),
    cell: ({ row }) => {
      return h("p", { class: "text-green-500 " }, "Delivered");
    },
  },
  {
    accessorKey: "Payment",
    header: () => h("div", { class: "" }, "Delivery Status"),
    cell: ({ row }) => {
      return h(Badge, { class: " text-white bg-green-500" }, "Paid");
    },
  },
  {
    accessorKey: "Options",
    header: () => h("div", { class: "" }, "Delivery Status"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: " text-white flex gap-2 " },
        h(Button, { class: "bg-[#2489BE]/50" }, "👁️"),
        h(Button, { class: "bg-yellow-400" }, "Download")
      );
    },
  },

  // Add other columns as needed...
];
