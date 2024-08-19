import { defineStore } from 'pinia'
import type { ICategory } from '~/types/categories'
import type { IOffer } from '~/types/offer'

interface IState {
    loading: boolean,
    categories: ICategory[],
    offerList: IOffer[],
    sliderCategories: any [],
    local: string
}

export const useAppStore = defineStore('app', {
    state: () => <IState>({
        categories: [],
        loading: false,
        sliderCategories: [],
        offerList: [],
        local: localStorage.local || 'en'
    }),
    actions: {
        async getCetagories(loading = true) {
            this.loading = loading
            const { data, pending, error } = await useFetch<any>(`${useRuntimeConfig().public.baseUrl}/general-categories`);
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
