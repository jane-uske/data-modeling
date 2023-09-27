import { defineConfig } from '@umijs/max';

export default defineConfig({
  proxy: {
    '/businessObject': {
      // 指定代理路径
      target: 'http://10.30.90.53:8080', // 目标地址
      changeOrigin: true,
    },
    '/subjectDomain': {
      // 指定代理路径
      target: 'http://10.30.90.53:8080', // 目标地址
      changeOrigin: true,
    },
    // '/': {
    //   // 指定代理路径
    //   target: 'http://10.30.90.53:8080', // 目标地址
    //   changeOrigin: true,
    // },
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
  routes: [
    {
      path: '/',
      redirect: '/modelManage',
    },
    {
      name: '模型管理',
      path: '/modelManage',
      component: './ModelManage',
    },
    {
      name: '基础设置',
      path: '/basicSetting',
      component: './BasicSetting',
    },
    {
      // name: '文本识别',
      path: '/canvas',
      component: './Canvas',
    },
  ],
  npmClient: 'pnpm',
});
