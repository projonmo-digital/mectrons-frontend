const ogSource = 'https://res.cloudinary.com/demgpyia8/image/upload/v1677446092/mylo_promo.jpg'
const metaTitle = 'Mectrons'
const metaDescription = 'The most flexible workout tool ever. Craft your workout the way you want and forget about all the management.'

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'app',
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
      title: metaTitle,
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: metaDescription },
        { name: 'og:type', content: 'website' },
        { name: 'og:image', content: ogSource },
        { name: 'og:site_name', content: 'Mectrons' },
        { name: 'og:image:alt', content: metaDescription },
        { name: 'og:description', content: metaDescription },
        { name: 'og:image:width', content: '1200' },
        { name: 'og:image:height', content: '600' },
        { name: 'og:url', content: 'https://www.mectrons.com.bd' },
        { name: 'og:title', content: metaTitle },
        { name: 'twitter:title', content: 'Mectrons' },
        { name: 'twitter:site', content: '@Mectrons' },
        { name: 'twitter:image', content: ogSource },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: metaDescription },
      ],
      link: [
        {
          rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          integrity: "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
          crossorigin: "anonymous", referrerpolicy: "no-referrer"
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      ],
      script: [
        { src:"https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"}
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
    prefix: "",
    componentDir: "./app/components/ui",
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
