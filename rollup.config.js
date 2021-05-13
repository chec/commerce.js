import babel from "rollup-plugin-babel";
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupJson from 'rollup-plugin-json';
import rollupCommonJs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: "./src/index.js",
    output: {
      file: "./lib/index.js",
      format: "cjs",
      name: "bundle"
    },
    plugins: [
      babel({
        runtimeHelpers: true,
        plugins: ["@babel/plugin-transform-runtime"]
      }),
      terser({
        mangle: false,
        format: {
          comments: false
        },
        compress: {
          module: true
        }
      })
    ]
  },
  {
    input: "./src/index.js",
    output: {
      file: "./lib/commerce.js",
      format: "iife",
      name: "Commerce"
    },
    plugins: [
      rollupCommonJs({
        include: 'node_modules/**',
      }),
      rollupNodeResolve({ browser: true }),
      rollupJson(),
      babel({
        runtimeHelpers: true,
        plugins: ["@babel/plugin-transform-runtime"]
      }),
      terser({
        mangle: false,
        format: {
          comments: false
        },
        compress: false
      })
    ]
  }
];
