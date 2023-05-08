import './App.css';
import ChartWrapper from './components/ChartWrapper';
import ScatterPlot from './lib/deepscatter';
import { useRef } from 'react';
import { DEFAULT_COLOR_BY_FIELD, initialPrefs } from './lib/chartConfig';
import { generateCategoricalFilter } from './lib/utils';

function App() {
  const plotRef = useRef<ScatterPlot>();

  //function to update the plot with user selected point size
  const updatePointSize = ({ pointSize }: { pointSize: number }) => {
    plotRef?.current?.plotAPI({
      point_size: pointSize,
    });
  };

  //function to update the plot with user selected color scheme
  const updateColorScheme = ({ colorScheme }: { colorScheme: string }) => {
    plotRef?.current?.plotAPI({
      encoding: {
        color: {
          field: DEFAULT_COLOR_BY_FIELD,
          range: colorScheme,
        },
      },
    });
  };

  //function to update the plot with current selected categorical filter
  const updateCategoricalFilter = ({
    field,
    selectedCategories,
  }: {
    field: string;
    selectedCategories: string[];
  }) => {
    plotRef?.current?.plotAPI({
      encoding: {
        filter: generateCategoricalFilter({
          field,
          selectedCategories,
        }),
      },
    });
  };

  return (
    <div className="App">
      <ChartWrapper
        prefs={initialPrefs}
        plotRef={plotRef}
        updateCategoricalFilter={updateCategoricalFilter}
        updatePointSize={updatePointSize}
        updateColorScheme={updateColorScheme}
      />
    </div>
  );
}

export default App;
