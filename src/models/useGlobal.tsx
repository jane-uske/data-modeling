// 全局共享数据示例
import { useEffect, useState } from 'react';
import { Button, Modal, Input, Form, TreeSelect, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

type TreeNode = DataNode & {
  key: string;
  title: string;
  edit?: boolean;
  children?: TreeNode[];
  level: number;
  isNew?: boolean;
  value?: string;
};

const getRanDomKey = () => Math.random().toString(36).slice(2);

const INITGDATA = [
  {
    edit: false,
    isNew: true,
    key: getRanDomKey(),
    level: 1,
    title: '4A架构',
    value: '4A架构',
    children: [],
  },
];

const useGlobal = () => {
  const [gData, setGData] = useState<TreeNode[]>(INITGDATA);
  const [open, setOpen] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState('');

  const [form] = Form.useForm();

  const addButton = () => {
    return (
      <Button
        style={{ marginRight: 48 }}
        onClick={() => {
          setOpen(true);
          setInputValue('fasdas');
          console.log('321313');
        }}
      >
        <PlusOutlined />
        添加模型
      </Button>
    );
  };

  useEffect(() => {
    console.log('open', open, inputValue);
  }, [open, inputValue]);

  const renderAddModelModal = () => {
    console.log('renderAddModelModal被调用了');
    if (open)
      return (
        <Modal
          title="新增模型"
          open={open}
          onOk={() => {}}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item name="model-name" label="模型名称" required>
              <Input
                placeholder="请输入流程名称"
                value={inputValue}
                onChange={(e) => {
                  console.log(e.target.value);
                  setInputValue(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item name="directory-location" label="目录位置" required>
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                // value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                // onChange={(newValue: string) => {
                //   console.log(newValue);
                // }}
                treeData={gData}
              />
            </Form.Item>
            <Form.Item name="directory-type" label="目录类型" required>
              <Radio.Group>
                <Radio value={'concept'}>概念模型</Radio>
                <Radio value={'logic'}>逻辑模型</Radio>
                <Radio value={'physics'}>物理模型</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      );
  };

  return {
    addButton,
    gData,
    setGData,
    renderAddModelModal,
    open,
    setOpen,
  };
};

export default useGlobal;
