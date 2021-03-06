import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration, ProvidePlugin } from "webpack";


const BASE_DIR = path.resolve(__dirname);
const SRC = path.join(BASE_DIR, "src");
const DIST = path.join(BASE_DIR, "dist");
const INDEX_HTML = "index.html";

const MAIN_CHUNK = "bouncy-bob";

export default function configFn(): Configuration {
  return {
    entry: {
      [MAIN_CHUNK]: path.join(SRC, "index.ts")
    },
    output: {
      path: DIST,
      filename: "[name]_[contenthash].js"
    },
    watchOptions: {
      ignored: [
        "/node_modules/",
        "/install/"
      ]
    },
    devtool: "source-map",
    module: {
      // Rules for file-types I use only
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: { loader: "html-loader" }
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          oneOf: [
            {
              test: /\.m\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                    onlyLocals: false,
                    localsConvention: "camelCase",
                    sourceMap: true
                  }
                },
                "sass-loader"
              ]
            },
            {
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: true,
                  },
                },
                "sass-loader"
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: "body",
        chunks: "all",
        favicon: "resource/image/bounce.png",
        filename: INDEX_HTML,
        template: path.join(SRC, INDEX_HTML)
      }),
      new ProvidePlugin({
        "$": "jquery",
        "jQuery": "jquery"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].js"
      })
    ],
    devServer: {
      host: "localhost",
      port: 4500,
      publicPath: "/",
      contentBase: DIST,
      inline: false,
      hot: false,
      compress: true
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"]
    }
  };
}
