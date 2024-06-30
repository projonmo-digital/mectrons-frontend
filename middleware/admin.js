export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  console.log(auth.getUser);
  if (auth.getUser?.email != "admin@admin") {
    return navigateTo("/user/dashboard");
  }
});
