import type { IAddvertisementPostion, IAdvertisement } from "~/types/advertisment";

export const useUtils = defineStore("useUtils", () => {
  const getCetagories = async () => {
    const res = await useFetch(
      `${useRuntimeConfig().public.baseUrl}/general-categories`
    );

    return res.data.value;
  };

  const getAds = async <T>(position: IAddvertisementPostion) => {
    const token = useCookie("token");
    try {
      const response = await $fetch<T>(
        `${useRuntimeConfig().public.baseUrl
        }/advertisement?position=${position}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrlChanger = (url: string) => {
    return (
      useRuntimeConfig().public.imageUrl +
      "/" +
      url.replaceAll("public", "storage")
    );
  };

  return { getCetagories, getAds, imageUrlChanger };
});
