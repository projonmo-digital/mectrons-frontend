import { useToast } from '@/components/ui/toast/use-toast'

export default defineNuxtRouteMiddleware((to) => {
    const { toast } = useToast()

    const nuxtApp = useNuxtApp()
    const { authenticated } = storeToRefs(useAuthStore());
    const token = useCookie('token');
    if (!(token.value && authenticated)) {
         console.log('auth','unauthenticated');
         toast({
            class: 'bg-red-500',
            title: 'Error',
            description: `Unauthenticated`
        });
        return navigateTo('/auth/login');
    }
});