import React from 'react';
import { Tree } from 'antd';
import { ReactComponent as File } from '../../../public/img/file.svg';
import { ReactComponent as Flod } from '../../../public/img/flod.svg';
import type { DataNode, TreeProps } from 'antd/es/tree';

const treeData: DataNode[] = [
  {
    title: '业务对象',
    key: '0',
    icon: <Flod />,
    children: [
      {
        title: '对象 1',
        icon: <File />,
        key: '0-0',
      },
      {
        title: '对象 2',
        icon: <File />,
        key: '0-1',
      },
    ],
  },
  {
    title: '关系',
    key: '1',
    icon: <Flod />,
    children: [
      { title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' },
    ],
  },
];
export const BusinessObjList: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div className="list-wrap">
      <Tree
        draggable
        showIcon
        defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};
