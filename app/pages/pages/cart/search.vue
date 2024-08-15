<script setup lang="ts">
import { ref } from 'vue'

const router  = useRouter()

const search = (event: any) =>{
    let fromData = new FormData(event.target)
    let mega_id = fromData.get('mega_id')
    router.push(`/pages/cart/${mega_id}`)
}

</script>
<template>
    <div class="relative min-h-[300px] flex items-center justify-center">
        <div class="text-center flex gap-5 flex-col">
            <h3 class="text-gray-800 text-3xl">Track your Order</h3>
            <form @submit.prevent="search" class="flex">
                <input class="border border-primary p-3" placeholder="YOUR TRACK ID" type="search" name="mega_id" id="">
                <button class="bg-primary hover:bg-orange-500 cursor-pointer text-white p-3" type="submit">Search</button>
            </form>
        </div>
    </div>
</template>