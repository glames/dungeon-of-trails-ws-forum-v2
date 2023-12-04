const path = require('path');
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const Dotenv = require('dotenv-webpack');
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(new Dotenv());
  config.entry = {
    main: './dungeon-of-trails-forum-client/src/main.tsx',
  };
  config.output = {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'), // Use an absolute path
  };
  // Disable CSS minification
  config.optimization.minimize = false;
  return config;
});
