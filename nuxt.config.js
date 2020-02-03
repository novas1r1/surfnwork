const webpack = require('webpack');
import axios from 'axios';

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Amatic+SC&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/glp2xvr.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00798a' },
  /*
   ** Global CSS
   */
  css: [
    '@assets/styles/main.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~plugins/core-components.js' },
    { src: '~plugins/date-filter.js' },
    { src: '~plugins/quill.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        Quill: 'quill/dist/quill.js'
      })
    ]
    /*extend(config, ctx) {
    }*/
  },
  env: {
    baseUrl: process.env.BASE_URL || 'https://surfnwork-blog.firebaseio.com',
    fbApiKey: 'AIzaSyBWlCOmFUmdO3jt8wxhxwbt4q2GYDEOO0I'
  }
};
