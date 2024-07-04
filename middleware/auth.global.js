export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();
  if (localStorage.getItem("user") && localStorage.getItem("authToken")) {
    store.user = JSON.parse(localStorage.getItem("user"));
  }
});
