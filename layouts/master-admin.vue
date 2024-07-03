<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import SideBar from '../components/master-admin/SideBar.vue';

</script>
<template>
    <div class="flex w-full">
        <div class="p-5">
            <SideBar class="lg:block hidden"></SideBar>
        </div>
        <div>
            <!-- <div class="lg:hidden">
                <Sheet class="">
                    <SheetTrigger>
                        <Icon name="mdi:menu" class="h-9  w-9 font-bold text-primary"></Icon>
                    </SheetTrigger>
                    <SheetContent class="w-[400px] border-none" side="left">
                        <SideBar class="lg:hidden block"></SideBar>
                    </SheetContent>
                </Sheet>
            </div> -->
        </div>
        <div class="flex-1 p-5 pl-0">
            <slot />
        </div>
    </div>
</template>
