// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import React from 'react';
import { useModel } from '@umijs/max';
import useGlobal, { AddModelModal } from './models/useGlobal';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

function AddBtn() {
  const { setOpen, open, gData } = useGlobal();
  return (
    <>
      <Button
        style={{ marginRight: 48 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <PlusOutlined />
        添加模型
      </Button>
      <AddModelModal open={open} setOpen={setOpen} gData={gData} />
    </>
  );
}

export const layout = () => {
  return {
    title: '数据建模平台',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: true,
    },
    layout: 'top',
    rightRender: (initialState: any) => {
      return <AddBtn />;
    },
    // headerRender: false,
  };
};
