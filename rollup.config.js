import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import commonjs from 'rollup-plugin-commonjs';

import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      copy({
        targets: [
          { src: 'src/assets/img', dest: 'dist/assets' },
        ],
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        plugins: [
          [
            'inline-dotenv',
            {
              unsafe: true,
            },
          ],
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-transform-optional-chaining',
          '@babel/plugin-transform-nullish-coalescing-operator',
          [
            'search-and-replace',
            {
              rules: [
                {
                  search: /\.\.\/\.\.\/assets/,
                  searchTemplateStrings: true,
                  replace: './assets',
                },
              ],
            },
          ],
        ],
      }),
      commonjs(),
      external(),
      resolve(),
      terser(),
    ],
  },
];
