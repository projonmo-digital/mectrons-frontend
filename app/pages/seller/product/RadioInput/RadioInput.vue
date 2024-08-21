<script setup lang="ts">
import RadioInputItem from './RadioInputItem.vue';
interface Props {
    list: any[]
    name?: string
    valueKey?: string
    children?: string
}
const props = withDefaults(defineProps<Props>(), {
    valueKey: 'id',
    children: 'children',
    name: 'name'
})

const model = defineModel()

const inputChange = (e: any) => {
    model.value = e.target.value
}
</script>

<template>
    <form>
        <RadioInputItem v-for="(item, index) in list" :name :item :children :valueKey :value="model" disabled
            :key="`radio-item-${index}`" @input="inputChange" />
    </form>
</template>