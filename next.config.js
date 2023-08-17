/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

module.exports = nextConfig;
// async redirects() {
//   return [
//     {
//       source: "/",
//       destination: "/home",
//       permanent: true,
//     },
//   ];
// },
//https://avatars.githubusercontent.com/u/90090056?v=4
