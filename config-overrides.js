const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
    config.entry = {
        main: './src/components/Popup.tsx',
        background: './src/background.ts',
    };

    config.output = {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    };

    config.optimization = {
        splitChunks: {
            cacheGroups: {
                default: false,
            },
        },
    };
    // Ensure plugins is defined and is an array
    if (!config.plugins) {
        config.plugins = [];
    } else if (!Array.isArray(config.plugins)) {
        config.plugins = [config.plugins];
    }

    config.plugins = config.plugins.filter(plugin => {
        return !(
            plugin.constructor.name === 'HtmlWebpackPlugin' ||
            plugin.constructor.name === 'GenerateSW'
        );
    });

    config.plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['main'],
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
    );

    return config;
};
