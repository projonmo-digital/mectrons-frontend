<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

</script>

<template>
    <div class="grid  grid-cols-2 gap-4">
        <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
            <Label for="productName">Product Name</Label>
            <Input id="productName" type="text" placeholder="Product Name" />
        </div>
        <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
            <Label for="stock">stock</Label>
            <Input id="stock" type="text" placeholder="Stock" />
        </div>
        <div class="w-full max-w-sm flex text-nowrap items-center gap-2 ">
            <Label for="brandName">Brand Name</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">
                            Apple
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
            <Label for="tags">Tags</Label>
            <Input id="tags" type="text" placeholder="Tags" />
        </div>

        <div>
            <Label for="description" class=" ">Description</Label>
            <Textarea class=" h-[331px] resize-none"></Textarea>
        </div>

    </div>
</template>