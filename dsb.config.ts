import { defineConfig } from '@doubleshot/builder'

export default defineConfig({
  main: 'dist/main.js',
  entry: 'src/main.ts',
  outDir: 'dist',
  external: ['./package.json', 'multer']
})
