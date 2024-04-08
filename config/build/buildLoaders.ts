import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  //обработка свг
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: "@svgr/webpack", options: { icon: true } }],
  };

  //обработка картинок
  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };
  //настраивается для css  модулей
  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  //лоадер для scss/css - test: /\.css$/i,
  const scssLoader = {
    test: /\.s[ac]ss$/i, //
    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderWithModules, "sass-loader"], //MiniCssExtractPlugin вставляем вместо style-loadera
  };


    //ts-loader умеет работать с JSX
  //!Если бы был просто js то нужно было бы настраивать babel-loader
  const tsLoader = {
    test: /\.tsx?$/, //регулярка для расширений файлов
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev, //true //чтобы при сборке не проверялся TS(что замедляет сборку). Можно включить только для дева
        },
      },
    ],
    exclude: /node_modules/, //то что не обрабатываем
  };

  return [assetsLoader, scssLoader, tsLoader, svgLoader];
}
