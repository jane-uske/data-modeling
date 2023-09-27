// 全局共享数据示例
import { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, TreeSelect, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import services from '@/services';
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

interface ModelData {
  type: 0 | 1 | 2;
  subjectDomainId: number;
  name: string;
  maxNum: number;
  remark?: string;
}

const useGlobal = () => {
  const [gData, setGData] = useState<TreeNode[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [modelData, setModelData] = useState<ModelData>();

  const saveCavans = async () => {
    console.log(modelData, 'modelData');
    const res = await services.ModelController.saveOrUpdateModel(
      modelData as ModelData,
    );
    console.log(res);
  };

  return {
    gData,
    open,
    modelData,
    setGData,
    setOpen,
    saveCavans,
    setModelData,
  };
};

export default useGlobal;
