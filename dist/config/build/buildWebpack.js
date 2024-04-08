import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
export function buildWebpack(options) {
    var mode = options.mode, port = options.port, paths = options.paths;
    var isDev = options.mode === "development";
    return {
        mode: mode || "development",
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
            filename: "[name].[contenthash].js",
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
