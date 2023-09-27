import React, { useEffect } from 'react';
import { ReactComponent as ObjBus } from '../../../public/img/联集 169.svg';
import { ReactComponent as Line1 } from '../../../public/img/联集 159.svg';
import { ReactComponent as Line2 } from '../../../public/img/联集 160.svg';
import { ReactComponent as Line3 } from '../../../public/img/联集 161.svg';
import { ReactComponent as Line4 } from '../../../public/img/联集 164.svg';
import ArcNode from './fabric/ArcNode';

interface SelectObj {
  name: string;
  code: string;
  maxNum: number;
  subjectDomainId: number;
  id: number;
  left: number;
  top: number;
}

export const ObjectToolbar: React.FC<any> = ({
  canvas,
  objCollection,
  setObjCollection,
  modelDetail,
  setModelDetail,
  hasInit,
  setHasInit,
  setObjToCanvas,
}) => {
  const getInitObjInfo = () => {
    const { maxNum, subjectDomainId } = modelDetail;
    setModelDetail({ ...modelDetail, maxNum: Number(maxNum) + 1 });
    return {
      maxNum,
      name: `业务对象_0${Number(maxNum) + 1}`,
      code: `Bussiness_Object_0${Number(maxNum) + 1}`,
      subjectDomainId,
    };
  };

  const addFrameworkNode = (option: any, init = false) => {
    const newObjInfo = init ? option : getInitObjInfo();
    console.log(newObjInfo, 'newObjInfo');
    const arcNode = new ArcNode(canvas, { ...newObjInfo, ...option });
    canvas.insertAt(arcNode, 0, false);
    canvas.requestRenderAll();
    setObjCollection([...objCollection, newObjInfo]);
  };

  // todo 初始化业务对象
  useEffect(() => {
    if (!hasInit && objCollection.length) {
      setObjToCanvas(() => {
        objCollection.forEach((item: SelectObj) => {
          addFrameworkNode(item, true);
        });
      });
      setHasInit(true);
    }
  }, [setObjToCanvas, objCollection]);

  return (
    <div className="obj-tool-bar">
      <div
        className="tool"
        draggable
        onDragEnd={(e) => {
          addFrameworkNode({ left: e.pageX, top: e.pageY });
        }}
      >
        <ObjBus className="obj" />
      </div>
      <div className="tool" draggable>
        <Line1 className="obj" />
      </div>
      <div className="tool" draggable>
        <Line2 className="obj" />
      </div>
      <div className="tool" draggable>
        <Line3 className="obj" />
      </div>
      <div className="tool" draggable>
        <Line4 className="obj" />
      </div>
    </div>
  );
};
