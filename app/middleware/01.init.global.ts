const getRole = (user: any) => {
    if(user.email === 'admin@admin') return 'admin'
    else {
        return user.nid ? 'seller' : 'user'
    }
}

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, user } = storeToRefs(useAuthStore());
    const token = useCookie('token');
    const userData = useCookie('user');
    if (token.value) {
        authenticated.value = true;
        user.value = userData.value ? { ...userData.value as any, role: getRole(userData.value)} : null
    }
});