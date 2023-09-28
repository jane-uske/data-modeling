import React, { useState, useEffect, useRef } from 'react';
import { produce } from 'immer';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Tree,
  message,
  Menu,
  Dropdown,
  Popconfirm,
  Modal,
  Form,
} from 'antd';
import { useModel } from '@umijs/max';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd/es/tree';
import { ReactComponent as Logo } from '../../../../public/img/4a.svg';
import { ReactComponent as File } from '../../../../public/img/file.svg';
import { ReactComponent as Flod } from '../../../../public/img/flod.svg';
import './LeftTree.less';
import { AddModelModal } from './AddModelModal';
import { findNodeByKey, insertNewNode } from '../../../utils';
import { TreeNode } from '@/models/useGlobal';
import service from '../../../services';

const transform = (arr: any, level: number) => {
  return [...arr].map((item: any) => {
    const { id, name } = item.t;
    return {
      key: id,
      title: name,
      children: [],
      level,
      value: id,
    };
  });
};

const transformData = (queryTree: any) =>
  transform(queryTree, 2).map((item, index) => ({
    ...item,
    children: transform([...queryTree[index].children], 3),
  }));

export const LeftTree: React.FC<any> = (props) => {
  const { querySubjectDomain, deleteSubjectDomain, updateSubjectDomain } =
    service.DomainController;

  const { setOpen, open, gData, setGData } = useModel('useGlobal');
  const { type } = props;
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState<number>(1);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const [visible, setVisible] = React.useState(false);

  const getTree = async () => {
    const { data: queryTree, code, msg } = await querySubjectDomain({});
    if (code === 200) {
      return setGData(transformData(queryTree));
    }
    return message.error(msg);
  };

  useEffect(() => {
    getTree();
  }, []);

  const myMenu = (
    <Menu
      items={[
        {
          key: 'add',
          label: <span>新增</span>,
        },
        {
          key: 'delete',
          label: <span>删除</span>,
        },
        {
          key: 'update',
          label: <span>编辑</span>,
        },
      ]}
    />
  );

  const newDoamin = async ({
    value,
    id,
    type,
  }: {
    value: string;
    id: number;
    type: 0 | 1;
  }) => {
    // 新增
    const params: any = isEdit
      ? {
          name: value,
          id,
          type,
        }
      : {
          name: value,
          parentId,
          remark: form.getFieldValue('des'),
          type: 1,
        };
    const res = await updateSubjectDomain(params);
    if (res.code === 200) {
      message.success(res.msg);
    } else {
      message.error((res as any).msg);
    }
    return res;
  };

  const titleRender = (nodeData: any) => {
    const width = 220 - nodeData.level * 22;
    const strTitle = nodeData.title as string;
    const index = strTitle.indexOf(searchValue);
    const beforeStr = strTitle.substring(0, index);
    const afterStr = strTitle.slice(index + searchValue.length);

    let svgContent;
    if (nodeData.level === 1) {
      svgContent = <Logo />;
    } else if (nodeData.level === 2) {
      svgContent = <Flod />;
    } else if (nodeData.level === 3) {
      svgContent = <File />;
    }
    return (
      <Dropdown overlay={myMenu} trigger={['contextMenu']}>
        <Row
          onDoubleClick={async () => {
            // const {data,code} = await updateSubjectDomain({
            //   name:'',
            //   id:
            // })
            setIsEdit(true);
            onEdit(nodeData, true);
          }}
          style={{ width }}
          className="treeItem"
          align="middle"
        >
          <Col flex={1}>
            {nodeData.edit && (
              <Input
                style={{ width: width - 16 }}
                ref={(input) => {
                  inputs.current[nodeData.key] = input;
                }}
                onBlur={async (e) => {
                  const { code } = await newDoamin({
                    value: e.target.value,
                    type: nodeData.level === 2 ? 0 : 1,
                    id: nodeData.key,
                  });
                  if (code === 200) {
                    onEdit(nodeData, false, e.target.value);
                  }
                  setIsEdit(false);
                }}
                className="menuInput"
                onPressEnter={async (e) => {
                  const { code } = await newDoamin({
                    value: e.target.value,
                    type: nodeData.level === 2 ? 0 : 1,
                    id: nodeData.key,
                  });
                  if (code === 200) {
                    onEdit(nodeData, false, (e.target as any).value);
                  }
                  setIsEdit(false);
                }}
                defaultValue={nodeData.title}
              />
            )}
            {!nodeData.edit &&
              (index > -1 ? (
                <div className="treeTitle">
                  <span
                    style={{
                      marginRight: 12,
                      position: 'relative',
                      top: 2,
                    }}
                  >
                    {svgContent}
                  </span>
                  {beforeStr}
                  <span style={{ color: 'red' }}>{searchValue}</span>
                  {afterStr}
                </div>
              ) : (
                <div className="treeTitle">
                  <span
                    style={{
                      marginRight: 12,
                      position: 'relative',
                      top: 2,
                    }}
                  >
                    {svgContent}
                  </span>
                  {nodeData.title}
                </div>
              ))}
          </Col>
          {nodeData?.level === 2 && (
            <PlusOutlined
              className="addIcon"
              onClick={() => {
                setParentId(nodeData.key);
                onNew(3, true, nodeData.key);
              }}
            />
          )}
          {nodeData.level === 2 && nodeData.children?.length ? (
            <DeleteOutlined
              className="deleteIcon"
              onClick={() => {
                message.error('目录下有文件时候不能删除');
              }}
            />
          ) : (
            <Popconfirm
              title="你确定要删除吗"
              description="删除后用户填写的数据将被一并删除且无法恢复，请谨慎删除！"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={async () => {
                const { code, msg } = await deleteSubjectDomain({
                  id: selectedKeys[0],
                });
                if (code === 200) {
                  message.success('删除成功');
                  return onDelete(nodeData);
                }
                message.error(msg);
              }}
            >
              <DeleteOutlined className="deleteIcon" />
            </Popconfirm>
          )}
        </Row>
      </Dropdown>
    );
  };

  const selectedNode = React.useMemo(() => {
    return findNodeByKey(gData, (selectedKeys || [])[0]) as TreeNode;
  }, [selectedKeys, gData]);

  const onNew = async (level = 2, edit = false, curAddKey = '') => {
    setExpandedKeys([...selectedKeys, ...expandedKeys]);
    const key = Math.random().toString(36).slice(2);
    const newNode: TreeNode = {
      key,
      title: level === 2 ? form.getFieldValue('groupName') : '',
      value: level === 2 ? form.getFieldValue('groupName') : '',
      level,
      edit,
      isNew: true,
      children: [],
    };
    if (level === 2) {
      setGData([...gData, newNode]);
      // id: 0,
      // 新增
      const res = await updateSubjectDomain({
        // department: 'string',
        name: form.getFieldValue('groupName'),
        parentId: 0,
        remark: form.getFieldValue('des'),
        type: 0,
      });
      if (res.code === 200) {
        message.success((res as any).msg);
      } else {
        message.error((res as any).msg);
      }
    } else {
      const updatedGData = insertNewNode(gData, curAddKey, newNode);
      setGData(updatedGData);
    }
    return newNode;
  };

  const inputs = useRef<{ [key: string]: any }>({});

  const onSelect = (_selectedKeys: any) => {
    if (_selectedKeys.length) {
      setSelectedKeys(_selectedKeys);
      if (type) {
      } else {
        // canvasStore.bindNewCanvas(_selectedKeys[0]);
      }
    }
  };

  // useEffect(() => {
  //   onSelect();
  // }, []);

  const onDelete = (info: TreeNode) => {
    if (info.level === 3) {
    }
    setGData((prevGData) => {
      return produce(prevGData, (draft) => {
        const findAndDeleteNode = (nodes: TreeNode[]): void => {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.key === info.key) {
              // 找到了目标节点，直接从数组中删除
              nodes.splice(i, 1);
              return; // 结束递归
            }
            if (node.children) {
              findAndDeleteNode(node.children);
            }
          }
        };

        findAndDeleteNode(draft);
      });
    });
  };

  const onEdit = (info: TreeNode, isEdit: boolean, newValue?: string) => {
    setGData((prevGData) => {
      return produce(prevGData, (draft) => {
        const findAndEditNode = (nodes: TreeNode[]): void => {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.key === info.key) {
              // 找到了目标节点
              if (!isEdit && node.isNew && !newValue) {
                // 如果是删除新节点，直接从数组中删除
                nodes.splice(i, 1);
              } else {
                // 否则修改节点的属性
                node.edit = isEdit;
                node.title = newValue ?? node.title;
                node.value = newValue ?? node.value;
              }
              return; // 找到目标节点后，结束递归
            }
            if (node.children) {
              findAndEditNode(node.children);
            }
          }
        };

        findAndEditNode(draft);
      });
    });

    if (isEdit) {
      setTimeout(() => {
        inputs.current[info.key]?.focus?.();
      });
    }
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    if (type && info.dragNode.children) {
      if (info.dragNode.children.length >= 1) {
        return message.error('有子节点时不能移动');
      }
    }

    // 同级
    const isSameLevel =
      (info.node as any).level === (info.dragNode as any).level;

    // 插入
    const isInsetAction = !info.dropToGap;

    if (isSameLevel && isInsetAction) {
      return message.error('同级之间不能插入');
    }

    if (!isSameLevel && !isInsetAction) {
      return message.error('非同级之间不能换位');
    }

    const loop = (
      data: TreeNode[],
      key: React.Key,
      callback: (node: TreeNode, i: number, data: TreeNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    setGData((prevGData) => {
      return produce(prevGData, (draft) => {
        let dragObj: TreeNode;
        loop(draft, dragKey, (item, index, arr) => {
          arr.splice(index, 1);
          dragObj = item;
        });

        if (!info.dropToGap) {
          loop(draft, dropKey, (item) => {
            item.children = item.children || [];
            item.children.unshift({ ...dragObj, level: item.level + 1 });
          });
        } else if (
          ((info.node as any).props.children || []).length > 0 &&
          (info.node as any).props.expanded &&
          dropPosition === 1
        ) {
          loop(draft, dropKey, (item) => {
            item.children = item.children || [];
            item.children.unshift(dragObj);
          });
        } else {
          let ar: TreeNode[] = [];
          let i: number;
          loop(draft, dropKey, (_item, index, arr) => {
            ar = arr;
            i = index;
          });
          if (dropPosition === -1) {
            ar.splice(i!, 0, dragObj!);
          } else {
            ar.splice(i! + 1, 0, dragObj!);
          }
        }
      });
    });
  };

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const renderTree = () => {
    return (
      <Tree
        className="draggable-tree"
        draggable
        blockNode
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        onDrop={onDrop}
        treeData={gData}
        allowDrop={({ dropNode }) => {
          if (type === 'project') {
            return dropNode.level < 1;
          }
          return true;
        }}
        titleRender={titleRender}
      />
    );
  };

  return (
    <>
      <div className="left-tree" >
        <p className="title">4A数据建模</p>
        <Divider style={{ margin: 0 }} />
        <div className="new-btn-wrap">
          <Button onClick={() => setVisible(true)}>
            <PlusOutlined />
            添加主题域分组
          </Button>
        </div>
        <Divider style={{ margin: 0 }} />
        <div className="tree-wrap">
          <Input.Search
            placeholder="搜索..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {renderTree()}
        </div>
      </div>

      <Modal
        open={visible}
        onOk={() => {
          onNew(2);
          setVisible(false);
          form.resetFields();
        }}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        title={'新建主题域分组'}
      >
        <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item label="分组名称" name="groupName" required>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="描述" name="des">
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>

      <AddModelModal
        curSelectValue={selectedNode?.value || ''}
        open={open}
        setOpen={setOpen}
        gData={gData}
      />
    </>
  );
};
