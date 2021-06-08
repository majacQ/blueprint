/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");

const { getPackageName, hasIndexHtml } = require("./utils");

const PACKAGE_NAME = getPackageName();
const { NODE_ENV = "development", PORT = 9000 } = process.env;
const isProductionBuild = NODE_ENV === "production";

/**
 * Configure plugins loaded based on environment.
 */
const plugins = [
    new ForkTsCheckerWebpackPlugin(
        isProductionBuild
            ? {
                  async: false,
                  typescript: {
                      configFile: "src/tsconfig.json",
                      useTypescriptIncrementalApi: true,
                      memoryLimit: 4096,
                  },
              }
            : {
                  typescript: {
                      configFile: "src/tsconfig.json",
                  },
              },
    ),

    hasIndexHtml() &&
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),

    // CSS extraction is only enabled in production (see scssLoaders below).
    new MiniCssExtractPlugin({ filename: "[name].css" }),

    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV),
    }),
].filter(Boolean);

if (!isProductionBuild) {
    plugins.push(
        new ForkTsCheckerNotifierWebpackPlugin({ title: `${PACKAGE_NAME}: typescript`, excludeWarnings: false }),
        new WebpackNotifierPlugin({ title: `${PACKAGE_NAME}: webpack` }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    );
}

// Module loaders for .scss files, used in reverse order:
// compile Sass, apply PostCSS, interpret CSS as modules.
const scssLoaders = [
    // Only extract CSS to separate file in production mode.
    isProductionBuild
        ? {
              loader: MiniCssExtractPlugin.loader,
          }
        : require.resolve("style-loader"),
    {
        loader: require.resolve("css-loader"),
        options: {
            // necessary to minify @import-ed files using cssnano
            importLoaders: 1,
        },
    },
    {
        loader: require.resolve("postcss-loader"),
        options: {
            postcssOptions: {
                plugins: [require("autoprefixer"), require("cssnano")({ preset: "default" })],
            },
        },
    },
    require.resolve("sass-loader"),
];

module.exports = {
    // to automatically find tsconfig.json
    context: process.cwd(),

    devtool: isProductionBuild ? false : "inline-source-map",

    devServer: {
        firewall: false,
        historyApiFallback: true,
        https: false,
        open: false,
        overlay: {
            warnings: true,
            errors: true,
        },
  <<<<<<< ad/fix-webpack
        port: DEV_PORT,
        static: "./dist",
  =======
        port: PORT,
  >>>>>>> v4
    },

    mode: isProductionBuild ? "production" : "development",

    module: {
        rules: [
            {
                test: /\.js$/,
                use: require.resolve("source-map-loader"),
            },
            {
                test: /\.tsx?$/,
                use: [
                    // we need babel for react-refresh to work
                    !IS_PRODUCTION && {
                        loader: require.resolve("babel-loader"),
                        options: {
                            plugins: ["react-refresh/babel"],
                        },
                    },
                    {
                        loader: require.resolve("ts-loader"),
                        options: {
                            configFile: "src/tsconfig.json",
                            transpileOnly: true,
                        },
                    },
                ].filter(Boolean),
            },
            {
                test: /\.scss$/,
                use: scssLoaders,
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|png|gif|jpe?g)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name].[ext]?[hash]",
                },
            },
        ],
    },

    plugins,

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
    },

    stats: "errors-only",
};
