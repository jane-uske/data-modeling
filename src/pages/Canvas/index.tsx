import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { MyCanvas } from './Canvas';
import { BusinessObjList } from './BusinessObjList';
import styles from './index.less';
import { Breadcrumb } from 'antd';
import { PropsDrawer } from './PropsDrawer';

const CanvasPage: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          General
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Layout
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Navigation
        </a>
      ),
    },
  ];

  return (
    <PageContainer className={styles.chartWrapper} ghost>
      <div className="page-wrap">
        <div className="header">
          <Breadcrumb
            items={[
              {
                title: '4A数据建模',
              },
              {
                title: <a href="">采购管理</a>,
                menu: { items: menuItems },
              },
              {
                title: <a href="">采购订单数据模型</a>,
              },
            ]}
          />
        </div>
        <MyCanvas />
        <BusinessObjList />
        <PropsDrawer />
      </div>
    </PageContainer>
  );
};

export default CanvasPage;
