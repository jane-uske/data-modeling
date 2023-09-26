import { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import { Modal, Input, Form, TreeSelect, Select } from 'antd';
import '../index.less';

interface RenderAddModelModalProps {
  open: boolean;
  gData: any;
  setOpen: (open: boolean) => void;

  curSelectValue: string;
}

export const AddModelModal: React.FC<RenderAddModelModalProps> = (props) => {
  const { open, setOpen, gData, curSelectValue } = props;
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState('');

  console.log(curSelectValue, 'curSelectValue');

  useEffect(() => {
    if (open) {
      form.setFieldValue('directory-location', curSelectValue);
    }
  }, [open]);

  if (open)
    return (
      <Modal
        width={600}
        className="add-model-modal"
        title="新增模型"
        open={open}
        onOk={() => {
          console.log(form.getFieldsValue());
          history.push('/canvas');
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item name="model-name" label="模型名称" required>
            <Input
              placeholder="请输入模型名称"
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
              placeholder="请选择"
              allowClear
              treeDefaultExpandAll
              // onChange={(newValue: string) => {
              //   console.log(newValue);
              // }}
              treeData={gData}
            />
          </Form.Item>
          <Form.Item name="model-type" label="模型类型" required>
            <Select
              placeholder="请选择"
              onChange={() => {}}
              options={[
                { value: 'concept', label: '概念模型' },
                { value: 'logic', label: '业务模型' },
                { value: 'physics', label: '物理模型' },
              ]}
            />
          </Form.Item>
          <Form.Item name="des" label="定义">
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    );
};
