import { FC, useEffect, useRef } from 'react';
import cs from 'classnames';
// import { useModel } from 'umi';
import useResizeObserver from '../../../models/useResizeObserver';
import useCanvas from '@/models/useCanvas';
// import ToolBar from './ToolBar';
import styles from './FlowChart.less';

const CanvasName = 'flowCanvas';

const FlowChart: FC<any> = () => {
  // const {} = useModel('useResizeObserver');
  const { canvasStore, init } = useCanvas();
  const flowChartDom = useRef<HTMLDivElement>(null);
  const size = useResizeObserver(flowChartDom.current);

  useEffect(() => {
    if (flowChartDom) {
      init(CanvasName, {
        width: 1440,
        height: 1024,
      });
    }
  }, []);

  // useEffect(() => {
  //   if (!size) {
  //     return;
  //   }
  //   canvasStore.setDimensions({
  //     width: Math.min(size.width, (1440 * canvasStore.zoomSize) / 100),
  //     height: Math.min(size.height - 26, (1024 * canvasStore.zoomSize) / 100),
  //   });
  // }, [size, canvasStore.zoomSize]);

  // const changePageName = () => {
  //   canvasStore.editPage();
  // };
  return (
    <div className={styles.chartWrapper} ref={flowChartDom}>
      <canvas id={CanvasName}></canvas>
      {/* <ToolBar /> */}
    </div>
  );
};

export default FlowChart;
