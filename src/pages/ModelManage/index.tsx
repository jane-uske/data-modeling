import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { LeftTree } from './Components/LeftTree';
import styles from './index.less';
import { ModelManageWrap } from './Components/ModelManageWrap';

const ModelManagePage: React.FC = () => {
  return (
    <PageContainer
      className={styles.container}
      ghost
      header={{ children: <></> }}
    >
      <div className="page-wrap">
        <LeftTree />
        <div style={{ flex: 1, margin: '0 16px' }}>
          <ModelManageWrap />
        </div>
      </div>
    </PageContainer>
  );
};

export default ModelManagePage;
