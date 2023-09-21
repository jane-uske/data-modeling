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
  Modal,
  Popconfirm,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';
import useCanvas from '../../../models/useCanvas';
import useGlobal from '@/models/useGlobal';
import { ReactComponent as Logo } from '../../../assets/4a.svg';
import { ReactComponent as File } from '../../../assets/file.svg';
import { ReactComponent as Flod } from '../../../assets/flod.svg';
import './LeftTree.less';

type TreeNode = DataNode & {
  key: string;
  title: string;
  edit?: boolean;
  children?: TreeNode[];
  level: number;
  isNew?: boolean;
};

const getParentKey = (key: React.Key, tree: TreeNode[]): React.Key => {
  let parentKey: React.Key = 1;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};

const loopAll = (
  data: TreeNode[],
  callback: (node: TreeNode, i: number, data: TreeNode[]) => void,
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data);
    if (data[i].children) {
      loopAll(data[i].children!, callback);
    }
  }
};

function findNodeByKey(tree: TreeNode[], targetKey: string) {
  for (const node of tree) {
    if (node.key === targetKey) {
      return node; // 找到匹配的节点，返回它
    }

    if (node.children && node.children.length > 0) {
      const foundNode = findNodeByKey(node.children, targetKey) as TreeNode; // 递归查找子节点
      if (foundNode) {
        return foundNode; // 如果在子节点中找到了匹配的节点，返回它
      }
    }
  }

  return null; // 未找到匹配的节点
}

// 插入节点
function insertNewNode(
  gdata: TreeNode[],
  targetKey: string,
  newNode: TreeNode,
) {
  return produce(gdata, (draft: TreeNode) => {
    function recursiveInsert(nodes: TreeNode) {
      for (const node of nodes as any) {
        if (node.key === targetKey) {
          // 找到目标节点，将新节点插入到其 children 中
          if (!node.children) {
            node.children = [];
          }
          node.children.push(newNode);
          return;
        }

        if (node.children) {
          recursiveInsert(node.children);
        }
      }
    }

    recursiveInsert(draft);
  });
}

const getRanDomKey = () => Math.random().toString(36).slice(2);

export const LeftTree: React.FC<any> = (props) => {
  const { gData, setGData } = useGlobal();
  const { type } = props;
  const dataList = useRef<{ title: string; key: string }[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([gData[0].key]);
  const [selectedKeys, setSelectedKeys] = useState([gData[0].key]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const selectedNode = React.useMemo(() => {
    return findNodeByKey(gData, selectedKeys[0]) as TreeNode;
  }, [selectedKeys, gData]);

  const onNew = (title = '', edit = true) => {
    if (selectedNode.level === 3) {
      return message.error('当前节点内部不能新建');
    }
    setExpandedKeys([...selectedKeys, ...expandedKeys]);
    const key = Math.random().toString(36).slice(2);
    const newNode: TreeNode = {
      key,
      title,
      level: selectedNode.level + 1,
      edit,
      isNew: true,
      children: [],
    };
    const updatedGData = insertNewNode(gData, selectedKeys[0], newNode);
    setGData(updatedGData);
    return newNode;
  };

  const { canvasStore } = useCanvas();

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

  useEffect(() => {
    onSelect([gData[0].key]);
  }, []);

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
        inputs.current[info.key].focus?.();
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

    const isSameLevel =
      (info.node as any).level === (info.dragNode as any).level;
    const isInsetAction = !info.dropToGap;

    if (
      !isSameLevel &&
      (info.dragNode as any).level < (info.node as any).level
    ) {
      return message.error('父级不能拖入子级');
    }

    if (isSameLevel && isInsetAction) {
      return message.error('同级之间不能插入');
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
        titleRender={(nodeData) => {
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
            <Row
              onDoubleClick={() => {
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
                    onBlur={(e) => {
                      onEdit(nodeData, false, e.target.value);
                    }}
                    className="menuInput"
                    onPressEnter={(e) => {
                      onEdit(nodeData, false, (e.target as any).value);
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
              {nodeData.level !== 1 &&
                (nodeData.level === 2 && nodeData.children?.length ? (
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
                    onConfirm={() => onDelete(nodeData)}
                  >
                    <DeleteOutlined className="deleteIcon" />
                  </Popconfirm>
                ))}
            </Row>
          );
        }}
      />
    );
  };

  return (
    <div className="left-tree" style={{ height: 1080 }}>
      <div className="new-btn-wrap">
        <Button onClick={() => onNew()}>新建</Button>
      </div>
      <Divider style={{ margin: 0 }} />
      <div className="tree-wrap">
        <Input.Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {renderTree()}
      </div>
    </div>
  );
};
