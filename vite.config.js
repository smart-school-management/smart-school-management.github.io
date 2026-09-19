import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import JavaScriptObfuscator from 'javascript-obfuscator';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Obfuscate the final Vite JavaScript chunks.
 */
function obfuscatorPlugin(options = {}) {
  const SKIP_CHUNKS = [
    'vendor',
  ];

  return {
    name: 'obfuscator-post-bundle',
    apply: 'build',
    enforce: 'post',

    generateBundle: {
      order: 'post',

      handler(_outputOptions, bundle) {
        const chunks = Object.values(bundle).filter(
          (file) =>
            file.type === 'chunk' &&
            file.fileName.endsWith('.js')
        );

        console.log(
          `\n[obfuscator] processing ${chunks.length} chunk(s)...`
        );

        for (const file of chunks) {
          const baseName = file.fileName.split('/').pop();

          if (
            SKIP_CHUNKS.some(
              (name) => baseName.startsWith(`${name}-`)
            )
          ) {
            console.log(
              `[obfuscator] skip: ${file.fileName}`
            );
            continue;
          }

          const start = Date.now();

          try {
            const result = JavaScriptObfuscator.obfuscate(
              file.code,
              options
            );

            file.code = result.getObfuscatedCode();

            console.log(
              `[obfuscator] done: ${file.fileName} (${Date.now() - start}ms)`
            );
          } catch (err) {
            console.error(
              `[obfuscator] FAILED: ${file.fileName} -> ${err.message}`
            );
          }
        }

        console.log('[obfuscator] complete.\n');
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',

  plugins: [
    react(),

    obfuscatorPlugin({
      // Minified output
      compact: true,

      // Convert variable/function names to hexadecimal
      identifierNamesGenerator: 'hexadecimal',

      // =========================
      // STRING OBFUSCATION
      // =========================

      stringArray: true,

      // Obfuscate essentially all eligible strings
      stringArrayThreshold: 1,

      // Encode strings stored in the string array
      stringArrayEncoding: ['base64'],

      // Rotate the string array
      rotateStringArray: true,

      // Add wrapper functions around string-array access
      stringArrayWrappersCount: 2,

      // Chain wrapper calls
      stringArrayWrappersChainedCalls: true,

      // Maximum wrapper parameters
      stringArrayWrappersParametersMaxCount: 3,

      // Split longer strings
      splitStrings: true,
      splitStringsChunkLength: 5,

      // =========================
      // OBJECTS / IDENTIFIERS
      // =========================

      transformObjectKeys: true,

      renameGlobals: false,
      renameProperties: false,

      // =========================
      // CONTROL FLOW
      // =========================

      // Keep disabled initially for React/Vite compatibility
      controlFlowFlattening: false,
      deadCodeInjection: false,

      // =========================
      // RUNTIME PROTECTION
      // =========================

      selfDefending: false,

      // Keep Unicode readable where possible
      unicodeEscapeSequence: false,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5173,
    open: true,
  },

  build: {
    outDir: 'dist',

    // Do not generate source maps
    sourcemap: false,

    chunkSizeWarningLimit: 1000,

    // Vite/esbuild minification happens before our
    // post-bundle obfuscator.
    minify: 'esbuild',
  },
});