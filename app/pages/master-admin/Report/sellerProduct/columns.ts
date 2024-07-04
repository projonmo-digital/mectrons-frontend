import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Seller Name",
    header: () => h("div", { class: "text-right font-bold" }, "Seller  Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Faruk Hossian");
    },
  },
  {
    accessorKey: "Shop Name",
    header: () => h("div", { class: "text-right font-bold" }, "Shop Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Shawn Garage");
    },
  },
  {
    accessorKey: "no",
    header: () => h("div", { class: "text-right font-bold" }, "No Of Product"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "50000000");
    },
  },
  {
    accessorKey: "no",
    header: () => h("div", { class: "text-right font-bold" }, "Order Amount"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "500");
    },
  },

  // Add other columns as needed...
];
