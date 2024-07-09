import { defineStore } from 'pinia'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()

interface IState {
    authenticated: boolean
    user: null | any
    loading: boolean,
    errors: any
}

export const useAuthStore = defineStore('auth', {
    state: () => <IState>({
        authenticated: false,
        user: null,
        loading: false,
        errors: {}
    }),
    actions: {
        async authenticateUser(formData: any) {
            this.$state.errors = {}
            const { data, error, pending }: any = await useFetch(`${useRuntimeConfig().public.baseUrl}/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            this.loading = pending;
            if (data.value) {
                const token = useCookie('token')
                const user = useCookie('user')
                token.value = data?.value?.token
                user.value = JSON.stringify(data?.value?.user)
                if(data.value?.user){
                    this.user = {...data.value.user, role: getRole(data.value.user)}
                }
                this.authenticated = true
                toast({
                    title: 'Success',
                    description: data.value.message,
                });
            }
            if (error?.value) {
                if(typeof error?.value.data.errors === 'string'){
                    toast({
                        class: 'bg-red-500',
                        title: 'Error',
                        description: error?.value.data.errors
                    });
                }else{
                    this.$state.errors = error?.value.data.errors
                }
            }
        },
        logUserOut() {
            const token = useCookie('token')
            const user = useCookie('user')
            this.authenticated = false
            this.user = null
            token.value = null
            user.value = null
        },
    },
});

const getRole = (user: any) => {
    if(user.email === 'admin@admin') return 'admin'
    else {
        return user.nid ? 'seller' : 'user'
    }
}