import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'date/index': 'src/date/index.ts',
    'string/index': 'src/string/index.ts',
    'number/index': 'src/number/index.ts',
    'status/index': 'src/status/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'es2020',
});
