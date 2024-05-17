const NextFederationPlugin = require('@module-federation/nextjs-mf')
/** @type {import('next').NextConfig} */
// const { i18n } = require('../../../next-i18next.config')

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options

    config.plugins.push(
      new NextFederationPlugin({
        name: 'host_inctagram',
        remotes: {
          Messenger: 'inctagram_remote_messenger_app@http://localhost:3001/remoteEntry.js',
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          // './title': './components/exposedTitle.js',
          // './checkout': './pages/checkout',
        },
        shared: {
          // whatever else
        },
      })
    )

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
      },
    ],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false,
  },
  pageExtensions: ['tsx'],
}

module.exports = nextConfig
