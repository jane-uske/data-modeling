import React, { useState } from 'react';
import { Button, Checkbox, Drawer, Form, Input, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const dataSource = [
  {
    objName: 'BusinessObject_1',
    dataType: 'bigInt',
    isMainKey: false,
  },
  {
    objName: 'BusinessObject_2',
    dataType: 'string',
    isMainKey: true,
  },
];

const columns = [
  {
    title: '属性名',
    dataIndex: 'objName',
    key: ' objName',
  },
  {
    title: '数据类型',
    dataIndex: 'dataType',
    key: 'dataType',
  },
  {
    title: '是否为主键',
    key: 'aassociatege',
    render: (_: any, record: any) => {
      return <Checkbox checked={record.isMainKey} />;
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>删除</a>
      </Space>
    ),
  },
];
interface Props {}
export const PropsDrawer: React.FC<Props & any> = (props) => {
  const { title = '业务对象：Bussiness_Object_01', open, setOpen } = props;

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="props-drawer">
      <Drawer
        width={594}
        title={title}
        placement="right"
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <>
          <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Form.Item name="obj-name" label="业务对象名称" required>
              <Input placeholder="请输入业务对象名称" />
            </Form.Item>
            <Form.Item name="obj-des" label="中文名称">
              <Input placeholder="请输入业务对象名称" />
            </Form.Item>
          </Form>
          <Button type="primary" onClick={() => {}}>
            <PlusOutlined />
            添加新属性
          </Button>
          <Table columns={columns} dataSource={dataSource} />
        </>
      </Drawer>
    </div>
  );
};
