import { defineStore } from "pinia";
import { useToast } from "@/components/ui/toast/use-toast";
import type { ILoginResponse, IUser } from "@/types/auth";
import { initTawkTo, getHashValue } from '~/helper/twakTo';
const { toast } = useToast();
interface IState {
  authenticated: boolean;
  user: null | IUser;
  loading: boolean;
  errors: any;
}

export const useAuthStore = defineStore("auth", {
  state: () =>
    <IState>{
      authenticated: false,
      user: null,
      loading: false,
      errors: {},
    },
  actions: {
    async authenticateUser(formData: any) {
      try {
        this.$state.errors = {};
        this.loading = true;
        const response = await $fetch<ILoginResponse>(
          `${useRuntimeConfig().public.baseUrl}/login`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const token = useCookie("token");
        const user = useCookie("user");
        token.value = response?.token;
        user.value = JSON.stringify(response?.user);
        if (response?.user) {
          this.user = { ...response.user, role: getRole(response.user) };
        }
        this.authenticated = true;
        toast({
          title: "Success",
          description: response?.message,
        });
        if(response.user.type === 'buyer'){
          getHashValue().then((hash: any) => {
            initTawkTo(response.user, hash) 
          })
        }
      } catch (error) {
        const err = error as any;
        if (err.response._data) {
          if (typeof err.response._data.message === "string") {
            toast({
              class: "bg-red-500",
              title: "Error",
              description: err.response._data.errors,
            });
          } else {
            this.$state.errors = err.response._data.errors;
          }
        }
      } finally {
        this.loading = false;
      }
    },
    logUserOut() {
      const router = useRouter()
      const token = useCookie("token");
      const user = useCookie("user");
      this.authenticated = false;
      this.user = null;
      token.value = null;
      user.value = null;
      router.push('/')
    },
  },
});

const getRole = (user: any) => {
  if (user.email === "admin@admin") return "admin";
  else {
    return user.nid ? "seller" : "user";
  }
};
