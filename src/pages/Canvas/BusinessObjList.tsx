import React from 'react';
import { Tree } from 'antd';
import { ReactComponent as File } from '../../../public/img/file.svg';
import { ReactComponent as Flod } from '../../../public/img/flod.svg';
import type { DataNode, TreeProps } from 'antd/es/tree';

const INITDATA = [
  {
    title: '业务对象',
    key: '0',
    icon: <Flod />,
    children: [],
  },
  {
    title: '关系',
    key: '1',
    icon: <Flod />,
    children: [
      {
        title: <span style={{ color: '#1677ff' }}>sss</span>,
        key: '0-0-1-0',
      },
    ],
  },
];
export const BusinessObjList: React.FC<any> = (props) => {
  const { objCollection } = props;
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {};

  const treeData: DataNode[] = React.useMemo(() => {
    const treeData = [...INITDATA];
    objCollection.forEach((obj: any, index: number) => {
      const hasCurObj = treeData[0].children.find(
        (item) => item.key === obj.code,
      )?.key;
      if (!hasCurObj) {
        treeData[0].children.push({
          title: obj.code,
          icon: <File />,
          key: obj.code,
        });
      }
    });
    return treeData;
  }, [objCollection]);

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
