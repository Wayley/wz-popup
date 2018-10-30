import rollupPluginJson from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

const config = {
  input: 'src/components/popup/index.js',
  output: [
    {
      file: 'dist/popup.js',
      name: 'Popup',
      format: 'umd'
    },
    {
      file: 'dist/popup.es.js',
      format: 'es'
    },
    {
      file: 'dist/popup.amd.js',
      format: 'amd'
    },
    {
      file: 'dist/popup.cjs.js',
      format: 'cjs'
    }
  ],
  plugins: [
    resolve({
      jsnext: true, // 该属性是指定将Node包转换为ES2015模块
      // main 和 browser 属性将使插件决定将那些文件应用到bundle中
      main: true, // Default: true
      browser: true // Default: false
    }),
    commonjs({}),
    rollupPluginJson(),
    postcss({
      plugins: []
    })
  ]
};
export default config;
