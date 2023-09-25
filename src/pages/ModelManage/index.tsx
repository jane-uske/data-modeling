// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { useModel } from '@umijs/max';
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { LeftTree } from './Components/LeftTree';
import useGlobal from '@/models/useGlobal';
import FlowChart from './Components/FlowChart';
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
        <div style={{ flex: 1, margin: 16 }}>
          <FlowChart />
          {/* <XFlowCanvas /> */}
        </div>
      </div>
      {/* {useGlobal().renderAddModelModal()} */}
    </PageContainer>
  );
};

export default ModelManagePage;
