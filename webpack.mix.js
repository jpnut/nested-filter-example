const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.tsx', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .webpackConfig({
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                {
                    test: /\.ttf$/,
                    use: ['file-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                '@api': path.resolve(__dirname, 'resources/js/api/'),
                '@components': path.resolve(__dirname, 'resources/js/components/'),
                '@hooks': path.resolve(__dirname, 'resources/js/hooks/'),
                '@modules': path.resolve(__dirname, 'resources/js/modules/'),
                '@support': path.resolve(__dirname, 'resources/js/support/'),
            },
        },
    });
