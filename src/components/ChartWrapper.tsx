import React, { useEffect, useRef, useState, createContext, useMemo, CSSProperties } from 'react';
import ScatterPlot from "./deepscatter";

export const DeepScatterContext = createContext<any>({});

const parentDivStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

interface ChartProps {
  prefs: Object; 
  plotRef: any;
  tooltipHTML: (point: any) => string}

const ChartWrapper = ({prefs, plotRef, tooltipHTML}: ChartProps) => {
    const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
    const chartParentId = "deep-scatter-parent-element-id";
    const chartParentRef = useRef(null);

    useEffect(() => {
    if (chartParentRef.current && !plotRef?.current) {
      const _plot = new ScatterPlot(`#${chartParentId}`);
      _plot.tooltip_html = tooltipHTML;

      plotRef.current = _plot;
      // console.log("created scatter...");
      plotRef.current.plotAPI(prefs).finally(() => {
        // console.log("... initial prefs set");
        setInitialLoadComplete(true);
      });
    }
  }, [chartParentId, plotRef, chartParentRef, prefs, tooltipHTML]);

  const providerState = useMemo(
    () => ({ initialLoadComplete, plotRef }),
    [initialLoadComplete, plotRef]
  );

   return( 
    <DeepScatterContext.Provider value={providerState}>
        <div style={parentDivStyle} id={chartParentId} ref={chartParentRef} />
    </DeepScatterContext.Provider>
    )
}

export default ChartWrapper;