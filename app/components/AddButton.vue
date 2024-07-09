<script setup>
defineProps({
    type: String
})

</script>

<template>
    <Button class="flex rounded text-white  ">
        <Icon class="w-4 h-4 mr-2 text-white" name="fa:plus-circle"></Icon>
        <p>Add new {{ type }}</p>
    </Button>
</template>