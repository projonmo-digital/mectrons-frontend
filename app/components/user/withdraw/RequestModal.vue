<script setup lang="ts">
import { ref } from "vue"
import Modal from "~/components/common/Modal.vue";
const isModalOpen = ref(false)

</script>

<template>
    <Modal v-model="isModalOpen" title="Make an withdraw request">
        <template #btn>
            <div class="border text-primary hover:text-white rounded-lg hover:bg-primary cursor-pointer p-5 flex flex-col gap-3 justify-center items-center shadow-lg">
                <div class="w-16 h-16 rounded-full flex items-center justify-center bg-primary p-2">
                    <Icon class="text-white w-10 h-10" name="fa:send" />
                </div>
                <p>Send Withdraw request</p>
            </div>
        </template>
        <template #content>
            <div class="border">
                <table>
                    <tr>
                        <td>Amount</td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </template>
    </Modal>
</template>
