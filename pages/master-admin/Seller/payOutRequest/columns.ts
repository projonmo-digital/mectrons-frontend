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
    accessorKey: "Total Amount",
    header: () => h("div", { class: "text-right" }, "Total Amount"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "$559");
    },
  },
  {
    accessorKey: "Requested Amount",
    header: () => h("div", { class: "text-right" }, "Requested Amount"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "$440");
    },
  },
  {
    accessorKey: "Message",
    header: () => h("div", { class: "text-right" }, "Message"),
    cell: ({ row }) => {
      return h(
        "p",
        { class: "text-right font-medium  text-wrap" },
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
      );
    },
  },
  {
    accessorKey: "Status",
    header: () => h("div", { class: "text-right" }, "Requested Amount"),
    cell: ({ row }) => {
      return h(
        Badge,
        { class: "text-right font-medium bg-green-500 text-white" },
        "Paid"
      );
    },
  },
  {
    accessorKey: "Status",
    header: () => h("div", { class: "text-right" }, "Requested Amount"),
    cell: ({ row }) => {
      return h(
        DropdownAction,
        { class: "text-right font-medium bg-green-500 text-white" },
        "Paid"
      );
    },
  },

  // Add other columns as needed...
];
