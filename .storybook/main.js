const projectWebpackConfig = require('../webpack.config');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/stories.mdx',
    '../src/**/*.stories.js',
    '../src/**/stories.js',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = projectWebpackConfig.resolve.alias['@'];

    return config;
  },
}
