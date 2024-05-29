<script setup>

</script>

<template>
    <div class=" w-full flex flex-col gap-4">
        <HeaderWithDot header="Price Stock" </HeaderWithDot>

            <div class=" flex flex-col gap-8">
                <div class="flex text-nowrap w-full items-center gap-1.5">
                    <Label for="unitPrice">Unit Price</Label>
                    <Input id="unitPrice" type="number" placeholder="0" />
                </div>



                <div class=" flex gap-8 ">
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="productName">Product Name</Label>
                        <Input id="productName" type="text" placeholder="Product Name" />
                    </div>
                    <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                        <Label for="stock">stock</Label>
                        <Input id="stock" type="text" placeholder="Stock" />
                    </div>
                </div>
            </div>
    </div>
</template>