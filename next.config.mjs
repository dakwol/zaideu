/** @type {import('next').NextConfig} */
const repositoryName = 'zaideu';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  basePath: `/${repositoryName}`,
  assetPrefix: `/${repositoryName}/`,

  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;