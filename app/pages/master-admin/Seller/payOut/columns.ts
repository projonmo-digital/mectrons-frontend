import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: () => h("div", { class: "text-right" }, "Date"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "17-4-2024");
    },
  },
  {
    accessorKey: "Seller",
    header: () => h("div", { class: "text-right" }, "Seller"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Faruk Via");
    },
  },
  {
    accessorKey: "Amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "$559");
    },
  },
  {
    accessorKey: "Payment Details",
    header: () => h("div", { class: "text-right" }, "Payment Details"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Cash");
    },
  },

  // Add other columns as needed...
];
