import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown";

import Badge from "~/components/ui/badge/Badge.vue";
import Switch from "~/components/ui/switch/Switch.vue";
import ButtonForDataTable from "~/components/ButtonForDataTable.vue";

const handleSwitchChange = async (id: string) => {
  const token = useTokenStore();

  try {
    const response = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/approve/user/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token.getToken}`,
        },
      }
    );
    alert("Approved");
    // toast({ title: "Approved!", variant: "default" });

    await refreshNuxtData();

    // Refresh products list after update
  } catch (error) {
    // toast({ title: "Something went wrong", variant: "desturctive" });
    await refreshNuxtData();
    alert("Not approved");
    console.log(error);
  }
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "text-right" }, "Name"),
  },
  {
    accessorKey: "mobile",
    header: () => h("div", { class: "text-right" }, "Mobile"),
  },
  {
    accessorKey: "email",
    header: () => h("div", { class: "text-right" }, "Email"),
  },
  {
    accessorKey: "nid",
    header: () => h("div", { class: "text-right" }, "NID"),
  },
  {
    id: "switch",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Approval"),
    cell: ({ row }) => {
      const approved = row.getValue("approved_at");
      const id = row.original.id; // Fix the typo here
      if (approved) {
        return h(Switch, {
          checked: true,
          disabled: true,
          "aria-readonly": true,
        });
      } else {
        return h(Switch, {
          "onUpdate:checked": () => handleSwitchChange(id), // Wrap the handler in a function
        });
      }
    },
  },
  {
    id: "switch",
    enableHiding: false,
    header: () => h("div", { class: "text-left" }, "Approval"),
    cell: ({ row }) => {
      const approved = row.getValue("approved_at");
      if (approved) {
        return h(
          "div",
          { class: "relative " },
          h(Badge, { class: "bg-green-500 text-white" }, "Approved")
        );
      } else {
        return h(
          "div",
          { class: "relative  " },
          h(Badge, { class: "bg-yellow-800 text-white" }, "Not Approved")
        );
      }
    },
  },
  // {
  //   id: "dropDown",
  //   enableHiding: false,
  //   header: () => h("div", { class: "text-left" }, "Options"),
  //   cell: ({ row }) => {
  //     return h(
  //       "div",
  //       { class: "relative" },
  //       h(DropdownAction, { class: "bg-green-500 text-white" }, "Regular")
  //     );
  //   },
  // },

  // Add other columns as needed...
];
