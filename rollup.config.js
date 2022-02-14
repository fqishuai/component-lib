import * as path from 'path';
import fse from 'fs-extra';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

// 清空目标目录
fse.emptyDirSync(path.join(process.cwd(), 'dist'))

export default {
  context: "this",
  input: "src/index.ts",
  output: [
    {
      file: "dist/component-lib.js",
      format: "esm",
    },
    {
      file: "dist/component-lib.min.js",
      format: "esm",
      plugins: [terser()],
    },
    {
      file: "dist/component-lib.iife.min.js",
      format: "iife",
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    filesize({
      showMinifiedSize: false,
      showBrotliSize: true,
    }),
  ]
}