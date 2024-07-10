export const useCommonApi = () => {

    const categories = ref([]);
    const getCetagories = async() => {
        refreshNuxtData();
        try{
            const data = await useFetch(`${useRuntimeConfig().public.baseUrl}/general-categories`);
            categories.value = data.data.value.categories;
        }catch(error){
            console.log('Somthing Wrong!');
        }
    }

    return { getCetagories, categories }
}