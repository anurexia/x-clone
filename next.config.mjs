/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.cnn.com",
      },
      {
        protocol: "https",
        hostname: "media.cnn.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "mowvvffcqmgkqlmhflwj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
