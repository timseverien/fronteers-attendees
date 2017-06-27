import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/scripts/main.js',
  dest: 'docs/assets/scripts/main.js',
  format: 'iife',
  moduleName: 'App',
  sourceMap: true,
  plugins: [
    buble(),
    resolve(),
  ],
};
