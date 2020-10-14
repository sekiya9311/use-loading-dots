import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs', sourceMap: true },
      { file: pkg.module, format: 'esm', sourceMap: true },
    ],
    plugins: [
      external(),
      nodeResolve(),
      typescript(),
      commonjs({
        include: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
];
