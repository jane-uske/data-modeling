import { fabric } from 'fabric';

const createNewObj = (options: any) => {
  const { left, top, name, code, maxNum } = options;
  const objRect = new fabric.Rect({
    // todo 定位
    left: left - 100,
    top: top - 100,
    width: 300,
    height: 150,
    fill: 'pink', // 填充颜色
  }) as any;

  objRect.set(name);
  objRect.set(code);
  objRect.set(maxNum);

  const objText = new fabric.Text(code, {
    fill: 'white', // 文本颜色
    fontSize: 20, // 字体大小
  }) as any;

  objText.set({
    left: objRect.left + (objRect.width - objText.width) / 2,
    top: objRect.top + (objRect.height - objText.height) / 2,
  });
  return [objRect, objText];
};

class ArcNode extends fabric.Group {
  comType: string = '';
  node: fabric.Group | null = null;
  constructor(canvas: fabric.Canvas, { type, left, top, ...options }: any) {
    console.log(options, 'options');
    const { width, height } = canvas;
    if (!width || !height) {
      return;
    }
    const nodeList = createNewObj({
      canvas,
      type,
      width,
      height,
      left,
      top,
      ...options,
    });
    super(nodeList, {
      left: left || 24,
      top: top || 24,
      hasRotatingPoint: false,
      hoverCursor: 'pointer',
      stroke: '#5071F4',
      strokeWidth: 1,
      comProps: {
        ...options,
      },
    });
    this.comType = type;
  }
}

export default ArcNode;
