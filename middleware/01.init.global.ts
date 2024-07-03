export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, user } = storeToRefs(useAuthStore());
    const token = useCookie('token');
    const userData = useCookie('user');
    if (token.value) {
        authenticated.value = true;
        user.value = userData.value || null
    }
});