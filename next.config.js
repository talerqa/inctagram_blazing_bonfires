const NextFederationPlugin = require('@module-federation/nextjs-mf')
/** @type {import('next').NextConfig} */
// const { i18n } = require('../../../next-i18next.config')

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options

    config.plugins.push(
      new NextFederationPlugin({
        name: 'ms-host-inctagram',
        remotes: {
          remote: 'remote@http://localhost:3001/remote.js',
          // next1: `next1@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
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
