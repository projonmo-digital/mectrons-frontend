export default defineNuxtRouteMiddleware((to, from) => {
  const token = useTokenStore();
  const auth = useAuthStore();

  if (auth.getUser?.email == "admin@admin" && token.getStatus) {
    return navigateTo("/master-admin/dashboard");
  } else if (auth.getUser?.email && auth.getUser.nid) {
    return navigateTo("/sellerView/dashboard");
  }
});
