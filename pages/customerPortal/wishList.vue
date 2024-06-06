<script setup>
import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination'

import {
    Button,
} from '@/components/ui/button'

</script>

<template>
    <div>
        <div class=" flex flex-col gap-8">
            <h1 class=" text-primary font-bold text-2xl ">Wishlist</h1>
            <Separator class=" bg-primary"></Separator>
        </div>
        <div class=" grid grid-cols-3 mt-4 place-items-center p-4 gap-8 justify-center">
            <ProductCardMe v-for="(_, index) in 6"></ProductCardMe>
        </div>

        <div class="flex justify-center mt-4">
            <Pagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="2">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />

                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>

                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>



    </div>
</template>