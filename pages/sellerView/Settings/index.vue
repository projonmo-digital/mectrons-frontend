<script setup>

</script>

<template>
    <div class=" flex flex-col gap-4">
        <HeaderWithHr header="Settings" </HeaderWithHr>
            <div class=" flex my-4 justify-end gap-4">
                <Button class=" ">
                    <Icon name="mdi:plus-circle" </Icon>
                        <div>Add New Product</div>
                </Button>
            </div>

    </div>
    <div class=" border p-4 flex flex-col rounded-xl  ">
        <div class="p-4">
            <h1 class="text-2xl">Basic Info</h1>
            <hr>
        </div>

        <form class=" flex flex-col gap-8">
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="shop_name">Shop Name</Label>
                <Input id="shop_name" type="text" placeholder="Shop Name" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-4">
                <Label for="picture">Picture</Label>
                <Input id="picture" type="file" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="shop_phone">Shop Phone</Label>
                <Input id="shop_phone" type="text" placeholder="Shop Phone" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="shop_address">Shop Address</Label>
                <Input id="shop_address" type="text" placeholder="Shop Phone" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="street_address">Street Address</Label>
                <Input id="street_address" type="text" placeholder="Street Phone" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="meta_title">Meta Title</Label>
                <Input id="meta_title" type="text" placeholder="Meta Titlee" />
            </div>

            <div>
                <Label for="description" class=" ">Meat Description</Label>
                <Textarea class=" h-[331px] resize-none"></Textarea>
            </div>
            <div class=" w-full justify-end flex">
                <Button>Save</Button>
            </div>
        </form>




    </div>
    <div class=" border p-4 mt-8 flex flex-col rounded-xl ">
        <div class="p-4">
            <h1 class="text-2xl">Media Link</h1>
            <hr>
        </div>

        <form class=" flex flex-col gap-8">
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="shop_name">Facebook</Label>
                <Input id="shop_name" type="text" placeholder="Facebook" />
            </div>

            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="instagram">Instagram</Label>
                <Input id="intstagram" type="text" placeholder="Instagram" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="twitter">Twitter</Label>
                <Input id="twitter" type="text" placeholder="Twitter" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="google">Google</Label>
                <Input id="google" type="text" placeholder="Google" />
            </div>
            <div class="flex text-nowrap w-full max-w-sm items-center gap-1.5">
                <Label for="youtube">Youtube</Label>
                <Input id="youtube" type="text" placeholder="Youtube" />
            </div>


            <div class=" w-full justify-end flex">
                <Button>Save</Button>
            </div>
        </form>




    </div>
</template>