import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { MyCanvas } from './Canvas';
import { useModel } from '@umijs/max';
import { BusinessObjList } from './BusinessObjList';
import { ObjectToolbar } from './ObjectToolbar';
import styles from './index.less';
import { Breadcrumb, message } from 'antd';
import service from '../../services';
import { PropsDrawer } from './PropsDrawer';

interface SelectObj {
  name: string;
  code: string;
  maxNum: number;
  subjectDomainId: number;
  id: number;
  left: number;
  top: number;
}

const getId = () => {
  const search = location.search.split('?');
  return search[1];
};

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
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Navigation
      </a>
    ),
  },
];

const CanvasPage: React.FC = () => {
  const { getModelDetail } = service.ModelController;
  const { querybusinessObjectList } = service.BusinessObjectController;

  const [canvas, setCanvas] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [curSelectedProps, setCurSelectedProps] = React.useState<SelectObj>({
    name: '',
    code: '',
    maxNum: 0,
    subjectDomainId: 0,
    id: Number(getId()),
    left: 0,
    top: 0,
  });
  const [objCollection, setObjCollection] = React.useState<SelectObj[]>([]);
  const [modelDetail, setModelDetail] = React.useState<any>();

  const [hasInit, setHasInit] = React.useState(false);

  const { setModelData } = useModel('useGlobal');

  useEffect(() => {
    const { type, subjectDomainId, name } = modelDetail || {};
    const { maxNum } = curSelectedProps;
    const newModelData = {
      type,
      id: getId(),
      subjectDomainId,
      name,
      maxNum,

      businessObjectList: [...objCollection],
    };
    setModelData(newModelData);
  }, [curSelectedProps, modelDetail, objCollection]);

  const setObjToCanvas = React.useCallback(
    (fn: (objcol: SelectObj[]) => void) => {
      fn(objCollection);
    },
    [objCollection],
  );

  console.log(objCollection, 'objCollection');

  useEffect(() => {
    const init = async () => {
      const res = await getModelDetail({ id: getId() });
      const { code, data: busObjArr } = await querybusinessObjectList({
        modelId: getId(),
      });
      if (res.code !== 200) {
        return message.error(res.msg);
      }
      // todo 位置信息需要canvasJson
      if (busObjArr && busObjArr !== null) {
        const needArr = busObjArr.map((item: any, index: number) => {
          const { name, code, id, subjectDomainId } = item;
          return {
            name,
            code,
            subjectDomainId,
            id,
            left: 400 + 500 * index,
            top: 200 + 50 * index,
          };
        });
        setObjCollection(needArr);
      }
      setModelDetail(res.data);
      const { maxNum, subjectDomainId } = res.data;
      setCurSelectedProps({
        ...curSelectedProps,
        maxNum,
        subjectDomainId,
      });
      console.log(res, 'detail');
    };
    init();
  }, []);

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
        <MyCanvas
          canvas={canvas}
          setCanvas={setCanvas}
          setOpen={setOpen}
          curSelectedProps={curSelectedProps}
          setCurSelectedProps={setCurSelectedProps}
          objCollection={objCollection}
          setObjCollection={setObjCollection}
        />
        <BusinessObjList objCollection={objCollection} />
        <PropsDrawer
          open={open}
          setOpen={setOpen}
          curSelectedProps={curSelectedProps}
          modelDetail={modelDetail}
          objCollection={objCollection}
          setObjCollection={setObjCollection}
        />
        <ObjectToolbar
          canvas={canvas}
          setObjCollection={setObjCollection}
          objCollection={objCollection}
          modelDetail={modelDetail}
          setModelDetail={setModelDetail}
          hasInit={hasInit}
          setHasInit={setHasInit}
          setObjToCanvas={setObjToCanvas}
        />
      </div>
    </PageContainer>
  );
};

export default CanvasPage;
