import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/scripts/main.js',
  dest: 'docs/assets/scripts/main.js',
  format: 'iife',
  moduleName: 'App',
  plugins: [
    buble(),
    resolve(),
  ],
};
