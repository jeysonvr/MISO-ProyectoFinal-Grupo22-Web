/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const nextConfig = withNextIntl({
  // Your Next.js config.
  experimental: {
    serverActions: true,
  },
});

module.exports = nextConfig
