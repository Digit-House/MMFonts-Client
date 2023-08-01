/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
    serverActions: true,
  },
  reactStrictMode: true,
};

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
});

module.exports = withPWA(withNextIntl(nextConfig));
