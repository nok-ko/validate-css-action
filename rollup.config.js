import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.mjs',
  output: {
    // dir: 'output',
    file: 'dist/rolluped.js',
    format: 'es'
  },
  plugins: [nodeResolve(), json(), commonjs()]
};