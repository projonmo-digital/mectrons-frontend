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
    accessorKey: "Mobile",
    header: () => h("div", { class: "text-right" }, "Parent Category"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "017xxxxxxxxx98");
    },
  },
  {
    accessorKey: "Email",
    header: () => h("div", { class: "text-right" }, "Email"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "abc@gmail.com");
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
