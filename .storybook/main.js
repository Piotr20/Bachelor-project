const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    const { plugins } = config.resolve;

    /**
     * Add our custom paths to Storybook
     */
    config.resolve.plugins = [
      ...(plugins ?? []),
      new TsconfigPathsPlugin({
        configFile: "tsconfig.storybook.json",
      }),
    ];

    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /icons(\/|\\).*\.svg$/;

    config.module.rules.push({
      test: /icons(\/|\\).*\.svg$/,
      issuer: /\.[jt]sx?$/,
      loader: require.resolve("@svgr/webpack"),
      options: {
        icon: true,
        expandProps: "end",
        titleProp: true,
      },
    });

    return config;
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
};
