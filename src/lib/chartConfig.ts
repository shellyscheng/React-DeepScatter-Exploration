export const COLOR_FIELD = 'color';
export const DEFAULT_COLOR_BY_FIELD = 'topic_top_50';
export const DEFAULT_COLOR_SCHEME = 'category10';

export const initialPrefs = {
  source_url: `${window.location.href}/tiles`, // the output of the quadfeather tiling engine
  max_points: 10000, // a full cap.
  alpha: 25, // Target saturation for the full page.
  zoom_balance: 0.7, // Rate at which points increase size. https://observablehq.com/@bmschmidt/zoom-strategies-for-huge-scatterplots-with-three-js
  point_size: 5, // Default point size before application of size scaling
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
      field: DEFAULT_COLOR_BY_FIELD,
      range: DEFAULT_COLOR_SCHEME,
    },
  },
};
