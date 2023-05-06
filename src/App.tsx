import './App.css';
import ChartWrapper from './components/ChartWrapper';
import ScatterPlot from './lib/deepscatter';
import { useRef } from 'react';
import { prefs, COLOR_FIELD, COLOR_SCHEME } from './lib/chartConfig';
import ControlPanel from './components/ControlPanel';
import { generateCategoricalFilter } from './lib/utils';

function App() {
  const plotRef = useRef<ScatterPlot>();

  const updateCategoricalFilter = ({
    field,
    selectedCategories,
  }: {
    field: string;
    selectedCategories: string[];
  }) => {
    plotRef?.current?.plotAPI({
      encoding: {
        filter2: generateCategoricalFilter({
          field,
          selectedCategories,
        }),
      },
    });
  };

  return (
    <div className="App">
      <ChartWrapper prefs={prefs} plotRef={plotRef}>
        <ControlPanel
          colorField={COLOR_FIELD}
          colorScheme={COLOR_SCHEME}
          updateCategoricalFilter={updateCategoricalFilter}
        />
      </ChartWrapper>
    </div>
  );
}

export default App;
