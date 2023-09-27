import { produce } from 'immer';
import { TreeNode } from '../models/useGlobal';
export function trim(str: string) {
  return str.trim();
}

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

export { getParentKey, loopAll, findNodeByKey, insertNewNode, getRanDomKey };
