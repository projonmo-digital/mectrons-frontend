export default defineNuxtRouteMiddleware((to, from) => {
    const token = useTokenStore();
    const auth = useAuthStore();

    if (token.getStatus && auth.user.email == 'admin@admin') {
        return navigateTo('/admin/dashboard');
    }else if (token.getStatus){
        return navigateTo('/user/dashboard');
    }
})
