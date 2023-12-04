const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    ...env,
    mode: 'development',
    entry: {
      main: './src/main.tsx',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: isDevelopment ? 'source-map' : false,
    // Other configurations...
  };
};
