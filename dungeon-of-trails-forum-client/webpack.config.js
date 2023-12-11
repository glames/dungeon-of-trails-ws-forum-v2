const path = require('path');
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const Dotenv = require('dotenv-webpack');
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(new Dotenv());
  config.output = {
    filename: '[name].bundle.js',
    path: path.resolve('build'), // Use an absolute path
  };
  // Disable CSS minification
  console.log('HIHIHI: ' + path.resolve('build'));
  config.optimization.minimize = false;
  return config;
});
