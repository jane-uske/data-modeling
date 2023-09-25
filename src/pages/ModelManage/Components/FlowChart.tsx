import { Canvas } from 'supcon-canvas';
import { fabric } from 'fabric';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const CanvasAction = useRef(null) as any;
  const canvas = useRef(null) as any;
  const isDrawingRef = useRef(false);
  const startPointRef = useRef(null);
  const currentLineRef = useRef(null);

  const [rect, setRect] = useState();
  //   if (!rect || rect === rect1) {
  //     return;
  //   }

  //   const line = new fabric.Line(
  //     [
  //       attachmentPoint.left,
  //       attachmentPoint.top,
  //       rect1.left + rect1.width / 2,
  //       rect1.top + rect1.height / 2,
  //     ],
  //     {
  //       fill: 'black',
  //       stroke: 'black',
  //       strokeWidth: 2,
  //       selectable: false,
  //     },
  //   );

  //   canvas.add(line);
  //   canvas.sendToBack(line);
  // };

  const createNew = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      fill: 'pink', // 填充颜色
    }) as any;

    var text = new fabric.Text('Centered Text', {
      fill: 'white', // 文本颜色
      fontSize: 20, // 字体大小
    }) as any;

    text.set({
      left: rect.left + (rect.width - text.width) / 2,
      top: rect.top + (rect.height - text.height) / 2,
    });

    const attachmentPoints = [];

    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const x = rect.left + rect.width / 2 + (rect.width / 2) * Math.cos(angle);
      const y =
        rect.top + rect.height / 2 + (rect.height / 2) * Math.sin(angle);

      const attachmentPoint = new fabric.Circle({
        left: x - 3,
        top: y - 3,
        radius: 4,
        fill: 'red',
        selectable: false,
      });

      attachmentPoint.on('mousedown', (e) => {
        console.log(11111);
        const startPoint = attachmentPoint.getCenterPoint();
        const line = new fabric.Line(
          [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
          {
            stroke: 'blue',
            strokeWidth: 2,
            selectable: false,
          },
        );

        canvas.current.add(line);

        // 鼠标移动事件
        canvas.current.on('mouse:move', (event) => {
          const { e } = event;
          const { offsetX, offsetY } = e;
          line.set({ x2: offsetX, y2: offsetY });
          canvas.current.renderAll();
        });

        // 鼠标释放事件
        canvas.current.on('mouse:up', () => {
          canvas.current.off('mouse:move');
        });
      });

      attachmentPoints.push(attachmentPoint);
    }

    const group = new fabric.Group([rect, text, ...attachmentPoints], {});
    CanvasAction.current?.add(group);
    return group;
  };

  const getCornerProps = () => {
    const cornerSize = 32;
    const space = cornerSize + 8;
    const position = 0.5;
    const controlParamList = {
      topControl: {
        x: 0,
        y: -position,
        offsetX: 0,
        offsetY: -space,
      },
      bottomControl: {
        x: 0,
        y: position,
        offsetX: 0,
        offsetY: space,
      },
      leftControl: {
        x: position,
        y: 0,
        offsetX: space,
        offsetY: 0,
      },
      rightControl: {
        x: -position,
        y: 0,
        offsetX: -space,
        offsetY: 0,
      },
    };
    return {
      ...controlParamList[controlName],
      cursorStyle: 'circle',
      mouseUpHandler: (controlName) => {},
      render: renderIcon(addImg),
      hoverRender: renderIcon(hoverAddImg),
      cornerSize,
    };
  };

  return (
    <>
      <Button onClick={createNew}>添加对象</Button>
      <Canvas
        canvasAction={CanvasAction}
        reference
        style={{ height: '100%' }}
        // ruler
        onZoomChange={(value) => {
          console.log(value);
        }}
        onDragChang={(value) => {}}
        onSelection={(e) => {
          setRect(e.selected);
          console.log(e, 'eee');
        }}
        onSelectionUpdated={(e) => {}}
        onSelectionCleared={(e) => {}}
        onMouseDown={(e) => {}}
        onMouseMove={(e) => {}}
        onMouseUp={(e) => {}}
        onMouseOut={(e) => {}}
        onMouseOver={(e) => {}}
        bottomBarLeftRender={() => {
          return '自定义';
        }}
        bottomBarRightRender={() => {
          return '自定义';
        }}
        toolList={[]}
        cornerProps={{
          transparentCorners: false,
          cornerColor: '#FFFFFF',
          cornerStrokeColor: '#5071F4',
          cornerStyle: 'rect',
          cornerSize: 5,
          controls: {
            mtr: new fabric.Control({
              x: -0.5,
              y: 0.5,
              offsetX: -16 - 8,
              offsetY: 16 + 8,
              actionHandler: fabric.controlsUtils.rotationWithSnapping,
              cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
              withConnection: false,
              visible: true,
              actionName: 'rotate',
              // render: renderIcon(rotateImg),
              cornerSize: 16,
            }),
          },
        }}
        getCanvas={(_canvas) => {
          canvas.current = _canvas;
          _canvas.add(createNew());
          setTimeout(() => {
            CanvasAction.current.addHistory?.();
          }, 100);
        }}
      />
    </>
  );
};
