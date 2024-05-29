export default defineNuxtRouteMiddleware((to, from) => {
  const token = useTokenStore();
  const auth = useAuthStore();

  if (auth.getUser?.email == "admin@admin" && token.getStatus) {
    return navigateTo("/master-admin/dashboard");
  } else if (token.getStatus) {
    return navigateTo("/user/dashboard");
  }
});
