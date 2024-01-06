const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './index.js', // Change to single JS entry
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bo-story-bundle.mjs',
        publicPath: '/dist/',
        library: {
            type: 'module'
        }
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "esmodules": true
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bo-story-bundle.css',
        }),
    ]
};
