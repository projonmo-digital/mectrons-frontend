export default defineNuxtRouteMiddleware((to, from) => {
    const token = useTokenStore();
    const auth = useAuthStore();

    if (token.getStatus && auth?.user?.email == 'admin@admin.com') {
        return navigateTo('/admin/dashboard');
    }
})
