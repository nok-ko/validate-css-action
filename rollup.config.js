import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.mjs',
  output: {
    file: 'dist/rolluped.mjs',
    format: 'es'
  },
  plugins: [nodeResolve({
    extensions: [ '.js', '.json' ],
  }), commonjs(), json()]
};