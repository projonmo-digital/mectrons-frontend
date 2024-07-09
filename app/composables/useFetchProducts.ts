// composables/useFetchProducts.ts
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useRuntimeConfig } from "#app";
// Adjust the import path accordingly

export function useFetchProducts() {
  const data = ref<any[]>([]);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    const token = useTokenStore();
    try {
      const response = await useFetch(
        `${useRuntimeConfig().public.baseUrl}/pending/products`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      ).json();

      if (response && response.value && response.value.data) {
        data.value = response.value.data;
      } else {
        data.value = [];
      }

      console.log(data.value);
      return response.value.data;
    } catch (err) {
      console.error(err);
      error.value = "Failed to fetch products";
      return [];
    }
  };

  return {
    data,
    error,
    fetchProducts,
  };
}
