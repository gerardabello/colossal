var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: './main.jsx',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/build',
        publicPath: 'http://localhost:8080/build/'
    },

    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            },

            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },

            { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
        ]
    },
    node: {
        fs: 'empty'
    }
};
