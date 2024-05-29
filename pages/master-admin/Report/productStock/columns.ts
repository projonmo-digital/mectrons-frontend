import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "No",
    header: () => h("div", { class: "text-right font-bold" }, "#"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, `${row.index + 1}`);
    },
  },
  {
    accessorKey: "Mobile",
    header: () => h("div", { class: "text-right font-bold" }, "Product name"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right font-medium" },
        "Appolo 2 Wheel Tyre"
      );
    },
  },
  {
    accessorKey: "sell",
    header: () => h("div", { class: "text-right font-bold" }, "No Of Sell"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "50000000");
    },
  },

  // Add other columns as needed...
];
