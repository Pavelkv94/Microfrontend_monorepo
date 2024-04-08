import { DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
export function buildPlugins(options) {
    var isDev = options.mode === "development";
    var isProd = options.mode === "production";
    var plugins = [
        new HtmlWebpackPlugin({ template: options.paths.html }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform) //определяем переменную при сборке
        })
    ];
    if (isDev) {
        plugins.push(new webpack.ProgressPlugin() // показывает проценты сборки в процессе(//!для прода не рекомендуется)
        );
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            //MiniCssExtractPlugin позволяет создавать css файлы в билде
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }));
    }
    if (options.analyzer) {
        plugins.push(new BundleAnalyzerPlugin() // Для анализа размера бандла
        );
    }
    return plugins;
}
