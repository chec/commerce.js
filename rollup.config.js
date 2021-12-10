import typescript from '@rollup/plugin-typescript';

const outputs = [
  // CommonJS for node without ESM support
  {
    format: 'cjs',
    // This means that Commerce is the only export with CommonJS
    output: { exports: 'default' },
    // Target for a minimum of node 12
    target: 'es2019',
  },
  // UMD for a browser bundle
  {
    format: 'umd',
    output: {
      name: 'commerce',
      file: './umd/index.js',
    },
    target: 'ES5',
    sourcemap: false,
  },
  // ESM
  {
    format: 'esm',
    target: 'es2020',
  }
];

export default outputs.map(({
  format,
  output = {},
  target,
  tsOptions = {},
  sourcemap = true,
}) => ({
  input: "./src/index.ts",
  output: {
    file: `./dist/index.${format}.js`,
    sourcemap,
    format,
    ...output,
  },
  plugins: [
    typescript({
      target,
      ...tsOptions,
    })
  ]
}));
