export function buildDevServer(options) {
    return {
        port: options.port || 3000,
        open: true,
        historyApiFallback: true //для роутинга на СПА. //!только для дев сервера
    };
}
