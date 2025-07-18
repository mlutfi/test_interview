import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    appName: process.env.APP_NAME ?? 'CMS',
    basePath: process.env.BASE_PATH ?? '',
    BASE_PATH: process.env.BASE_PATH ?? '',
    BASE_URL_API: process.env.BASE_URL_API,
    BASE_URL_IMG: process.env.BASE_URL_IMG
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false, 
      },
    ];
  },
};

export default nextConfig;
