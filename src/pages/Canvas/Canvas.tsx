import { useState, useRef, useEffect } from 'react';
import { Canvas } from 'supcon-canvas';
import { fabric } from 'fabric';
import ReactDOM from 'react-dom';

export const MyCanvas: React.FC<any> = ({
  canvas,
  setCanvas,
  open,
  setOpen,
}) => {
  const CanvasAction = useRef(null) as any;

  const createNew = () => {
    const rect = new fabric.Rect({
      left: 500,
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

    const group = new fabric.Group([rect, text], {});
    CanvasAction.current?.add(group);
    return group;
  };

  useEffect(() => {
    // 添加右键点击菜单事件
    if (!canvas) return;
    canvas.on('mouse:down', (event: any) => {
      console.log(event, 'event');
      if (event.e.button === 2) {
        // 右键点击
        event.e.preventDefault(); // 阻止默认的右键菜单

        // 获取鼠标点击的位置
        const mouseX = event.e.clientX;
        const mouseY = event.e.clientY;

        // 显示自定义右键菜单
        showContextMenu(mouseX, mouseY);
      }
    });

    // 自定义的右键点击菜单显示函数
    function showContextMenu(x, y) {
      // 创建一个包含菜单项的菜单组件，并设置其样式和位置
      const contextMenu = (
        <div
          style={{
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '5px',
          }}
        >
          <ul>
            <li onClick={handleMenuItemClick}>编辑</li>
            <li onClick={handleMenuItemClick}>删除</li>
          </ul>
        </div>
      );

      // 渲染自定义菜单
      ReactDOM.render(contextMenu, document.body);

      // 添加点击其他地方时隐藏菜单的监听器
      document.addEventListener('mousedown', (event) => {
        if (!contextMenu.contains(event.target)) {
          ReactDOM.unmountComponentAtNode(document.body);
        }
      });
    }

    // 菜单项点击事件处理函数
    function handleMenuItemClick(event) {
      // 处理菜单项点击事件
      console.log('点击了菜单项:', event.target.textContent);
      ReactDOM.unmountComponentAtNode(document.body);
    }
  }, []);

  return (
    <div style={{ flex: 1, background: 'red' }}>
      {/* <Button onClick={createNew}>添加对象</Button> */}

      <Canvas
        canvasAction={CanvasAction}
        reference
        style={{ height: '100%', background: 'red' }}
        // ruler
        onZoomChange={(value) => {}}
        onDragChang={(value) => {}}
        onSelection={(e) => {}}
        onSelectionUpdated={(e) => {}}
        onSelectionCleared={(e) => {}}
        onMouseDown={(e) => {
          setOpen(true);
          console.log('onMouseDown', e);
        }}
        // onMouseMove={(e) => {
        //   console.log('onMouseMove', e);
        // }}
        // onMouseUp={(e) => {
        //   console.log('onMouseUp___', e);
        // }}
        // onMouseOut={(e) => {
        //   console.log('onMouseOut', e);
        // }}
        // onMouseOver={(e) => {
        //   console.log('onMouseOver', e);
        // }}
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
          setCanvas(_canvas);
          _canvas.add(createNew());
          (_canvas.selection = false), // 禁用默认选择事件
            setTimeout(() => {
              CanvasAction.current.addHistory?.();
            }, 100);
        }}
      />
    </div>
  );
};
