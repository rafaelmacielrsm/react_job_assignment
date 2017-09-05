var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "assets"
  },
  devServer: {
    historyApiFallback: true, //No match route
    inline: true,
    contentBase: "./dist",
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0", "react"]
        }
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js"
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: "postcss.config.js"
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /(node_modules)/,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /(node_modules)/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  }
}
