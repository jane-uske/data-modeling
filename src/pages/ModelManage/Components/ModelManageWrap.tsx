import React from 'react';
import { Radio, Input, Select, Table, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

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
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '关联模型',
    dataIndex: 'associate',
    key: 'aassociatege',
  },
  {
    title: '业务对象数',
    dataIndex: 'objectCount',
    key: 'objectCount',
  },
  {
    title: '主题域',
    dataIndex: 'domain',
    key: 'domain',
  },
  {
    title: '提交人',
    dataIndex: 'creater',
    key: 'creater',
  },
  {
    title: '更改时间',
    dataIndex: 'modifytime',
    key: 'modifytime',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>查看详情</a>
      </Space>
    ),
  },
];

export const ModelManageWrap = () => {
  const [mode, setMode] = React.useState('top');

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
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

          <Input.Search placeholder="关联词搜索" />
        </div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
};
