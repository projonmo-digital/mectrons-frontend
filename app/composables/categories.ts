import { ref } from 'vue'

export const useCategories = () => {
    const categories = ref([])

    const splitCategories = (categories: any[]) => {
        let itemArray: any[] = []
        for (let item of categories) {
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

    return { categories, splitCategories }
} 