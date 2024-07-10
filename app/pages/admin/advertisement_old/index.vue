<script setup>
import { ref, reactive, watch } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
const { toast } = useToast()


const adsPositions = ref([])
const adsPostionKey = ref([])
const adsPositionsData = ref('')

const getAdsPostions = async () => {
    const token = useTokenStore();

    try {
        const response = await useFetch(
            `${useRuntimeConfig().public.baseUrl}/advertisement/positions`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.getToken}`,
                },
            }
        );

        adsPositionsData.value = response

        Object.entries(adsPositionsData.value.data).forEach(([key, value]) => {
            adsPositions.value.push(`${key}  (${value})`)
            adsPostionKey.value.push(key)
        });

        // Refresh products list after update
    } catch (error) {
        console.log(error);
    }
};

getAdsPostions()

const adsBody = reactive({
    position: '',
    type: '',
    file: '',
    url: 'no'
})

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        adsBody.file = file
        fileAdded.value = true;
        fileName.value = file.name;
    }
    console.log(adsBody.file)
}

const triggerFileInput = () => {
    document.getElementById('fileInput').click();
}

const isDisabled = ref(true)
const fileAdded = ref(false)
const fileName = ref('')

watch(adsBody, () => {
    if (adsBody.position && adsBody.type && (adsBody.file || adsBody.url)) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
}, { deep: true })
console.log(adsBody.file)

const setAds = async () => {
    const token = useTokenStore();

    try {
        const response = await useFetch(
            `${useRuntimeConfig().public.baseUrl}/advertisement`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.getToken}`,
                },
                body: adsBody,
            }
        );
        console.log(adsBody.file)
        if (response.status == 'success') {
            toast({ title: "Added Successfully", variant: "default" });
        }
        else {
            toast({ title: "Something went wrong", variant: 'destructive' });
        }

        // Refresh products list after update
    } catch (error) {
        toast({ title: "Something went wrong", variant: 'destructive' });
        console.log(error);
    }
};

</script>


<template>
    <div class="lg:h-[80vh] w-full">
        {{ adsBody }}

        <div class="flex justify-between m-8">
            <h1 class="text-2xl font-bold">Advertisement</h1>
        </div>

        <div class="lg:h-full flex w-full lg:items-center flex-col justify-center">
            <div class="w-[792px] flex flex-col gap-4">
                <div class="w-full flex gap-2">
                    <div class="flex flex-col w-[60%] gap-2">
                        <Label for="postion">Position</Label>
                        <Select id="postion" v-model="adsBody.position">
                            <SelectTrigger class="w-full bg-[#F1F3F6]">
                                <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem v-for="(i, j) in adsPositions" class="text-slate-500"
                                        :value="adsPostionKey[j]">{{ i }}</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="flex flex-col gap-2 w-[40%]">
                        <Label for="type">Type</Label>
                        <Select id="type" v-model="adsBody.type">
                            <SelectTrigger class="w-full bg-[#F1F3F6]">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="youtube">Youtube</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div v-if="adsBody.type === 'video' || adsBody.type === 'image'">
                    <h1>Photo/Video</h1>
                    <div class='bg-[#F1F3F6] gap-4 h-[184px] p-4 rounded-xl flex items-center flex-col'>
                        <div class="w-[160px] h-[160px] bg-primary/10 flex rounded-full justify-center items-center">
                            <div class="flex gap-2 text-primary">
                                <Icon name="fa:image" class="text-2xl text-primary"></Icon>/
                                <Icon name="fluent:video-16-regular" class="text-2xl text-primary"></Icon>
                            </div>
                        </div>
                        <p v-if="!fileAdded" class="text-slate-400 text-sm">Drag and drop image/video here, or click add
                            image</p>
                        <p v-if="fileAdded" class="text-green-500 mt-2">File added: {{ fileName }}</p>
                        <Button v-if="!fileAdded" class="bg-primary/10" @click="triggerFileInput">
                            <span class="text-primary hover:text-white">Add Image or Video</span>
                        </Button>
                        <Button v-if="fileAdded" class="bg-primary/10" @click="triggerFileInput">
                            <span class="text-primary hover:text-white">Edit</span>
                        </Button>
                        <input type="file" id="fileInput" class="hidden" @change="handleFileChange" />

                    </div>
                </div>

                <div v-if="adsBody.type == 'youtube'" class="max-w-[60%]">
                    <p class="text-x">Youtube Video Url</p>
                    <Input v-model="adsBody.url" type=""></Input>
                </div>

                <div class="flex justify-end mt-10">
                    <Button :disabled="isDisabled" class="w-56" @click="setAds">Save</Button>
                </div>
            </div>
        </div>
    </div>
</template>
