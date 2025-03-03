const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = {
    mode: 'production',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // Note: The presets will be set separately in each config
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

const esmConfig = {
    ...commonConfig,
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
        rules: commonConfig.module.rules.map(rule => {
            if (rule.test.toString().includes('.js')) {
                // Clone the JS rule and update Babel preset targets for ES modules
                return {
                    ...rule,
                    use: {
                        ...rule.use,
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            esmodules: true
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                };
            }
            return rule;
        })
    }
};

const es5Config = {
    ...commonConfig,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bo-story-bundle.js',
        publicPath: '/dist/'
        // No library.type needed unless you're exporting a library
    },
    // No experiments for ES5 output
    module: {
        rules: commonConfig.module.rules.map(rule => {
            if (rule.test.toString().includes('.js')) {
                // Clone the JS rule and update Babel preset targets for ES5
                return {
                    ...rule,
                    use: {
                        ...rule.use,
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        // Adjust targets as needed for ES5 support
                                        targets: {
                                            // Example: support IE 11 or older browsers
                                            ie: "11"
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                };
            }
            return rule;
        })
    }
};

module.exports = [esmConfig, es5Config];
