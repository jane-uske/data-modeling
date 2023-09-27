import React, { useEffect } from 'react';
import { Radio, Input, Select, Table, Space } from 'antd';
import { history } from '@umijs/max';
import type { RadioChangeEvent } from 'antd';
import service from '../../../services';

const header = [
  {
    count: 33,
    label: '数据模型',
    img: 'img/datamodel.png',
  },
  {
    count: 33,
    label: '业务对象',
    img: 'img/busobject.png',
  },
  {
    count: 33,
    label: '逻辑实体',
    img: 'img/logical.png',
  },
  {
    count: 33,
    label: '表',
    img: 'img/list.png',
  },
  {
    count: 33,
    label: '视图',
    img: 'img/view.png',
  },
  {
    count: 33,
    label: '属性',
    img: 'img/attr.png',
  },
];

const ModelType = {
  0: '概念模型',
  1: '逻辑模型',
  2: '物理模型',
};

const dataSource = [
  {
    key: '1',
    name: '模型 1',
    type: 32,
    associate: '西湖区湖底公园1号',
    objectCount: '1222',
    domain: 'fuck',
    creater: '西湖区湖底公园1号',
    modifytime: '2131',
  },
  {
    key: '1',
    name: '模型 1',
    type: 32,
    associate: '西湖区湖底公园1号',
    objectCount: '1222',
    domain: 'fuck',
    creater: '西湖区湖底公园1号',
    modifytime: '2131',
  },
];

const columns = [
  {
    title: '模型名称',
    dataIndex: 'name',
    key: ' name',
  },
  {
    title: '模型类型',
    key: 'type',
    render: (data: any) => {
      const { type } = data;
      return <Space size="middle">{ModelType[type as 0 | 1 | 2]}</Space>;
    },
  },
  {
    title: '关联模型',
    dataIndex: 'correlationModel',
    key: 'correlationModel',
  },
  {
    title: '业务对象数',
    dataIndex: 'boCount',
    key: 'boCount',
  },
  {
    title: '主题域',
    dataIndex: 'sdName',
    key: 'sdName',
  },
  {
    title: '提交人',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: '更改时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any) => (
      <Space size="middle">
        <a
          onClick={() => {
            history.push(`/canvas?${_.id}`);
          }}
        >
          查看详情
        </a>
      </Space>
    ),
  },
];

export const ModelManageWrap: React.FC<any> = () => {
  const { queryModelList, getStatisticsModel } = service.ModelController;

  const [mode, setMode] = React.useState('top');
  const [dataSource, setDataSource] = React.useState([]);
  const [statisticsModel, setStatisticsModel] = React.useState<any>({});

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  useEffect(() => {
    const queryList = async () => {
      const res = await queryModelList({
        pageSize: 10,
        pageNumber: 1,
      });
      if (res.code === 200) {
        setDataSource(res.data.data);
      }
    };
    const queryStatisticsModel = async () => {
      const res = await getStatisticsModel({});
      if (res.code === 200) {
        setStatisticsModel(res.data);
      }
    };

    queryStatisticsModel();
    queryList();
  }, []);

  const header = React.useMemo(() => {
    const {
      modelCount = 0,
      tableCount = 0,
      viewCount = 0,
      logicalEntityCount = 0,
      businessObjectCount = 0,
      attributeCount = 0,
    } = statisticsModel;
    return [
      {
        count: modelCount,
        label: '数据模型',
        img: 'img/datamodel.png',
      },
      {
        count: businessObjectCount,
        label: '业务对象',
        img: 'img/busobject.png',
      },
      {
        count: logicalEntityCount,
        label: '逻辑实体',
        img: 'img/logical.png',
      },
      {
        count: tableCount,
        label: '表',
        img: 'img/list.png',
      },
      {
        count: viewCount,
        label: '视图',
        img: 'img/view.png',
      },
      {
        count: attributeCount,
        label: '属性',
        img: 'img/attr.png',
      },
    ];
  }, [statisticsModel]);

  return (
    <div className="wrap">
      <div className="header">
        {header.map((item) => {
          const { img, count, label } = item;
          return (
            <div className="class-wrap">
              <img src={img} />
              <div className="count-wrap">
                <div className="label">{label}</div>
                <div className="count">
                  <span className="num">{count}</span>
                  <span className="ge">个</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="table">
        <div className="switch">
          <Radio.Group
            defaultValue={'数据模型'}
            onChange={handleModeChange}
            value={mode}
            style={{ minWidth: 240 }}
          >
            <Radio.Button value="数据模型">数据模型</Radio.Button>
            <Radio.Button value="业务对象">业务对象</Radio.Button>
          </Radio.Group>
          <Input.Search width={360} placeholder="关联词搜索" />
          <Select
            style={{ width: 360 }}
            placeholder="模板分类"
            onChange={() => {}}
            options={[
              { value: '逻辑模型', label: '逻辑模型' },
              { value: '业务模型', label: '业务模型' },
              { value: '物理模型', label: '物理模型' },
            ]}
          />
          <Select
            style={{ width: 171 }}
            placeholder="是否关联其他模型"
            onChange={() => {}}
            options={[
              { value: 'true', label: '是' },
              { value: 'false', label: '否' },
            ]}
          />
        </div>
        <Table columns={columns as any} dataSource={dataSource} />
      </div>
    </div>
  );
};
