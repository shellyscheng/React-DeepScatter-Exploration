import React, { useContext, useState } from 'react';
import { DeepScatterContext } from '../contexts/ChartContext';
import {
  getAllCategoricalColors,
  getAllCategoricalFields,
  formatString,
} from '../lib/utils';
import { COLOR_BY_FIELD } from '../lib/chartConfig';

interface ControlPanelProps {
  colorField: string;
  colorScheme: string;
  updateCategoricalFilter: Function;
}

const ControlPanel = ({
  colorField,
  colorScheme,
  updateCategoricalFilter,
}: ControlPanelProps) => {
  const { plotRef } = useContext(DeepScatterContext);

  const categoricalOptions = getAllCategoricalFields({
    field: colorField,
    plot: plotRef.current,
  });

  const colorOptions = getAllCategoricalColors({
    field: colorField,
    plot: plotRef.current,
  });

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoricalOptions);

  const handleSelect = (option: string) => {
    const index = selectedCategories.findIndex(
      (selected) => selected === option
    );
    console.log('index', index);
    let newSelectedCategories: string[];

    if (index === -1) {
      newSelectedCategories = [...selectedCategories, option];
    } else {
      newSelectedCategories = selectedCategories.filter(
        (selected) => selected !== option
      );
    }

    setSelectedCategories(newSelectedCategories);
    console.log({
      colorField,
      selectedCategories: newSelectedCategories,
    });
    updateCategoricalFilter({
      field: COLOR_BY_FIELD,
      selectedCategories: newSelectedCategories,
    });
  };

  return (
    <div
      className="control-panel"
      style={{
        position: 'fixed',
        zIndex: 400,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
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
              fontWeight: 'bold',
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

export default ControlPanel;
