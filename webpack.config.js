// import
const path = require("path");
// import html plig-in
const HTMLWebpackPlugin = require("html-webpack-plugin");
// import clean plug-in
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// all the webpack configs should write inside module.exports
module.exports = {
  // Declare index file.
  entry: "./src/index.ts",

  // set up where build folder
  output: {
    // set up build file's directory
    path: path.resolve(__dirname, "dist"),
    // set up build file's name
    filename: "bundle.js",

    // webpack don't use arrow function and const keywords.
    environment: {
      arrowFunction: false,
      const: false,
    },
  },

  // webpack building modules set up
  module: {
    rules: [
      {
        test: /\.ts$/,
        // loader
        use: [
          // babel config
          {
            loader: "babel-loader",
            options: {
              // set up environment
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // target browser info.
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // corejs version
                    corejs: "3",
                    // corejs  "usage"
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // excluding files.
        exclude: /node-modules/,
      },

      // less setup
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",

          // import postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  // Webpack plug-in
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "title"
      template: "./src/index.html",
    }),
  ],

  // setup import module
  resolve: {
    extensions: [".ts", ".js"],
  },
};
