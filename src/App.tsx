import './App.css';
import ChartWrapper from './components/ChartWrapper';
import ScatterPlot from "./components/deepscatter";
import React, { useRef } from 'react';

interface DataPoint {
  x: number;
  y: number;
  title: string;
  id: number;
};

function App() {
  const plotRef = useRef<ScatterPlot>();

  const prefs = {
    source_url: '/tiles', // the output of the quadfeather tiling engine
    max_points: 10000, // a full cap.
    alpha: 25, // Target saturation for the full page.
    zoom_balance: 0.7, // Rate at which points increase size. https://observablehq.com/@bmschmidt/zoom-strategies-for-huge-scatterplots-with-three-js
    point_size: 3, // Default point size before application of size scaling
    background_color: '#000000',
  
    // encoding API based roughly on Vega Lite: https://vega.github.io/vega-lite/docs/encoding.html
    encoding: {
      x: {
        field: 'x',
        transform: 'literal',
      },
      y: {
        field: 'y',
        transform: 'literal',
      },
      color: {
        constant: '#00ff00',
      },
    },
  };

  const tooltipHTML = (point: DataPoint): string => {
    return `
      <div style="width: 200px; z-index: 99;">
      <h3>${point.title}</h3>
      <p>${point.id}</p>
      </div>
  `;
  };

  return (
    <div className="App">
      <ChartWrapper 
      prefs={prefs}
      plotRef={plotRef}
      tooltipHTML={tooltipHTML}/>
    </div>
  );
}

export default App;
