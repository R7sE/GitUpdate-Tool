const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const autoprefixer = require('autoprefixer');
module.exports = webpackMerge(commonConfig, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        // filename: 'app.js',
    },
    externals: {
        lodash: '_',
        vue: 'Vue',
        vuex: 'Vuex',
        jquery: 'jQuery',
        moment: 'moment',
        // Setting: 'Setting',
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            minimize: true,
            compress: {warnings: false}
        }),
    ],

    postcss: [autoprefixer({browsers: ['last 2 versions']})]
});
