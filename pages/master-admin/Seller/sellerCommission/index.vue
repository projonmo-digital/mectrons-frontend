<script setup>

</script>
<template>
    <div class="lg:p-8 md:p-4 p-2 w-full flex flex-col gap-4">
    <header-with-hr header="Seller Commission"></header-with-hr>
    <div class="w-full flex justify-center">
        <div class="w-[615px] flex flex-col gap-4  p-4">
         <div class=" border h-[48px] w-full rounded-lg p-2 flex items-center justify-between">
            <p>Seller Commision Activision</p>
            <switch-for-data-table></switch-for-data-table>

         </div>
         <div class=" border h-[48px] w-full rounded-lg p-2 flex items-center justify-between">
            <p>Seller Commision Activision</p>
            <switch-for-data-table></switch-for-data-table>

         </div>
         <div class=" border  w-full rounded-lg p-4 flex gap-4 flex-col  ">
            <h1 class="text-2xl">Seller Commission</h1>
            <Separator></Separator>
            <div class="flex justify-between items-center">
                <p>Seller Commission</p>
                <div class="border p-2 w-[50%] items-center border-black rounded-xl flex justify-between">
                    <Input   class="border-none text-slate-400" placeholder="25" ></Input>
                    <Icon name='fa:percent'></Icon>
                </div>
            </div>
            <div class="w-full flex justify-end"><Button class="rounded-xl">Save</Button></div>
            

         </div>
         <div class=" border  w-full rounded-lg p-4 flex gap-4 flex-col  ">
            <h1 class="text-2xl">Withdraw Seller Amount </h1>
            <Separator></Separator>
            <div class="flex justify-between items-center">
                <p>Minimum Seller Amount Withdraw </p>
                <div class="border p-2 w-[50%] items-center border-black rounded-xl flex justify-between">
                    <Input   class="border-none text-slate-400" placeholder="25" ></Input>
                    <Icon name='fa:percent'></Icon>
                </div>
            </div>
            <div class="w-full flex justify-end"><Button class="rounded-xl">Save</Button></div>
            

         </div>
         <div class=" border  w-full rounded-lg p-4 flex gap-4 flex-col  ">
            <h1 class="text-2xl">Withdraw Seller Amount </h1>
            <Separator></Separator>
            <div class="flex flex-col gap-4">
                <p>1. 25% of seller product price will be deducted from seller earnings.</p>
                <Separator class="bg-slate-300"></Separator>
                <p>2. If Category Based Commission is enbaled, Set seller commission percentage 0.</p>
            </div>

         </div>
       
        </div>
        
    </div>
     

    </div>
</template>