import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Button from "~/components/ui/button/Button.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Order No",
    header: () => h("div", { class: "text-right font-bold" }, "Order Id"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium text-primary" },
        "0000566"
      );
    },
  },
  {
    accessorKey: "Date",
    header: () => h("div", { class: "text-right font-bold" }, "Date"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "17-10-2024");
    },
  },
  {
    accessorKey: "Customer",
    header: () => h("div", { class: "text-right font-bold" }, "Customer"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Faruk Hassan");
    },
  },
  {
    accessorKey: "Amount",
    header: () => h("div", { class: "text-right font-bold" }, "Amount"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "$450");
    },
  },
  {
    accessorKey: "Payment Method",
    header: () => h("div", { class: "text-right font-bold" }, "Payment method"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Cash");
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
