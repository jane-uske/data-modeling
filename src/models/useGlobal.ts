// 全局共享数据示例
import { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, TreeSelect, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

export type TreeNode = DataNode & {
  key: string;
  title: string;
  edit?: boolean;
  children?: TreeNode[];
  level: number;
  isNew?: boolean;
  value?: string;
};

const useGlobal = () => {
  const [gData, setGData] = useState<TreeNode[]>([]);
  console.log(gData);
  const [open, setOpen] = useState<boolean>(false);

  return {
    gData,
    setGData,
    open,
    setOpen,
  };
};

export default useGlobal;
