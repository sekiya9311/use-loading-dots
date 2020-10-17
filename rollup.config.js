import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import path from 'path';

import pkg from './package.json';

const configs = [
  {
    dir: path.dirname(pkg.main),
    format: 'cjs',
    declarationDir: path.dirname(pkg.main),
  },
  {
    dir: path.dirname(pkg.module),
    format: 'es',
    declarationDir: path.dirname(pkg.module),
  },
];

export default configs.map(({ dir, format, declarationDir }) => ({
  input: 'src/index.ts',
  output: [{ dir, format, sourcemap: true, exports: 'named', preserveModules: true }],
  plugins: [
    external(),
    resolve({ extensions: ['.js', '.ts'] }),
    typescript({ declarationDir }),
    commonjs({
      include: ['node_modules/**'],
    }),
  ],
}));
