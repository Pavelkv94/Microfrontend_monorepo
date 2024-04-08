//!КОНФИГ ДО ДЕКОМПОЗИЦИИ
// const path = require("path"); //используем path для более корректного построения путей
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
//после добавления ts можем импорты писать по другому
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export default (function (env) {
    var isDev = env.mode === "development";
    var isProd = env.mode === "production";
    // передаем переменные
    var config = {
        mode: env.mode || "development",
        entry: path.resolve(__dirname, "src", "index.tsx"),
        //todo если точек входа несколько то можно передавать несколько исполняемых файлов
        // entry: {
        //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
        //     helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
        // }
        //todo ====end====
        //путь куда будет сохранятся билд
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].[contenthash].js",
            clean: true, //для того чтобы при каждой сборке файлы заменялись в папке build
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
            isDev ? new webpack.ProgressPlugin() : undefined,
            isProd && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            })
        ],
        module: {
            //указываются лоадеры
            rules: [
                //лоадер для scss/css - test: /\.css$/i,
                {
                    test: /\.s[ac]ss$/i,
                    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //MiniCssExtractPlugin вставляем вместо style-loadera
                },
                //ts-loader умеет работать с JSX
                //!Если бы был просто js то нужно было бы настраивать babel-loader
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/, //то что не обрабатываем
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"], // можно в импорте не указывать эти расширения файлов(порядок важен)
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        //если дев мод то сервер не запускается
        //настройки дев сервера
        devServer: isDev && {
            port: env.port || 3000,
            open: true
        }
    };
    return config;
});
