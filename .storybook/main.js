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
      contexts: path.resolve(__dirname, '../src/contexts'),
      molecules: path.resolve(__dirname, '../src/viz/molecules'),
      organisms: path.resolve(__dirname, '../src/viz/organisms'),
      shapes: path.resolve(__dirname, '../src/viz/atoms/shapes'),
      src: path.resolve(__dirname, '../src'),
      storybook: path.resolve(__dirname, '../.storybook'),
      tools: path.resolve(__dirname, '../src/viz/atoms/tools'),
      utils: path.resolve(__dirname, '../src/utils'),
    };
    return config;
  },
}
