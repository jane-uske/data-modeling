// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { useModel, history } from '@umijs/max';
import {
  PlusOutlined,
  SaveOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

function AddBtn() {
  const { setOpen, saveCanvas } = useModel('useGlobal');
  if (location.pathname !== '/canvas') {
    return (
      <Button
        type="primary"
        style={{ marginRight: 48 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <PlusOutlined />
        新建模型
      </Button>
    );
  }
  return (
    <>
      <Button type="primary" style={{ marginRight: 16 }} onClick={saveCanvas}>
        <SaveOutlined />
        保存
      </Button>
      <Button
        style={{ marginRight: 48 }}
        onClick={() => {
          history.back();
        }}
      >
        <RollbackOutlined />
        退出
      </Button>
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
