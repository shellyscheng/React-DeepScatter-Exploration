import { useState } from 'react';
import { getAllCategoricalFields, formatString } from '../lib/utils';
import { DEFAULT_COLOR_BY_FIELD, COLOR_FIELD } from '../lib/chartConfig';
import ScatterPlot from '../lib/deepscatter';
import colorSchemes from '../lib/colorSchemes';
import { ColorSchemeType } from './NavBar';
import '../styles/Filter.css';

const Filters = ({
  updateCategoricalFilter,
  selectedColorScheme,
  plotRef,
}: {
  selectedColorScheme: ColorSchemeType;
  updateCategoricalFilter: Function;
  plotRef: React.MutableRefObject<ScatterPlot | undefined>;
}) => {
  // get all categorical options
  const categoricalOptions = getAllCategoricalFields({
    field: COLOR_FIELD,
    plot: plotRef.current,
  });

  // get the categorical colors
  const colorOptions = colorSchemes[selectedColorScheme];

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
      field: DEFAULT_COLOR_BY_FIELD,
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
