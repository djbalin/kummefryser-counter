// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   extends: ["plugin:@next/next/recommended"],
// };

// module.exports = nextConfig;
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
