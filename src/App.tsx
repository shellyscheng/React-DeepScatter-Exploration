import './App.css';
import ChartWrapper from './components/ChartWrapper';
import ScatterPlot from './lib/deepscatter';
import { useRef } from 'react';
import { COLOR_FIELD, initialPrefs } from './lib/chartConfig';
import NavBar from './components/NavBar';
import { generateCategoricalFilter } from './lib/utils';

function App() {
  const plotRef = useRef<ScatterPlot>();

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
        colorField={COLOR_FIELD}
        updateCategoricalFilter={updateCategoricalFilter}
      />
    </div>
  );
}

export default App;
