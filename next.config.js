// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   extends: ["plugin:@next/next/recommended"],
// };

// module.exports = nextConfig;

module.exports = {
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
