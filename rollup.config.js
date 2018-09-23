import ts from 'rollup-plugin-typescript';
import typescript from 'typescript';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  external: [],
  plugins: [
    ts({
      typescript,
    }),
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
};
