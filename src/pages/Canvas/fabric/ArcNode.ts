import { fabric } from 'fabric';

// const createRect = ({ canvas, options }) => {
//   const rect = new fabric.Rect({ ...options });
//   rect.set({
//     width: 176,
//     height: 40,
//     fill: '#fff',
//     left: canvas.width / 2,
//     top: canvas.height / 2,
//     hasBorders: true,
//     stroke: '#E4E5E8',
//     strokeWidth: 1,
//     hasRotatingPoint: false,
//     ...options,
//   });
//   return rect;
// };

// const addText = ({ canvas, options }) => {
//   let text = new fabric.Text(options.text || '添加文案');
//   text.set({
//     left: canvas.width / 2,
//     top: canvas.height / 2,
//     originX: 'left',
//     originY: 'top',
//     strokeWidth: 1,
//     fill: '#000',
//     cacheKey: Math.random(),
//     ...options,
//   });
//   text.set({
//     startWidth: text.width,
//     startHeight: text.height,
//   });
//   return text;
// };

const createNewObj = ({ canvas, options }) => {
  const { left, top } = options;
  const objRect = new fabric.Rect({
    // todo 定位
    left: 100,
    top: 100,
    width: 300,
    height: 150,
    fill: 'pink', // 填充颜色
  }) as any;

  console.log(left, objRect.left, '2131');

  const objText = new fabric.Text('Centered Text', {
    fill: 'white', // 文本颜色
    fontSize: 20, // 字体大小
  }) as any;

  objText.set({
    left: objRect.left + (objRect.width - objText.width) / 2,
    top: objRect.top + (objRect.height - objText.height) / 2,
  });

  // if (
  //   objRect.width &&
  //   objRect.height &&
  //   objRect.top &&
  //   objRect.left &&
  //   objText.height &&
  //   objText.width
  // ) {
  //   objText.set({
  //     top: objRect.top + objRect.height / 2 - objText.height / 2,
  //     left: objRect.left + objRect.width / 2 - objText.width / 2,
  //   });
  // }
  return [objRect, objText];
};

const fabricCom = (canvas: fabric.Canvas, props: any) => {
  const { type } = props;
  switch (type) {
    case 'obj': {
      return createNewObj({ canvas, options: props });
    }
  }
};
class ArcNode extends fabric.Group {
  comType: string = '';
  node: fabric.Group | null = null;
  constructor(canvas: fabric.Canvas, { type, left, top, ...options }: any) {
    const { width, height } = canvas;
    if (!width || !height) {
      return;
    }
    const nodeList = fabricCom(canvas, {
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
