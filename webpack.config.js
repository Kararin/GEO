let webpack = require('webpack'),
    path = require('path');

module.exports = {
    entry: './es6/app.js',
    output: {
        path: path.resolve('./public/javascripts'),
        filename: 'index.js',
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [
                    'react'
                ],
                plugins: []
            },
            include: [
                path.resolve(__dirname, 'es6')
            ]
        }]
    },
    watch: true,
    devtool: 'source-map'
};