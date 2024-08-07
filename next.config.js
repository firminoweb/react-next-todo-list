const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};
  
module.exports = nextConfig;
  