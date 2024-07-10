export const useTypeStore = defineStore('type', {
    state: () => ({ 
        types: {}, 
    }),
    getters: {
        getType: (state) => state.types,
    },
    actions: {
        async getTypes() {
            try{
                const data = await useFetch(`${useRuntimeConfig().public.baseUrl}/types`);
                return data.value.data;
            }catch(error){
                throw error;
            }
        },
    }
})