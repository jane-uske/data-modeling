import { defineConfig } from '@umijs/max';

export default defineConfig({
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
