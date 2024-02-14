/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {domains: ["cdn.pixabay.com", "utfs.io"]},
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'standalone'
};

module.exports = nextConfig;
