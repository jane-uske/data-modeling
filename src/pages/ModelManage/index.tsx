// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { useModel } from '@umijs/max';
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { LeftTree } from './Components/LeftTree';
import useGlobal from '@/models/useGlobal';
import FlowChart from './Components/FlowChart';
import XFlowCanvas from './Components/XFlowCanvas';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const ModelManagePage: React.FC = () => {
  // const { name } = useModel('global');
  return (
    <PageContainer
      className={styles.container}
      ghost
      header={{ children: <></> }}
    >
      <div className="page-wrap">
        <LeftTree />
        <div style={{ flex: 1 }}>
          <XFlowCanvas />
        </div>
      </div>
      {useGlobal().renderAddModelModal()}
      <Button
        style={{ marginRight: 48 }}
        onClick={() => {
          useGlobal().setOpen(true);
          // setInputValue('fasdas');
          console.log('321313');
        }}
      >
        <PlusOutlined />
        添加模型
      </Button>
    </PageContainer>
  );
};

export default ModelManagePage;
