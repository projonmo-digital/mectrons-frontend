<script setup>
import { ref } from 'vue'
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

definePageMeta({
    middleware: ["auth", "admin"]
})

useHead({
  title: 'Advertisement - Mectrons Admin',
  meta: [
    { name: 'description', content: 'Mectrons' }
  ]
})

const { toast } = useToast()

const preloader = ref(false)
const positions = ref([])

const formData = ref({ position: '', type: 'image' })

const getPositions = async () => {
    const token = useCookie()
    try {
        const response = await useFetch(`${useRuntimeConfig().public.baseUrl}/advertisement/positions`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.value}`,
                },
            }
        );

        for(let key in response.data.value){
          let item = { id: key, value: response.data.value[key] }
          positions.value.push(item)
        //   positions.value.push(`${item.id} - ${item.value}`)
        }
        return response
    } catch (error) {
        console.log(error);
    }
};

const getUrl = (data) => {
    if(data instanceof File) return URL.createObjectURL(data)
    else return data
}

onMounted(() => {
  preloader.value = true
  Promise.all([getPositions()]).then(res => {
  })
})

// methods
const change = (event) => {
}

const chooseImageHandler = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = (event) => {
        let imageFile = event.target.files[0]
        let fr = new FileReader
        fr.onload = function(e) {
            let img = new Image;
            img.onload = (e) => {
                let { width, height } = e.target
                let position = positions.value.find(p => p.id === formData.value.position)
                if(position){
                    let dimension = position.value.split('x').map(i => Number(i.trim()))
                    dimension = { width: dimension[0], height: dimension[1] }
                    if(dimension.width === width && dimension.height === height){
                        formData.value.file = imageFile
                    }else{
                        toast({
                            class: 'bg-red-500',
                            title: 'Error',
                            description: `Dimension must be ${position.value}`
                        });
                    }
                }else{
                    toast({
                        class: 'bg-red-500',
                        title: 'Error',
                        description: `Select position first`
                    });
                }
            };
            img.src = fr.result
            // formData.value.file = imageFile
        };
        fr.readAsDataURL(imageFile)
    }
    input.click()
}

const submit = async (data) => {
    const token = useCookie()
    let fd = new FormData()
    for(let key in formData.value){
        if(!['file', 'url'].includes(key)){
            fd.append(key, formData.value[key])
        }
    }
    if(formData.value.type === 'youtube'){
        fd.append('url', formData.value['url'])
    } else{
        fd.append('file', formData.value['file'])
    }
    try {
        const response = await $fetch(`${useRuntimeConfig().public.baseUrl}/advertisement`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.value}`,
                },
                body: fd,
            }
        );
        if(response.status === 'success'){
            toast({
                class: 'bg-green-500',
                title: 'Success',
                description: response.message
            });
        }
        
    } catch (error) {
        toast({ title: "Something went wrong", variant: 'destructive' });
    }
};
</script>


<template>
    <div>
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">Advertisement</h1>
      </div>
      <div class="my-8 flex flex-col gap-8 max-w-[600px]">
        <div class="flex gap-3">
          <div class="flex flex-col w-[60%] gap-2">
              <Label for="postion">Position</Label>
              <Select id="postion" v-model="formData.position">
                  <SelectTrigger class="w-full bg-gray-100">
                      <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectItem v-for="(position, index) in positions" class="text-slate-500" :value="position.id">
                            {{ `${position.id} - ${position.value}` }}
                          </SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          </div>
          <div class="flex flex-col gap-2 w-[40%]">
              <Label for="type">Type</Label>
              <Select id="type" v-model="formData.type" @input="change">
                  <SelectTrigger class="w-full bg-gray-100">
                      <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                          <SelectItem selected value="image">Image</SelectItem>
                          <SelectItem value="youtube">Youtube</SelectItem>
                      </SelectGroup>
                  </SelectContent>
              </Select>
          </div>
        </div>
        <div>
        <div v-if="formData.type === 'image'">
            <h1>Image</h1>
            <div class=" bg-gray-100 p-5 gap-5 rounded-xl flex flex-col items-center">
                <div v-if="!formData.file" class="bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full">
                    <Icon name="fa:image" class="text-green-500"></Icon>
                </div>
                <div v-else>
                    <img class=" w-20" :src="getUrl(formData.file)" alt="">
                </div>
                <p class="text-sm text-gray-500">Drag and drop image here to upload</p>
                <button class="bg-green-300 text-green-600 px-3 py-2 hover:bg-green-400 rounded-lg"
                @click="chooseImageHandler">
                    Add Image
                </button>
            </div>
        </div>
  
        <div v-if="formData.type == 'youtube'" class="flex flex-col gap-2">
          <Label for="type">Youtube Video Url</Label>
          <Input class="w-full" v-model="formData.url" placeholder="URL" type="text" />
        </div>

        <div class="flex justify-end mt-10">
            <Button :disabled="isDisabled" class="w-56" @click="submit">Save</Button>
        </div>
        </div>
      </div>
  </div>
</template>
