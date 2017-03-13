const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
// const autoprefixer = require('autoprefixer');
module.exports = webpackMerge(commonConfig, {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8000',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/web/app.js'),
    ],
    devtool: '#inline-source-map',
    // devtool: 'cheap-module-eval-source-map',
    plugins: [
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './www',
        port: 8000,
        // color: true,
        hot: true,
        inline: true,
        // historyApiFallback: true,
        // noInfo: true,
        // stats: 'minimal',
    },
    // postcss: [autoprefixer({browsers: ['last 2 versions']})]
});
