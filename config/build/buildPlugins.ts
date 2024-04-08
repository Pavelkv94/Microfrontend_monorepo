import { Configuration, DefinePlugin, ids } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const isDev = options.mode === "development";
  const isProd = options.mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: options.paths.html, //ссылка до html файла
      favicon: path.resolve(options.paths.public, "favicon.ico"), //ссылка до favicon
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(options.platform), //определяем переменную при сборке
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.ProgressPlugin() // показывает проценты сборки в процессе(//!для прода не рекомендуется)
    );
    plugins.push(
      new ForkTsCheckerWebpackPlugin() // для проверки TS паралельно сборке. работает при включенном transpileOnly: true(в лоадерах)
    );
    plugins.push(
      new ReactRefreshWebpackPlugin() // плагин для обновления страницы без перезагрузки после изменения кода
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        //MiniCssExtractPlugin позволяет создавать css файлы в билде
        filename: "css/[name].[contenthash:8].css", //сохраняем в папку /css и задаем имя файла
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      new CopyPlugin({
        //плагин для копирования в билд сборку статических файлов например файлов с переводами
        patterns: [{ from: path.resolve(options.paths.public, "locales"), to: path.resolve(options.paths.output, 'locales') }],
      })
    );
  }

  if (options.analyzer) {
    plugins.push(
      new BundleAnalyzerPlugin() // Для анализа размера бандла
    );
  }

  return plugins;
}
