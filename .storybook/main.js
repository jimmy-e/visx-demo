const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      shapes: path.resolve(__dirname, '../src/atoms/shapes'),
      src: path.resolve(__dirname, '../src'),
      tools: path.resolve(__dirname, '../src/atoms/tools'),
    };
    return config;
  },
}
