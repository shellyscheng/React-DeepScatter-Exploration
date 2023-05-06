import { useState } from 'react';
import {
  getAllCategoricalColors,
  getAllCategoricalFields,
  formatString,
} from '../lib/utils';
import { COLOR_BY_FIELD } from '../lib/chartConfig';
import ScatterPlot from '../lib/deepscatter';
import '../styles/Filter.css';

const Filters = ({
  colorField,
  updateCategoricalFilter,
  plotRef,
}: {
  colorField: string;
  updateCategoricalFilter: Function;
  plotRef: React.MutableRefObject<ScatterPlot | undefined>;
}) => {
  // get all categorical options
  const categoricalOptions = getAllCategoricalFields({
    field: colorField,
    plot: plotRef.current,
  });

  // get all categorical colors
  const colorOptions = getAllCategoricalColors({
    field: colorField,
    plot: plotRef.current,
  });

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoricalOptions);

  // handle tooltip selection
  const handleSelect = (option: string) => {
    const index = selectedCategories.findIndex(
      (selected) => selected === option
    );

    let newSelectedCategories: string[];

    if (index === -1) {
      newSelectedCategories = [...selectedCategories, option];
    } else {
      newSelectedCategories = selectedCategories.filter(
        (selected) => selected !== option
      );
    }

    setSelectedCategories(newSelectedCategories);

    updateCategoricalFilter({
      field: COLOR_BY_FIELD,
      selectedCategories: newSelectedCategories,
    });
  };

  return (
    <div className="dropdown-content">
      {categoricalOptions.map((option, index) => {
        const isSelected = selectedCategories.includes(option);
        return (
          <label
            key={`${option}-${index}`}
            className={`control-panel-item${
              isSelected || selectedCategories.length === 0 ? '' : ' lighten'
            }`}
            style={{
              backgroundColor: colorOptions[index % colorOptions.length],
              position: 'relative',
            }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(option) ?? false}
              onChange={() => handleSelect(option)}
            />
            {formatString(option)}
          </label>
        );
      })}
    </div>
  );
};

export default Filters;
