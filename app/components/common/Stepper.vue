<script setup lang="ts">
import { StepperIndicator, StepperItem, StepperRoot, StepperSeparator, StepperTitle } from 'radix-vue'

interface IStep {
    step: number
    title: string
    done: boolean
}

interface Props {
    steps: IStep[]
}

const props = defineProps<Props>()

</script>

<template>
<StepperRoot :default-value="2" class="flex gap-2 w-full">
    <StepperItem v-for="(item, index) in steps" :key="item.step"
        class="w-full flex justify-center gap-2 cursor-pointer group data-[disabled]:pointer-events-none relative px-4"
        :step="item.step">
        <StepperIndicator class="border border-gray-400 w-12 h-12 rounded-full flex justify-center items-center" :class="{ 'border-primary': item.done }">
            <Icon name="radix-icons:check" class="w-5 h-5 text-gray-500" :class="{ 'text-primary': item.done }" />
        </StepperIndicator>

        <StepperSeparator v-if="item.step !== steps[steps.length - 1].step"
        class="absolute block top-6 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full bg-gray-400 shrink-0"
        :class="{ 'bg-primary': item.done }"
        />

        <div class="absolute text-center top-full text-gray-400 left-0 w-full mt-2" :class="{ 'text-primary': item.done }">
        <StepperTitle class="font-medium"> {{ item.title }} </StepperTitle>
        </div>
    </StepperItem>
</StepperRoot>
</template>