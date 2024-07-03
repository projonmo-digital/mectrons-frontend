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
  app: {
    head: {
      link: [
        {
          rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          integrity: "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
          crossorigin: "anonymous", referrerpolicy: "no-referrer"
        }
      ]
    }
  },
  tailwindcss: {
    exposeConfig: true,
  },
  css: ["~/assets/css/input.css"],

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
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
  },
  devtools: { enabled: false },
});
