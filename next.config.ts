/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maghaleh.storage.iran.liara.space",
      },
    ],
    loader: "default",
  },
};

export default nextConfig;
