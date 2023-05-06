import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  CSSProperties,
  ReactNode,
} from 'react';
import ScatterPlot from '../lib/deepscatter';
import { handleClick, handleTooltip } from '../lib/utils';
import { DeepScatterContext } from '../contexts/ChartContext';

const parentDivStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

interface ChartProps {
  prefs: Object;
  plotRef: React.MutableRefObject<ScatterPlot | undefined>;
  children: ReactNode;
}

const ChartWrapper = ({ prefs, plotRef, children }: ChartProps) => {
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const chartParentId = 'deep-scatter-parent-element-id';
  const chartParentRef = useRef(null);

  useEffect(() => {
    if (chartParentRef.current && !plotRef?.current) {
      const _plot = new ScatterPlot(`#${chartParentId}`);
      _plot.tooltip_html = handleTooltip;

      plotRef.current = _plot;

      // @ts-ignore
      window.plot = _plot;
      console.log('created scatter...');

      plotRef.current.plotAPI(prefs).finally(async () => {
        console.log('... initial prefs set');
        setInitialLoadComplete(true);
        _plot.click_function = handleClick;
      });
    }
  }, [chartParentId, plotRef, chartParentRef, prefs]);

  const providerState = useMemo(
    () => ({ initialLoadComplete, plotRef }),
    [initialLoadComplete, plotRef]
  );

  return (
    <DeepScatterContext.Provider value={providerState}>
      {children}
      <div style={parentDivStyle} id={chartParentId} ref={chartParentRef} />
    </DeepScatterContext.Provider>
  );
};

export default ChartWrapper;
