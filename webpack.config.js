module.exports = {
  // Other Webpack configuration options

  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      net: require.resolve('net-browserify'), // If needed
      tls: require.resolve('tls-browserify'), // If needed
    },
  },
};