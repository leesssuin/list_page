/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true
  },
  experimental: { forceSwcTransforms: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.29cm.co.kr"
      }
    ]
  }
};

module.exports = nextConfig;
