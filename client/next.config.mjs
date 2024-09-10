/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app/settings',
        destination: '/app/settings/profile',
        permanent: true,
      },
      {
        source: '/app/explore',
        destination: '/app/explore/posts',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
