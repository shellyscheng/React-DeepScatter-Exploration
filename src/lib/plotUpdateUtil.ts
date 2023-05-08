import { generateCategoricalFilter } from './utils';
import ScatterPlot from './deepscatter';
import { DEFAULT_COLOR_BY_FIELD } from './chartConfig';

//function to update the plot with current selected categorical filter
export const updateCategoricalFilter = ({
  field,
  selectedCategories,
  plotRef,
}: {
  field: string;
  selectedCategories: string[];
  plotRef?: React.MutableRefObject<ScatterPlot | null>;
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

export const updatePointSize = ({
  pointSize,
  plotRef,
}: {
  pointSize: number;
  plotRef?: React.MutableRefObject<ScatterPlot | null>;
}) => {
  plotRef?.current?.plotAPI({
    point_size: pointSize,
  });
};

export const updateColorScheme = ({
  colorScheme,
  plotRef,
}: {
  colorScheme: string;
  plotRef?: React.MutableRefObject<ScatterPlot | null>;
}) => {
  plotRef?.current?.plotAPI({
    encoding: {
      color: {
        field: DEFAULT_COLOR_BY_FIELD,
        range: colorScheme,
      },
    },
  });
};
