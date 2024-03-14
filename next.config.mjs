/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/youtube/:path*', destination: 'https://api.seventyhost.net/:path*' },
        ]
    }
};

export default nextConfig;
