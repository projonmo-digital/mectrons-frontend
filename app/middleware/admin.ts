export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  // if (auth.getUser?.email != "admin@admin") {
  //   return navigateTo("/user/dashboard");
  // }
});
