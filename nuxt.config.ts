// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({


  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    '@nuxt/image',
    '@stefanobartoletti/nuxt-social-share'
  ],

  content: {
    // https://content.nuxtjs.org/api/configuration
    documentDriven: true,
    experimental: {
      search: {
        ignoredTags: [],
        filterQuery: { /* your query here */ },
      },
    },
  },

  image: {
    // Options
    inject: true,
    format: ['jpeg'],
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
    presets: {
      cover: {
        modifiers: {
          fit: 'cover',
          format: 'jpg',
          width: 300,
          height: 300,
        },
      },
    },
  },

  plugins: [
    '@/plugins/global-components.js',
  ],

  // module options
  socialShare: {
    baseUrl: 'https://bpedu2425.netlify.app', // required!
    // other optional module options
    styled: false,
    label: true,
  },

  css: [
    '~/assets/styles/colormode.css',
    '~/assets/styles/styles.css',
    '~/assets/styles/fonts.css',
    '~/assets/styles/transitions.css',
    '~/assets/styles/masonry.css'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-08-30'
})