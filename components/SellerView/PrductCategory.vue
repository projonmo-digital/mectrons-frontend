<script setup>

</script>

<template>
    <div class="shadow-2xl border p-4 ">
        <HeaderWithDot header="Product Category" area="w-[40%]"></HeaderWithDot>
        <div class=" flex  w-full  justify-around">
            <div class="flex flex-col gap-2 ">
                <div class="flex gap-2 items-center text-xl">
                    <Icon name="fluent:box-16-regular" </Icon>
                        <p>Product</p>
                </div>
                <RadioGroup default-value="product">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="autoMobiles_tools" value="automobiles Tools" />
                        <Label for="automobiles Tools">Automobiles Tools</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-two" value="equipment" />
                        <Label for="equipment">Equipment</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-two" value="electronics" />
                        <Label for="electronics">Electronics</Label>
                    </div>
                </RadioGroup>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex gap-2 items-center text-xl">
                    <Icon name="fluent:key-20-regular" </Icon>
                        <p>Services</p>
                </div>
                <RadioGroup default-value="servieces">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="engyne" />
                        <Label for="automobiles Tools">Engyne</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-two" value="lpg" />
                        <Label for="lpg">Lpg</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-two" value="airCondtion" />
                        <Label for="airCondition">Air condition</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    </div>
</template>