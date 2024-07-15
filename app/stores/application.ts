import { defineStore } from 'pinia'
import { useToast } from '@/components/ui/toast/use-toast'

interface IState {
    loading: boolean,
    categories: any[]
}

export const useAuthStore = defineStore('auth', {
    state: () => <IState>({
        categories: [],
        loading: false,
    }),
    actions: {
        async getCetagories() {
            const { data, pending, error } = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);

            if (data.value) {
                let itemArray: any[] = []
                for (let item of data.value.categories) {
                    itemArray.push(item)
                    if (itemArray.length > 2) {
                        this.$state.categories.push(itemArray)
                        itemArray = []
                    }
                }
                if (itemArray.length) {
                    this.$state.categories.push(itemArray)
                }
            }
        }
    },
})