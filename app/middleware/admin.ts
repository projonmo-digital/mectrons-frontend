import { useToast } from '@/components/ui/toast/use-toast'

export default defineNuxtRouteMiddleware((to, from) => {
  const { toast } = useToast()
  const auth = useAuthStore();
  if (auth.user?.type !== 'admin') {
    toast({
      class: 'bg-red-500',
      title: 'Unauthonticated',
      description: `You are not authorize`
    });
    return abortNavigation()
  }
});
