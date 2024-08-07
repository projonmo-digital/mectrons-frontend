import { defineStore } from 'pinia'
import { useToast } from '@/components/ui/toast/use-toast'

interface IState {
    loading: boolean,
    categories: any[],
    sliderCategories: any [],
    flatCategories: any[],
    local: string
}

export const useAppStore = defineStore('app', {
    state: () => <IState>({
        categories: [],
        loading: false,
        sliderCategories: [],
        flatCategories: [],
        local: localStorage.local || 'en'
    }),
    actions: {
        async getCetagories() {
            this.loading = true
            const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
            this.categories = data.value?.categories
            if (data.value) {
                let itemArray: any[] = []
                for (let item of data.value.categories) {
                    itemArray.push(item)
                    if (itemArray.length > 2) {
                        this.$state.sliderCategories.push(itemArray)
                        itemArray = []
                    }
                }
                if (itemArray.length) {
                    this.$state.sliderCategories.push(itemArray)
                }
                this.$state.flatCategories = flattenCategories(data.value.categories, null)
            }
            this.loading = false
        },
        setLocal(value: string) {
            this.$state.local = value
            localStorage.local = value
        }
    }
})

const getFlattenCategories = () => {
    let itemArray = []
    return (categories: any[], parent: any) => {
        for(let cat of categories){
            itemArray.push({ id: cat.id, value: `${ parent ? `${parent.name} > ${cat.name}` : cat.name }` })
            if(cat.children.length){
                flattenCategories(cat.children, cat)
            }
        }
        return itemArray;
    }
}

const flattenCategories = getFlattenCategories()