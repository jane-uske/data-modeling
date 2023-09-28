import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  proxy: {
    '/modeling': {
      // 指定代理路径
      target: 'http://10.40.0.73:8080', // 目标地址
      changeOrigin: true,
    },
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  // plugins:['@umijs/plugins/dist/antd'],
  routes,
  npmClient: 'pnpm',
});
