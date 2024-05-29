import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Switch from "~/components/ui/switch/Switch.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Name",
    header: () => h("div", { class: "text-right" }, "Name"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "Brokes");
    },
  },
  {
    accessorKey: "QTY",
    header: () => h("div", { class: "text-right" }, "Qty"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "2");
    },
  },
  {
    accessorKey: "Price",
    header: () => h("div", { class: "text-right" }, "price"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "$450");
    },
  },
  {
    accessorKey: "approval",
    header: () => h("div", { class: "" }, "Approval"),
    cell: ({ row }) => {
      return h(
        Badge,
        { class: "text-right  text-white bg-green-500 font-medium" },
        "Approved"
      );
    },
  },
  {
    id: "switch",
    enableHiding: false,
    header: () => h("div", { class: "" }, "Published"),
    cell: ({ row }) => {
      const todayDeal = row.getValue("todayDeal");

      return h("div", { class: "relative  " }, h(Switch, { todayDeal }));
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
