// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: "123",
    // Keys within public, will be also exposed to the client-side
    public: {
      appName: process.env.APP_NAME,
      baseUrl: process.env.API_BASE_URL,
      imageUrl: process.env.API_IMAGE_URL,
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "shadcn-nuxt",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  imports: {
    dirs: ["./stores", "composables", "composables/**"],
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  devtools: { enabled: false },
});
