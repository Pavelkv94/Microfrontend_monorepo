
//!КОНФИГ ДО ДЕКОМПОЗИЦИИ



// const path = require("path"); //используем path для более корректного построения путей
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');

//после добавления ts можем импорты писать по другому
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin  from "mini-css-extract-plugin";

//типизируем входные переменные
type Mode = "development" | "production";
type EnvVariables = {
  mode: Mode,
  port: number
}

export default (env: EnvVariables) => {


  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  // передаем переменные
  const config: webpack.Configuration = {
    mode: env.mode || "development", //если девелопмент то бидовский код более неоптимизированный и наоборот для прода.  Можно использовать dotenv
    entry: path.resolve(__dirname, "src", "index.tsx"), //путь дл исполняемого файла
    //todo если точек входа несколько то можно передавать несколько исполняемых файлов
    // entry: {
    //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //     helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // }
    //todo ====end====

    //путь куда будет сохранятся билд
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js", //name по умолчанию main, добавляем contenthash для того чтобы файлы не дублировались и не кэшировались
      clean: true, //для того чтобы при каждой сборке файлы заменялись в папке build
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }), //ссылка до html файла
      isDev ? new webpack.ProgressPlugin() : undefined, // показывает проценты сборки в процессе(//!для прода не рекомендуется)
      isProd && new MiniCssExtractPlugin({ //MiniCssExtractPlugin позволяет создавать css файлы в билде
        filename: 'css/[name].[contenthash:8].css', //сохраняем в папку /css и задаем имя файла
        chunkFilename: 'css/[name].[contenthash:8].css',
      }) 
    ],
    module: {
      //указываются лоадеры
      rules: [
        //лоадер для scss/css - test: /\.css$/i,
        {
          test: /\.s[ac]ss$/i, //          
          use: [isDev ? "style-loader" :  MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], //MiniCssExtractPlugin вставляем вместо style-loadera
        },
        //ts-loader умеет работать с JSX
        //!Если бы был просто js то нужно было бы настраивать babel-loader
        {
          test: /\.tsx?$/, //регулярка для расширений файлов
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
};
