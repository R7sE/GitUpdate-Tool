var path = require('path');
// var webpack = require('webpack');

module.exports = {
    // entry: './src/app.js',
    output: {
        // publicPath: 'http://localhost:8080/',
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:8000/dist/',
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        less: 'vue-style-loader!css-loader!less-loader',
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                    // other vue-loader options go here
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                use: ['style', 'css', 'postcss', 'less']
            }, {
                test: /\.scss$/,
                use: ['style', 'css', 'postcss', 'sass']
            }
        ]
    },
    resolve: {
        alias: {
            // vue$: 'vue/dist/vue.common.js',
            vue$: 'vue/dist/vue.min.js',
            commons: path.resolve(__dirname, '../src/commons'),
        }
    },
    externals: {
        // lodash: '_',
        // vue: 'Vue',
        // vuex: 'Vuex',
        // jquery: 'jQuery',
        // moment: 'moment',
        // Setting: 'Setting',
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
};

// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     // http://vue-loader.vuejs.org/en/workflow/production.html
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             sourceMap: true,
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ]);
// }
