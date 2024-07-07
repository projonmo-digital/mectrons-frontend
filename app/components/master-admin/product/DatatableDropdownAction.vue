<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface IAction {
    title: string
    method: Function
}

interface Props {
    action: IAction[]
    row: any
    class: string
}

const props = defineProps<Props>()
function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem v-for="(action, index) in action" :key="`action-${index}`" @click="action.method(row)">
                    {{ action.title }}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenuContent>
    </DropdownMenu>
</template>