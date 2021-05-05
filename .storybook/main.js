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
      '__fixtures__': path.resolve(__dirname, '../src/__fixtures__'),
      atoms: path.resolve(__dirname, '../src/viz/atoms'),
      molecules: path.resolve(__dirname, '../src/viz/molecules'),
      organisms: path.resolve(__dirname, '../src/viz/organisms'),
      shapes: path.resolve(__dirname, '../src/viz/atoms/shapes'),
      src: path.resolve(__dirname, '../src'),
      tools: path.resolve(__dirname, '../src/viz/atoms/tools'),
      wrappers: path.resolve(__dirname, '../src/viz/atoms/wrappers'),
    };
    return config;
  },
}
