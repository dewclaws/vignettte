// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        'Azeret Mono': '100..900'
      }
    }],
    'nuxt-icon'
  ],
})
