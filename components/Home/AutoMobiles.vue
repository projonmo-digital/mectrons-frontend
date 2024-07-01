<script setup>
import {
       DropdownMenu,
       DropdownMenuContent,
       DropdownMenuGroup,
       DropdownMenuItem,
       DropdownMenuLabel,
       DropdownMenuPortal,
       DropdownMenuSeparator,
       DropdownMenuShortcut,
       DropdownMenuSub,
       DropdownMenuSubContent,
       DropdownMenuSubTrigger,
       DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const store = useUtils()
const categories = await store.getCetagories()
const finalCategories = categories.categories

const categoryByPage = (id) => {
       navigateTo(`/category/${id}`)
}



</script>

<template>
       <div>

              <DropdownMenu>
                     <DropdownMenuTrigger class="text-[20px]  flex items-center font-bold hover:underline">
                            <span>Automobiles </span>
                            <Icon name="fluent:chevron-down-16-regular" class="font-bold"></Icon>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent class="flex flex-col gap-4">
                            <DropdownMenuItem class="flex flex-col gap-4">
                                   <DropdownMenuSub class="bg-white flex" v-for="(i, j) in finalCategories">
                                          <DropdownMenuSubTrigger class="w-full"
                                                 v-if="i.name.includes('Automobile') && j < 4">
                                                 <div class="text-wrap text-xs">
                                                        {{ i.name }}
                                                 </div>
                                          </DropdownMenuSubTrigger>
                                          <DropdownMenuPortal>
                                                 <DropdownMenuSubContent>




                                                        <div v-for="(j, index2) in i.children">
                                                               <DropdownMenuSub class="bg-white"
                                                                      v-if="j.children?.length > 0">
                                                                      <DropdownMenuSubTrigger v-if="j.children">
                                                                             <div class="text-wrap text-xs">
                                                                                    {{ j.name }}
                                                                             </div>

                                                                      </DropdownMenuSubTrigger>
                                                                      <DropdownMenuPortal v-if="j.children?.length > 0">
                                                                             <DropdownMenuSubContent
                                                                                    v-if="!j.children == []"
                                                                                    class="bg-white flex flex-col gap-2">
                                                                                    <DropdownMenuItem v-if="j.children"
                                                                                           v-for="(k, index2) in j.children">
                                                                                           <Button @click="categoryByPage(k.id)"
                                                                                                  class=" flex justify-between w-full h-auto text-sm bg-white text-black">
                                                                                                  <div
                                                                                                         class="text-wrap text-xs">
                                                                                                         {{
                                                                                                                k.name
                                                                                                         }}
                                                                                                  </div>

                                                                                           </Button>
                                                                                    </DropdownMenuItem>
                                                                                    <DropdownMenuSeparator />

                                                                             </DropdownMenuSubContent>
                                                                      </DropdownMenuPortal>
                                                               </DropdownMenuSub>
                                                               <DropdownMenuItem v-else><Button
                                                                             @click="categoryByPage(j.id)"
                                                                             class=" flex justify-start w-full h-auto text-sm bg-white text-black">
                                                                             <div class="text-wrap text-xs">
                                                                                    {{ j.name }}
                                                                             </div>

                                                                      </Button></DropdownMenuItem>

                                                        </div>


                                                 </DropdownMenuSubContent>

                                          </DropdownMenuPortal>


                                   </DropdownMenuSub>
                            </DropdownMenuItem>

                     </DropdownMenuContent>
              </DropdownMenu>

       </div>
</template>