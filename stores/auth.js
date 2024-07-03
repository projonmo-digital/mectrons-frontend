import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRuntimeConfig, navigateTo, useFetch } from "#app"; // assuming these are provided by Nuxt 3

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const getUser = computed(() => user.value);
  const loggedIn = computed(() => user.value !== null);

  const login = async (formData) => {
    try {
      const { data } = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/login`,
        {
          method: "POST",
          body: { ...formData },
        }
      );
      const toaster = useToasterStore();
      const token = useTokenStore();
      localStorage.setItem("authToken", JSON.stringify(data.value.token));
      localStorage.setItem("user", JSON.stringify(data.value.user));

      user.value = data.value.user;

      toaster.addSuccess(data.value.message);
      if (user.value.email === "admin@admin") {
        return navigateTo("/master-admin/dashboard");
      } else if (user.value.email && user.value.nid !== null) {
        return navigateTo("/sellerView/dashboard");
      } else {
        return navigateTo("/user/dashboard");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/register`,
        {
          method: "POST",
          body: { ...formData },
        }
      );
      // If commonSeller is needed, you can call it here.
      commonSeller(data.value);
    } catch (error) {
      throw error;
    }
  };

  // Uncomment and define commonSeller if needed.
  // const commonSeller = (data) => {
  //   const toaster = useToasterStore();
  //   const token = useTokenStore();
  //   token.setToken(data.token);
  //   localStorage.setItem('user', JSON.stringify(data.user));

  //   user.value = data.user;

  //   toaster.addSuccess(data.message);
  //   if (user.value.email === 'admin@admin') {
  //     return navigateTo('/master-admin/dashboard');
  //   } else if (user.value.email && user.value.nid) {
  //     return navigateTo('/master-admin/dashboard');
  //   } else {
  //     return navigateTo('/user/dashboard');
  //   }
  // };

  const logout = async () => {
    const token = useTokenStore();
    try {
      const res = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/logout`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      localStorage.setItem("authToken", "");
      localStorage.setItem("user", "");
      user.value = null;
    } catch (error) {
      throw error;
    }
  };

  const emailVerify = async (formData) => {
    try {
      const { data } = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/email-verify?${
          formData.linkPeram
        }`,
        {
          method: "POST",
        }
      );
      return data.value;
    } catch (error) {
      throw error;
    }
  };

  const getUserData = async () => {
    const token = useTokenStore();
    try {
      const { data } = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/profile`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      );
      user.value = data.value;
    } catch (error) {
      throw error;
    }
  };

  const updateUserData = async (formData) => {
    const token = useTokenStore();
    try {
      const { data } = await useFetch(
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
      await getUserData();
      return data.value;
    } catch (error) {
      throw error;
    }
  };

  const passwordChange = async (formData) => {
    const token = useTokenStore();
    try {
      const { data } = await useFetch(
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
      return data.value;
    } catch (error) {
      throw error;
    }
  };

  const profilePictureUpdate = async (formData) => {
    const token = useTokenStore();
    try {
      const { data } = await useFetch(
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
      await getUserData();
      return data.value;
    } catch (error) {
      throw error;
    }
  };

  const accountSwitch = async () => {
    const token = useTokenStore();
    try {
      const { data } = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/business-apply`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      );
      await getUserData();
      return data.value;
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    getUser,
    loggedIn,
    login,
    register,
    logout,
    emailVerify,
    getUserData,
    updateUserData,
    passwordChange,
    profilePictureUpdate,
    accountSwitch,
  };
});
