const path = require('path');

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha-loader!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(png|svg|jpg|gif)$/, loader: "file-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss']
  },
  mode: 'development'
};
