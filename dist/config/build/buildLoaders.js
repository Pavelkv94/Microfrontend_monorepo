import MiniCssExtractPlugin from "mini-css-extract-plugin";
export function buildLoaders(options) {
    var isDev = options.mode === "development";
    //обработка свг
    var svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    };
    //обработка картинок
    var assetsLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };
    //настраивается для css  модулей
    var cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
            },
        },
    };
    //лоадер для scss/css - test: /\.css$/i,
    var scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderWithModules, "sass-loader"], //MiniCssExtractPlugin вставляем вместо style-loadera
    };
    //ts-loader умеет работать с JSX
    //!Если бы был просто js то нужно было бы настраивать babel-loader
    var tsLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true, //чтобы при сборке не проверялся TS(что замедляет сборку). Можно включить только для дева
                },
            },
        ],
        exclude: /node_modules/, //то что не обрабатываем
    };
    return [assetsLoader, scssLoader, tsLoader, svgLoader];
}
