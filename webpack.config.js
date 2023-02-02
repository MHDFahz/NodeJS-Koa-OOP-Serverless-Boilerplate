const path = require('path');
const slsw = require('serverless-webpack');

const env = process.env.NODE_ENV || 'production';
const mode = env === 'development' ? 'development' : 'production';

module.exports = {
    entry: slsw.lib.entries,
    output: {
        libraryTarget: 'commonjs',
        filename: '[name].js',
        path: path.join(__dirname, '.webpack'),
    },
    mode,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/, // include .js files
                enforce: 'pre', // preload the jshint loader
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                include: __dirname,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
};
