import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  CSSProperties,
} from 'react';
import ScatterPlot from '../lib/deepscatter';
import NavBar from './NavBar';
import { handleClick, handleTooltip } from '../lib/utils';
import '../styles/tooltip.css';

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
  colorField: string;
  updateCategoricalFilter: Function;
}

const ChartWrapper = ({
  prefs,
  plotRef,
  colorField,
  updateCategoricalFilter,
}: ChartProps) => {
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const chartParentId = 'deep-scatter-parent-element-id';
  const chartParentRef = useRef(null);

  // load the DeepScatter plot
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

  return (
    <div>
      <NavBar
        colorField={colorField}
        updateCategoricalFilter={updateCategoricalFilter}
        plotRef={plotRef}
      />
      <div style={parentDivStyle} id={chartParentId} ref={chartParentRef} />
    </div>
  );
};

export default ChartWrapper;
