import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function  buildResolvers (options: BuildOptions) : Configuration['resolve'] {
  return {
    extensions: [".tsx", ".ts", ".js"], // можно в импорте не указывать эти расширения файлов(порядок важен)
    alias: {
      '@': options.paths.src,
    }
  }
}

