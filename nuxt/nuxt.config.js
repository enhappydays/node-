export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2143783_litq4qt8a4.css' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/styles/common.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],
  axios: {
    baseURL: 'https://mock.boxuegu.com/mock/1175/'
  },
  styleResources: {
    less: "./assets/styles/variables.less",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
