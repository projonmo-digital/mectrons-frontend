<script setup>

</script>

<template>
    <div class="flex flex-col gap-4">
        <HeaderWithDot header="SEO"></HeaderWithDot>
        <div class="flex text-nowrap w-full  items-center gap-1.5">
            <Label for="tags">Media Title</Label>
            <Input id="tags" type="text" placeholder="Media Title" />
        </div>

        <div>
            <Label for="description" class=" ">Description</Label>
            <Textarea class=" h-[331px] resize-none"></Textarea>
        </div>
    </div>
</template>