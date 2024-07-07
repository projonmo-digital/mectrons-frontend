import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";
import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";
import Button from "~/components/ui/button/Button.vue";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "Date",
    header: () => h("div", { class: "text-right font-bold" }, "Date"),
    cell: ({ row }) => {
      return h("div", { class: "text-right font-medium" }, "17-10-2024");
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
    accessorKey: "Status",
    header: () => h("div", { class: " font-bold" }, "Status"),
    cell: ({ row }) => {
      return h(
        Badge,
        { class: "text-right bg-green-500 text-white font-medium" },
        "Cash"
      );
    },
  },
  {
    accessorKey: "message",
    header: () => h("div", { class: " font-bold " }, "Message"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: " max-w-[362px] text-start  font-medium" },
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  "
      );
    },
  },

  // Add other columns as needed...
];
