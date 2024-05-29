<script setup>

</script>

<template>
    <div class=" w-full flex flex-col gap-4">
        <HeaderWithDot header="File & Media"></HeaderWithDot>
        <div class="w-full">
            <div class="flex text-nowrap w-full  gap-1.5">

                <div class="flex w-full flex-col gap-4">
                    <div class="flex items-center gap-4">
                        <Label for="picture">Picture</Label>
                        <Input id="picture" type="file" />
                    </div>
                    <div class="border h-[131px] rounded flex gap-x-8 p-4 ">
                        <Icon name="fluent:image-16-filled" class=" text-8xl"></Icon>
                        <Icon name="fluent:image-16-filled" class=" text-8xl"></Icon>

                        <Icon name="fluent:image-16-filled" class=" text-8xl"></Icon>
                        <Icon name="fluent:add-circle-16-filled" class=" text-8xl"></Icon>

                    </div>
                </div>
            </div>


        </div>
        <div class="flex gap-8">
            <div class="w-full max-w-sm flex text-nowrap items-center gap-2 ">
                <Label for="brandName">Video Provider</Label>
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
                <Label for="tags">Video Links</Label>
                <Input id="tags" type="text" placeholder="Video Links" />
            </div>
        </div>


    </div>

</template>