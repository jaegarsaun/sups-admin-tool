/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/profile/:slug',
            destination: 'https://superiorservers.co/api/profile/:slug', // Proxy to External API
          },
        ];
      },
};

export default nextConfig;
