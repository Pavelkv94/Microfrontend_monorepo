//файл для обработки нестандартных расширений файлов

declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string
    }

    const className: IClassNames;
    export = className
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

//для автокомплита по пропсам у свг
declare module "*.svg" {
    import React from "react";
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

//определяем переменную при сборке, чтобы могли ее вывести при желании.
declare const __PLATFORM__: "desktop" | "mobile";