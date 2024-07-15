import { defineStore } from 'pinia'
import { useToast } from '@/components/ui/toast/use-toast'

interface IState {
    loading: boolean,
    categories: any[],
    sliderCategories: any []
}

export const useAppStore = defineStore('app', {
    state: () => <IState>({
        categories: [],
        loading: false,
        sliderCategories: []
    }),
    actions: {
        async getCetagories() {
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
            }
        }
    }
})