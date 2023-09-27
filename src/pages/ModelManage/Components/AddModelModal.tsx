import { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import { Modal, Input, Form, TreeSelect, Select, message } from 'antd';
import service from '../../../services';
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

  const { saveOrUpdateModel } = service.ModelController;

  const saveModel = async () => {
    const { type, subjectDomainId, name } = form.getFieldsValue();

    const params = {
      type,
      subjectDomainId,
      maxNum: 0,
      name,
    };
    const res = await saveOrUpdateModel(params);
    return res;
  };

  useEffect(() => {
    if (open) {
      form.setFieldValue('subjectDomainId', curSelectValue);
    }
  }, [open]);

  if (open)
    return (
      <Modal
        width={600}
        className="add-model-modal"
        title="新增模型"
        open={open}
        onOk={async () => {
          try {
            const { code, msg, data: id } = await saveModel();
            if (code === 200) {
              message.success(msg);
              return history.push(`/canvas?${id}`);
            }
            message.error(msg);
          } catch (e) {
            message.error('请检查表单');
          }
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item name="name" label="模型名称" required>
            <Input
              placeholder="请输入模型名称"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item name="subjectDomainId" label="目录位置" required>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择"
              allowClear
              treeDefaultExpandAll
              treeData={gData}
            />
          </Form.Item>
          <Form.Item name="type" label="模型类型" required>
            <Select
              placeholder="请选择"
              onChange={() => {}}
              options={[
                { value: 0, label: '概念模型' },
                { value: 1, label: '逻辑模型' },
                { value: 2, label: '物理模型' },
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
