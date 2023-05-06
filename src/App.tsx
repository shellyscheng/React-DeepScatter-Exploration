import './App.css';
import ChartWrapper from './components/ChartWrapper';
import ScatterPlot from "./components/deepscatter";
import React, { useEffect, useRef, useState } from 'react';
import { DataPoint } from './Types';


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


  return (
    <div className="App">
      <ChartWrapper 
      prefs={prefs}
      plotRef={plotRef}/>
    </div>
  );
}

export default App;
