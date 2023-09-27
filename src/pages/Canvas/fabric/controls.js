import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { fabric } from 'fabric';

function deleteObject(eventData, transform) {
  const target = transform.target;
  const canvas = target.canvas;
  canvas.remove(target);
  canvas.requestRenderAll();
}

function cloneObject(eventData, transform) {
  const target = transform.target;
  const canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.left += 10;
    cloned.top += 10;
    cloned.comProps = target.comProps;
    canvas.add(cloned);
  });
}

function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    ctx.save();
    const size = 25;
    const halfSize = 12.5;
    const cornerRadius = 2; // 圆角半径
    ctx.fillStyle = styleOverride.cornerColor || '#5071F4';
    ctx.beginPath();
    ctx.moveTo(left - halfSize + cornerRadius, top - halfSize);
    ctx.lineTo(left + halfSize - cornerRadius, top - halfSize);
    ctx.arcTo(
      left + halfSize,
      top - halfSize,
      left + halfSize,
      top - halfSize + cornerRadius,
      cornerRadius,
    );
    ctx.lineTo(left + halfSize, top + halfSize - cornerRadius);
    ctx.arcTo(
      left + halfSize,
      top + halfSize,
      left + halfSize - cornerRadius,
      top + halfSize,
      cornerRadius,
    );
    ctx.lineTo(left - halfSize + cornerRadius, top + halfSize);
    ctx.arcTo(
      left - halfSize,
      top + halfSize,
      left - halfSize,
      top + halfSize - cornerRadius,
      cornerRadius,
    );
    ctx.lineTo(left - halfSize, top - halfSize + cornerRadius);
    ctx.arcTo(
      left - halfSize,
      top - halfSize,
      left - halfSize + cornerRadius,
      top - halfSize,
      cornerRadius,
    );
    ctx.closePath();
    ctx.fill();

    // 绘制图像
    const image = new Image();
    image.src = icon;
    image.width = 12;
    image.onload = function () {
      // 在背景上绘制图像
      ctx.drawImage(image, left - 7.5, top - 7.5, 15, 15);
    };

    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.restore();
  };
}

const addControls = (type) => {
  return new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -20,
    offsetX: type === 'clone' ? -30 : -10,
    cursorStyle: 'pointer',
    mouseUpHandler: type === 'clone' ? cloneObject : deleteObject,
    render: renderIcon(
      type === 'clone' ? <CopyOutlined /> : <DeleteOutlined />,
    ),
    cornerSize: 48,
  });
};

export { addControls };
