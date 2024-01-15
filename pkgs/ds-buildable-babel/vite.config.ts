/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import stylexPlugin from '@stylexjs/rollup-plugin';

const stylex = stylexPlugin({
  // Required. File path for the generated CSS file.
  fileName: './.build/stylex.css',
  // default: false
  dev: false,
  // prefix for all generated classNames
  classNamePrefix: 'x',
  // Required for CSS variable support
  unstable_moduleResolution: {
    // type: 'commonJS' | 'haste'
    // default: 'commonJS'
    type: 'commonJS',
    // The absolute path to the root directory of your project
    rootDir: __dirname,
  },
})

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/pkgs/ds-buildable-babel',

  plugins: [
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../dist/pkgs/ds-buildable-babel',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.stylex.ts',
      name: 'ds-buildable-babel',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [],
      plugins: [
        stylex
      ]
    },
  },
});
