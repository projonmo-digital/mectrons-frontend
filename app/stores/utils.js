export const useUtils = defineStore("useUtils", () => {
  const getCetagories = async () => {
    const res = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/general-categories`
    );

    return res.data.value;
  };

  const getAds = async (position) => {
    const token = useTokenStore();

    try {
      const response = await useFetch(
        `${
          useRuntimeConfig().public.baseUrl
        }/advertisement?position=${position}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.getToken}`,
          },
        }
      );

      return response.data;

      // Refresh products list after update
    } catch (error) {
      console.log(error);
    }
  };

  return { getCetagories, getAds };
});
