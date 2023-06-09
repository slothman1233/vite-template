/**
 * vite 为打包后的文件提供传统浏览器兼容性支持
 */

import legacy from '@vitejs/plugin-legacy';
import { Plugin } from 'vite';

export default (): Plugin | null => {
  return legacy({
    targets: ['> 1%, last 1 version, ie >= 11'],
    additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
  });
};
