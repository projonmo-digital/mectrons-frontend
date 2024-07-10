<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'


</script>
<template>
    <div class="flex w-full  ">
        <CustomerSidebar></CustomerSidebar>

        <div>
            <div class="lg:hidden">
                <Sheet class="">
                    <SheetTrigger>
                        <Icon name="mdi:menu" class="h-9  w-9 font-bold text-primary "></Icon>
                    </SheetTrigger>
                    <SheetContent class="w-[400px] border-none" side="left">
                        <CustomerSideBar class="lg:hidden block"></CustomerSideBar>

                    </SheetContent>
                </Sheet>
            </div>

        </div>
        <div class="lg:p-8 p-4 w-full">
            <slot />
        </div>
    </div>
</template>
