<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'


</script>

<template>

    <div class="w-[325px] flex flex-col items-center p-4 md:h-[960px] bg-[#F57F20]/40  ">

        <h1 class=" text-start text-2xl font-bold p-4">Filters</h1>

        <div class="w-full flex flex-col gap-8">
            <div class="flex flex-col gap-4">
                <h1 class=" font-bold">Brand</h1>
                <RadioGroup default-value="option-one">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                </RadioGroup>
            </div>
            <div class="flex flex-col gap-4">
                <h1 class=" font-bold">Condtition</h1>
                <RadioGroup default-value="option-one">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                </RadioGroup>
            </div>

            <div class="w-full flex-col rounded gap-4 h-[121px] bg-white flex items-center  p-4 ">
                <div class=" w-full ">
                    <h1>Price</h1>
                </div>
                <div>

                </div>
                <Slider :max="100" :step="1" />
            </div>

            <div class=" flex flex-col gap-4">
                <div class=" flex  items-center gap-2">
                    <Icon name='fa:location-arrow'></Icon>
                    <h1 class=" font-bold">Location</h1>
                </div>
                <RadioGroup default-value="option-one">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Toyota</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="option-one" value="Toyota" />
                        <Label for="toyota">Honda</Label>
                    </div>
                </RadioGroup>

            </div>

        </div>


    </div>
</template>