import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  transpilePackages: ['@repo/ui','@repo/streak-engine','@repo/storage'],
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // PWA only in production build; disabled in dev
  disable: process.env.NODE_ENV === 'development',
})(baseConfig);
