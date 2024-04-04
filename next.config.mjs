/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/cobalt/:path*', destination: 'https://api.seventyhost.net/:path*' },
      { source: '/internal/:path*', destination: 'http://localhost:3333/:path*' },
    ]
  }
};

export default nextConfig;
