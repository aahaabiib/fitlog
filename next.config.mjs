const nextConfig = {
  reactStrictMode: false,

  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
    ],
  },
};

export default nextConfig;