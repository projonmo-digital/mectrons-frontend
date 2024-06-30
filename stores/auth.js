export const useAuthStore = defineStore("auth", {
  state: () => ({
    logInSatus: false,
  }),
  persist: {
    paths: ["user"],
  },
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(formData) {
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/login`,
          {
            method: "POST",
            body: { ...formData },
          }
        );
        this.commonSeller(data);
        this.logInSatus = true;
      } catch (error) {
        throw error;
      }
    },

    async register(formData) {
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/register`,
          {
            method: "POST",
            body: { ...formData },
          }
        );

        this.commonSeller(data);
      } catch (error) {
        throw error;
      }
    },

    commonSeller(data) {
      const toaster = useToasterStore();
      const token = useTokenStore();
      token.setToken(data.token);
      this.user = data.user;
      this.logInSatus = true;

      toaster.addSuccess(data.message);
      if (this.user.email == "admin@admin") {
        return navigateTo("/master-admin/dashboard");
      } else if (this.user.email && this.user.nid) {
        return navigateTo("/master-admin/dashboard");
      } else {
        return navigateTo("/user/dashboard");
      }
    },

    async logout() {
      const token = useTokenStore();
      try {
        const res = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/logout`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
          }
        );

        token.removeToken();
        this.logInSatus = false;
      } catch (error) {
        throw error;
      }
    },

    async forgetpass(formData) {
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/password/email`,
          {
            method: "POST",
            body: { ...formData },
          }
        );
        return data;
      } catch (error) {
        throw error;
      }
    },

    async resetPassword(formData) {
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/reset-password?${
            formData.linkPeram
          }`,
          {
            method: "POST",
            body: {
              password: formData.password,
              password_confirmation: formData.password_confirmation,
            },
          }
        );

        return data;
      } catch (error) {
        throw error;
      }
    },

    async emailVerify(formData) {
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/email-verify?${
            formData.linkPeram
          }`,
          {
            method: "POST",
          }
        );
        return data;
      } catch (error) {
        throw error;
      }
    },

    // User
    async getUserData() {
      const token = useTokenStore();
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/profile`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
          }
        );
        this.user = data;
      } catch (error) {
        throw error;
      }
    },

    async updateUserData(formData) {
      const token = useTokenStore();
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/profile`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
            body: {
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile,
              dob: formData.dob,
              gender: formData.gender,
              address: formData.address,
              about_me: formData.about_me,
            },
          }
        );
        this.getUserData();
        return data;
      } catch (error) {
        throw error;
      }
    },

    async passwordChange(formData) {
      const token = useTokenStore();
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/password-change`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
            body: {
              email: formData.email,
              old_password: formData.old_password,
              new_password: formData.new_password,
              password_confirmation: formData.password_confirmation,
            },
          }
        );

        return data;
      } catch (error) {
        throw error;
      }
    },

    async profilePictureUpdate(formData) {
      const token = useTokenStore();
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/profile-picture`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
            body: formData,
          }
        );
        this.getUserData();
        return data;
      } catch (error) {
        throw error;
      }
    },

    async AccountSwitch() {
      const token = useTokenStore();
      try {
        const data = await $fetch(
          `${useRuntimeConfig().public.baseUrl}/business-apply`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token.getToken}`,
            },
          }
        );
        this.getUserData();
        return data;
      } catch (error) {
        throw error;
      }
    },
  },
});
