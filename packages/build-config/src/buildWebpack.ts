import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, port, paths } = options;
  const isDev = options.mode === "development";

  return {
    mode: mode || "development", //если девелопмент то бидовский код более неоптимизированный и наоборот для прода.  Можно использовать dotenv
    entry: paths.entry,
    //todo если точек входа несколько то можно передавать несколько исполняемых файлов
    // entry: {
    //     helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //     helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // }
    //todo ====end====

    //путь куда будет сохранятся билд
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js", //name по умолчанию main, добавляем contenthash для того чтобы файлы не дублировались и не кэшировались
      clean: true, //для того чтобы при каждой сборке файлы заменялись в папке build
    },
    plugins: buildPlugins(options),
    module: {
      //указываются лоадеры
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : undefined,
    //если дев мод то сервер не запускается
    //настройки дев сервера
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
