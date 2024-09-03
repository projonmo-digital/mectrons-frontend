import { defineStore } from 'pinia'
import type { ICategory } from '~/types/categories'
import type { IOffer } from '~/types/offer'

interface IState {
    loading: boolean,
    categories: ICategory[],
    offerList: IOffer[],
    local: string
}

export const useAppStore = defineStore('app', {
    state: () => <IState>({
        categories: [],
        loading: false,
        offerList: [],
        local: localStorage.local || 'en'
    }),
    actions: {
        async getCetagories(loading = true) {
            this.loading = loading
            const { data, pending, error } = await useFetch<any>(`${useRuntimeConfig().public.baseUrl}/general-categories`);
            this.categories = data.value?.categories
            
            // data.value?.categories.forEach((c: ICategory) => {
            // })
            this.loading = false
        },
        async getFlashSale() {
            this.loading = true
            const response = await $fetch<IOffer[]>(`${useRuntimeConfig().public.baseUrl}/flash-sale`,
                {
                    headers: {
                        Accept: 'application/json'
                    }
                }
            );
            this.offerList = response
            this.loading = false
        },
        setLocal(value: string) {
            this.$state.local = value
            localStorage.local = value
        }
    }
})
