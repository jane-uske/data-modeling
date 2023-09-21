import { fabric } from 'fabric';
import { useState } from 'react';

/**
 * 初始化自带控制器
 */
const initOwnControl = async () => {
  // const { img: rotateImg } = await getImage(rotateSrc);
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = '#FFFFFF';
  fabric.Object.prototype.cornerStrokeColor = '#5071F4';
  fabric.Object.prototype.cornerStyle = 'rect';
  fabric.Object.prototype.cornerSize = 5;
  //旋转控制器位置及样式修改
  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: -0.5,
    y: 0.5,
    offsetX: -16 - 8,
    offsetY: 16 + 8,
    // actionHandler: fabric.controlsUtils.rotationWithSnapping,
    // cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    withConnection: false,
    visible: false,
    actionName: 'rotate',
    // render: renderIcon(rotateImg),
    // cornerSize: 16,
  });
};

const useCanvas = () => {
  const [canvas, setCanvas] = useState();
  const [canvasStore, setCanvasStore] = useState<any>({
    zoomSize: 100,
  });

  const initCanvas = async (id: string, options: any) => {
    const canvas = new fabric.Canvas(id);
    canvas.set({
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      ...options,
    });

    canvas.setWidth(options.width);
    canvas.setHeight(options.height);
    canvas.requestRenderAll();
    await initOwnControl();
    return canvas;
  };

  const init = async (
    canvasName: string,
    { width, height }: { width: number; height: number },
  ) => {
    const { zoomSize } = canvasStore;
    const canvas = (await initCanvas(canvasName, {
      width: (width * zoomSize) / 100,
      height: (height * zoomSize) / 100,
    })) as any;
    setCanvas(canvas);
  };

  return {
    canvas,
    canvasStore,
    init,
    setCanvas,
    setCanvasStore,
  };
};

export default useCanvas;
