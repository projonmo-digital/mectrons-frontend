const ogSource = "https://res.cloudinary.com/demgpyia8/image/upload/v1677446092/mylo_promo.jpg";
const metaTitle = "Mectrons";
const metaDescription = "";

export default defineNuxtConfig({
  ssr: false,
  srcDir: "app",
  $development: {
    runtimeConfig: {
      public: {
        appName: process.env.APP_NAME,
        baseUrl: process.env.API_DEV_BASE_URL,
        imageUrl: process.env.API_DEV_IMAGE_URL,
        twakToAPI: process.env.TWAK_TO_API,
        twakToPropertyId: process.env.TWAK_TO_PROPERTY_ID,
        twakToWidgetId: process.env.TWAK_TO_WIDGET_ID,
      },
    },
    devServer: {
      https: true,
    },
    devtools: {
      enabled: true,
      timeline: {
        enabled: true,
      },
    },
  },
  $production: {
    runtimeConfig: {
      public: {
        appName: process.env.APP_NAME,
        baseUrl: process.env.API_BASE_URL,
        imageUrl: process.env.API_IMAGE_URL,
        twakToAPI: process.env.TWAK_TO_API,
        twakToPropertyId: process.env.TWAK_TO_PROPERTY_ID,
        twakToWidgetId: process.env.TWAK_TO_WIDGET_ID,
      },
    },
  },
  spaLoadingTemplate: "initial-page.html",
  app: {
    head: {
      title: metaTitle,
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { name: "description", content: metaDescription },
        { name: "og:type", content: "website" },
        { name: "og:image", content: ogSource },
        { name: "og:site_name", content: "Mectrons" },
        { name: "og:image:alt", content: metaDescription },
        { name: "og:description", content: metaDescription },
        { name: "og:image:width", content: "1200" },
        { name: "og:image:height", content: "600" },
        { name: "og:url", content: "https://www.mectrons.com.bd" },
        { name: "og:title", content: metaTitle },
        { name: "twitter:title", content: "Mectrons" },
        { name: "twitter:site", content: "@Mectrons" },
        { name: "twitter:image", content: ogSource },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:description", content: metaDescription },
        { name: "creator", content: "Projonmo Digital Ltd." },
        { name: "designer", content: "Projonmo Digital Ltd." },
      ],
      link: [
        { type: "text/plain", rel: "author", href: "/humans.txt" },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          integrity:
            "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [
        {
          src: "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
        },
      ],
    },
  },
  tailwindcss: {
    exposeConfig: true,
  },
  css: ["@/assets/css/input.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "shadcn-nuxt",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@nuxtjs/sitemap",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },
  site: {
    url: "https://mectrons.com",
    name: "Mectrons",
    excludeAppSources: ["nuxt:pages"],
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
});
