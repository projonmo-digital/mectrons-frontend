<script setup lang="ts">
import { ref, onMounted } from 'vue'
interface Props {
    name: string
    item: any
    valueKey: string
    children: string
    value: any
}
const props = defineProps<Props>()
const emits = defineEmits(['input', 'expand'])

const input = ref<HTMLInputElement | null>(null)

const isExpanded = ref(false)

const expand = () => {
    isExpanded.value = true
    emits('expand')
}

onMounted(() => {
    if (props.value?.toString() === props.item[props.valueKey]?.toString()) {
        emits('expand')
    }
})

</script>

<template>
    <div class="flex items-center gap-3">
        <input ref="input" type="radio" :name @input="emits('input', $event)" :value="item[valueKey]" v-bind="$attrs"
            :checked="item[valueKey]?.toString() === value?.toString()">
        <label class="text-sm cursor-pointer" @click="input ? input.click() : ''"
            :class="{ 'text-primary': item[valueKey]?.toString() === value?.toString() }" for="">{{ item.name }}</label>
        <div v-if="item[children].length" @click="isExpanded = !isExpanded"
            class="hover:text-primary cursor-pointer text-sm flex rounded-full items-center justify-center h-6-w-6"
            :class="{ 'text-primary': isExpanded }">
            <Icon class="w-4 h-4" :name="isExpanded ? 'ic:baseline-minus' : 'ic:baseline-plus'"></Icon>
        </div>
    </div>
    <div class="ml-5" v-show="isExpanded">
        <RadioInputItem v-for="(item, index) in item[children]" @input="emits('input', $event)" @expand="expand" v-bind="$attrs"
            :value="value" :name :valueKey :item :children :key="`radio-item-${index}`" />
    </div>
</template>

<style scoped lang="scss">
input[type='radio'] {
    @apply accent-primary;
}
</style>