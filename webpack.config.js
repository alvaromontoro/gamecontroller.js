const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, "src", "browser.ts"),
  output: {
    path: path.resolve(__dirname, "dist", "browser"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
}
