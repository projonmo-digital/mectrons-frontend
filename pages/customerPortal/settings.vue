<script setup>
const inputs = [{
    name: 'Name',
    placeholder: 'Name'
}, {
    name: 'Moble',
    placeholder: 'Mobile',


}, {
    name: 'Email',
    placeholder: 'abc@gmail.com'

},
{
    name: "Address",
    placeholder: 'Address'
}
]



</script>

<template>
    <div class=" flex flex-col gap-8">
        <div class=" flex gap-4 flex-col">
            <h1 class=" text-primary font-bold text-2xl ">Settings</h1>
            <Separator class=" bg-primary"></Separator>

        </div>
        <div class=" justify-center flex  m-4">
            <div class="h-[110px] w-[110px] flex-col  rounded-full flex justify-center items-center bg-gray-400">

                <Icon name="fluent:picture-in-picture-16-regular" class=" text-5xl" </Icon>
                    <p>Add Photo</p>

            </div>

        </div>
        <div class=" flex justify-center items-center gap-8 flex-col ">
            <div class="w-[50%]  flex flex-col gap-4 ">
                <div class="flex w-full   items-center justify-between gap-8" v-for=" i in inputs">
                    <Label :for="i.name">{{ i.name }}</Label>
                    <Input :id="i.name" type="text" class="border-slate-300 w-[80%] text-slate-300"
                        :placeholder="i.placeholder" />
                </div>
            </div>
        </div>
        <div class="mx-auto">
            <Button size="lg">Save</Button>
        </div>
    </div>
</template>