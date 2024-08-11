<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
const props = defineProps(['product'])

</script>

<template>
    <TabsRoot default-value="description">
        <TabsList class="relative shrink-0 flex justify-center border-b" aria-label="Manage your account">
            <TabsIndicator
                class="absolute left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300">
                <div class="bg-primary w-full h-full" />
            </TabsIndicator>
            <TabsTrigger class="p-3 font-bold data-[state=active]:text-primary" value="description">Description
            </TabsTrigger>
            <TabsTrigger class="p-3 font-bold data-[state=active]:text-primary" value="specification">Specification
            </TabsTrigger>
            <TabsTrigger class="p-3 font-bold data-[state=active]:text-primary" value="review">Review</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
            <h1 class="text-2xl my-3">Description</h1>
            <div v-html="product?.description"></div>
        </TabsContent>
        <TabsContent value="specification">
            <h1 class="text-2xl my-3">Specification</h1>
            <table class="w-full border">
                <tr class="border" v-for="(ot, index) in product?.others" :key="ot.id">
                    <td class="p-3 capitalize">{{ ot.name }}</td>
                    <td>:</td>
                    <td class="p-3">{{ ot.value }}</td>
                </tr>
            </table>
        </TabsContent>
        <TabsContent value="review">
            review 2
        </TabsContent>
    </TabsRoot>
</template>