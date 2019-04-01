const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    target: 'node',
    devtool: false,
    context: path.resolve(__dirname, 'src'),
    entry: {
        'server.bundle': 'entry-server.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js?[hash:8]',
        libraryTarget: 'commonjs2',
        publicPath: '/dist/'
    },
    externals: Object.keys(require('./package.json').dependencies),
    optimization: {
        minimizer: [new TerserPlugin()],
    }, 
    resolve: {
        alias: {
            vue: process.env.NODE_ENV === "development" ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
        },
        modules: [
            path.resolve('src'),
            path.resolve('src/images'),
            path.resolve('src/components'),
            path.resolve('node_modules')
        ],
        extensions: ['.js', '.vue']
    },
    module:{
        rules:[
            {
                test: /\.(sass|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        'options':{
                            // data: `@import "./src/scss/global/global.scss";`
                        }
                    }
                    
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]?[hash:8]'
                }
            },
            {
                test: /\.(vue)$/,
                use: 'vue-loader',
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                include: path.resolve('src/images'),
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 3000,
                            name:'[path][name].[ext]?[hash:8]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};

module.exports = config;
