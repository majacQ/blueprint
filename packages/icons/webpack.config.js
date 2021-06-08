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

  <<<<<<< ad/fix-webpack
const { baseConfig, COMMON_EXTERNALS } = require("@blueprintjs/webpack-build-scripts");
  =======
const path = require("path");
  >>>>>>> v4

const { baseConfig, COMMON_EXTERNALS } = require("@blueprintjs/webpack-build-scripts");

module.exports = Object.assign({}, baseConfig, {
    entry: {
  <<<<<<< ad/fix-webpack
        icons: "./src/index.ts",
  =======
        icons: ["./src/generated/index.ts"],
  >>>>>>> v4
    },

    externals: COMMON_EXTERNALS,

    output: {
        filename: "[name].bundle.js",
        library: ["Blueprint", "Icons"],
        libraryTarget: "umd",
  <<<<<<< ad/fix-webpack
  =======
        path: path.resolve(__dirname, "./dist"),
  >>>>>>> v4
    },

    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 500000,
    },
});
