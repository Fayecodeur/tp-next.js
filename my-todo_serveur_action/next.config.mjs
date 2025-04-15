/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["cdn.pixabay.com"],
        formats: ["image/avif", "image/webp"]
    }
};

export default nextConfig;
