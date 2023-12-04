const path = require('path');
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const Dotenv = require('dotenv-webpack');
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(new Dotenv());
  config.output = {
    filename: '[name].bundle.js',
    path: path.resolve('dist'), // Use an absolute path
  };
  console.log('HIHI' + path.resolve('dist'));
  // Disable CSS minification
  config.optimization.minimize = false;
  return config;
});
