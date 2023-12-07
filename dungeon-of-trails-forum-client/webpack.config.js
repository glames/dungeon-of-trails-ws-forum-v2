const path = require('path');
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const Dotenv = require('dotenv-webpack');
// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.plugins.push(new Dotenv());
  config.output = {
    filename: '[name].bundle.js',
    path: path.resolve('/opt/build/repo/build'), // Use an absolute path
  };
  console.log('HIHI' + path.resolve('/opt/build/repo/build'));
  // Disable CSS minification
  config.optimization.minimize = false;
  return config;
});
