<script setup lang="ts">
const items= [
      {
        "icon": "brakes",
        "label": "Brakes",
        "action": null,
        "subMenu": [
          {
            "label": "Brake Pads",
            "action": null
          },
          {
            "label": "Brake Fluid",
            "action": null
          }
        ]
      },
      {
        "icon": "filter",
        "label": "Filter",
        "action": {
          "type": "button",
          "label": "Apply Filter"
        },
        "subMenu": [
          {
            "label": "Air Filters",
            "action": null
          },
          {
            "label": "Oil Filters",
            "action": null
          }
        ]
      },
      {
        "icon": "lubricant",
        "label": "Lubricant",
        "action": null,
        "subMenu": [
          {
            "label": "Engine Oil",
            "action": null
          },
          {
            "label": "Grease",
            "action": null
          }
        ]
      },
      {
        "icon": "tyre",
        "label": "Tyre",
        "action": null,
        "subMenu": [
          {
            "label": "Summer Tyres",
            "action": null
          },
          {
            "label": "Winter Tyres",
            "action": null
          }
        ]
      },
      {
        "icon": "horn",
        "label": "Horn",
        "action": null,
        "subMenu": [
          {
            "label": "Standard Horn",
            "action": null
          },
          {
            "label": "Air Horn",
            "action": null
          }
        ]
      }
    ]
   

</script>

<template>
  <div class="w-[262px] bg-[#EAE5E2]/50 p-4 flex flex-col gap-8 ">
    <h1 class="text-center text-2xl font-bold text-primary">Categories</h1>
    <DropdownMenu class="bg-white" v-for="i in items">
      <DropdownMenuTrigger as-child>
        <Button class=" flex justify-between bg-white text-black" >
         <div >
          {{i.label}}
         </div>
         <Icon name=">"  class="text-5xl font-bold">  </Icon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56 bg-white">
        <DropdownMenuItem v-for="j in i.subMenu">
          {{j.label}}
          
        </DropdownMenuItem>
       
        
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>