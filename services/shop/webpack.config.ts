import webpack from "webpack";
import { BuildMode, BuildPaths, BuildPlatform, buildWebpack } from "@packages/build-config";
import path from "path";
import packageJson from './package.json';

//типизируем входные переменные
type EnvVariables = {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
};

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  // передаем переменные
  const config: webpack.Configuration = buildWebpack({
    port: env.port || 3001,
    mode: env.mode || "development",
    paths: paths,
    analyzer: env.analyzer, //переменная для включения плагина анализатора бандла
    platform: env.platform || "desktop",
  });

    //Настраиваем Module Federation
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx'
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true, //означает что библиотеку нужно загрузить сразу а не lazy
          requiredVersion: packageJson.dependencies['react']
        },
        'react-router-dom': {
          eager: true, //означает что библиотеку нужно загрузить сразу а не lazy
          requiredVersion: packageJson.dependencies['react-router-dom']
        },
        'react-dom': {
          eager: true, //означает что библиотеку нужно загрузить сразу а не lazy
          requiredVersion: packageJson.dependencies['react-dom']
        },
      }
    }))

  return config;
};
