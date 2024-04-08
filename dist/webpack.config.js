import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
export default (function (env) {
    var paths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
    };
    // передаем переменные
    var config = buildWebpack({
        port: env.port || 3000,
        mode: env.mode || "development",
        paths: paths,
        analyzer: env.analyzer,
        platform: env.platform || "desktop"
    });
    return config;
});
