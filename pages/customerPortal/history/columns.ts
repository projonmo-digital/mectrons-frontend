import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Name",
    header: () => h("div", { class: "text-right" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Brokes");
    },
  },
  {
    accessorKey: "Parent Category",
    header: () => h("div", { class: "text-right" }, "Parent Category"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "-");
    },
  },
  {
    accessorKey: "Order Level",
    header: () => h("div", { class: "text-right" }, "Order Level"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "0");
    },
  },
  {
    accessorKey: "Level",
    header: () => h("div", { class: "text-right" }, "Level"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "0");
    },
  },
  {
    accessorKey: "Image",
    header: () => h("div", { class: "text-right" }, "image"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "0");
    },
  },
  {
    accessorKey: "Commision",
    header: () => h("div", { class: "text-center" }, "Commission"),
    cell: ({ row }) => {
      return h("div", { class: "text-center font-medium" }, "0%");
    },
  },
  {
    id: "buttonfordatatable",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Opitons"),
    cell: ({ row }) => {
      const todayDeal = row.getValue("todayDeal");

      return h("div", { class: "relative  " }, h(ButtonForDataTable));
    },
  },

  // Add other columns as needed...
];
