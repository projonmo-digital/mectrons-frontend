<script setup>

</script>

<template>
    <div class=" flex flex-col gap-4">
        <HeaderWithDot header="Shipping Configuration" </HeaderWithDot>

            <div class="grid grid-cols-2 gap-16">
                <div class="flex items-center space-x-2 w-full justify-between ">
                    <Label for="airplane-mode">Cash on delivery</Label>
                    <Switch id="airplane-mode" class=" " />

                </div>
                <div class="flex items-center space-x-2  w-full justify-between">
                    <Label for="airplane-mode">Flash Rate</Label>
                    <Switch id="airplane-mode" class=" " />

                </div>
                <div class="flex items-center space-x-2  w-full justify-between">
                    <Label for="airplane-mode">Free Shipping</Label>
                    <Switch id="airplane-mode" class=" " />

                </div>
                <div class="flex items-center space-x-2  w-full justify-between">
                    <Label for="airplane-mode">Is Product Quantity Multiply </Label>
                    <Switch id="airplane-mode" class=" " />

                </div>
            </div>
    </div>
</template>