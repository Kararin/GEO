// module.exports = {
//     entry: './es6/app.js',
//     output: {
//         path: './public/javascripts',
//         fileName: 'index.js'
//     },
//     module: {
//         rules: [{
//             test: /\.\/es6\.js$/,
//             use: {
//                 loader: 'babel-loader'
//             }
//         }, {
//             test: /\.\/es6\.jsx/,
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['env']
//                 }
//             }
//         }]
//     }
// };

const webpack = require('webpack');

module.exports = {
    entry: './es6/app.jsx',
    output: {
        path: '/public/javascripts',
        filename: 'index.js',
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react'],
                }
            }
        }]
    },

    watch: true,
    devtool: 'source-map'
};