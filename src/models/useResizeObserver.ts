import { useEffect, useState } from 'react';

const useResizeObserver: any = (target: HTMLDivElement) => {
  const [size, setSize] = useState<DOMRect>();
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setSize(entry.contentRect);
        }
      }
    });
    if (target) {
      resizeObserver.observe(target);
    }
    return () => {
      if (target) {
        resizeObserver.unobserve(target);
      }
    };
  }, [target]);
  return size;
};

export default useResizeObserver;
