<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import Reviews from './Reviews.vue';
import AddReview from './AddReview.vue'

const emit = defineEmits(['success'])

const props = defineProps(['product'])

const re_render = ref(0)

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
            <table class="w-full table border">
                <tr class="border" v-for="(ot, index) in product?.others" :key="ot.id">
                    <td class="p-3 capitalize">{{ ot.name.split('_').join(' ') }}</td>
                    <td>:</td>
                    <td class="p-3">{{ ot.value }}</td>
                </tr>
            </table>
        </TabsContent>
        <TabsContent value="review">
            <div>
                <AddReview :product="product" @success="re_render++" />
                <hr>
                <Reviews :product="product" :key="re_render" />
            </div>
        </TabsContent>
    </TabsRoot>
</template>