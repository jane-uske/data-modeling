import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Table,
  Space,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import services from '@/services';

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
  const { updateBusinessObject } = services.BusinessObjectController;
  const {
    open,
    setOpen,
    curSelectedProps,
    modelDetail,
    objCollection,
    setObjCollection,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    const { name, code } = curSelectedProps;
    form.setFieldsValue({
      name,
      code,
    });
  }, [curSelectedProps]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="props-drawer">
      <Drawer
        width={594}
        title={curSelectedProps.code}
        placement="right"
        onClose={onClose}
        open={open}
        getContainer={false}
      >
        <>
          <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Form.Item name="code" label="业务对象名称" required>
              <Input placeholder="请输入业务对象名称" />
            </Form.Item>
            <Form.Item name="name" label="中文名称">
              <Input placeholder="请输入业务对象名称" />
            </Form.Item>
          </Form>
          {/* <Button type="primary" onClick={() => {}}>
            <PlusOutlined />
            添加新属性
          </Button> */}
          {/* <Table columns={columns} dataSource={dataSource} /> */}
          <Button
            style={{ position: 'absolute', right: 24, bottom: 24 }}
            type="primary"
            onClick={async () => {
              const { name, code } = form.getFieldsValue();
              const { subjectDomainId } = modelDetail;
              // 新增
              const params = {
                subjectDomainId,
                name,
                code,
                modelId: location.search.split('?')[1],
              };
              const res = (await updateBusinessObject(params)) as any;
              if (res.code === 200) {
                message.success('保存成功');
                setObjCollection(
                  [...objCollection].map((item) => {
                    if (item?.maxNum === curSelectedProps.maxNum) {
                      return { ...item, id: res.data };
                    }
                    return { ...item };
                  }),
                );
                onClose();
              } else {
                message.error(res.msg);
              }
            }}
          >
            保存
          </Button>
        </>
      </Drawer>
    </div>
  );
};
