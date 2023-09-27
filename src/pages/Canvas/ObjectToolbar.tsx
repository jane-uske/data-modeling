import React from 'react';
import { ReactComponent as ObjBus } from '../../../public/img/联集 169.svg';
import ArcNode from './fabric/ArcNode';
import { addControls } from './fabric/controls';

const position = {
  left: 24,
  top: 24,
};
export const ObjectToolbar: React.FC<any> = ({ canvas }) => {
  const getInitObjInfo = () => {
    return;
  };

  const addFrameworkNode = ({ options } = {}) => {
    const { type } = options;
    const selectedProps = {};
    const arcNode = new ArcNode(canvas, { ...selectedProps, ...options });

    // 创建自定义控件并添加到矩形里
    // arcNode.controls.copy = addControls('clone');
    // arcNode.controls.deleteControl = addControls('delete');
    canvas.insertAt(arcNode, 0, false);
    canvas.requestRenderAll();
    // canvas.saveCanvas();
  };

  const addNode = (iconItem: any, position: any) => {
    addFrameworkNode({
      options: { type: iconItem.type, ...position },
    });
  };

  return (
    <div className="obj-tool-bar">
      <div
        className="tool"
        draggable
        onDragEnd={(e) => {
          addNode({ type: 'obj' }, { left: e.pageX, top: e.pageY });
        }}
      >
        <ObjBus className="obj" />
      </div>
      {/* <img src="img/联集 169.png" alt="" />
        <img src="img/联集 169.png" alt="" />
        <img src="img/联集 169.png" alt="" />
        <img src="img/联集 169.png" alt="" /> */}
    </div>
  );
};
