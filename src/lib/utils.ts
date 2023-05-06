import { DataPoint } from '../Types';
import { fetchOpeningText } from './fetchOpeningText';
import ScatterPlot from '../lib/deepscatter';

export function formatString(str: string): string {
  // Replace underscores with spaces
  str = str.replace(/_/g, ' ');
  // Capitalize the first letter of each word
  str = str.replace(/\b\w/g, (match) => match.toUpperCase());
  return str;
}

export const handleTooltip = (point: DataPoint): string => {
  const tooltipId = `tooltip-${point.id}`;

  const updateTooltipContent = async (id: number) => {
    const openingText = await fetchOpeningText(id);
    const tooltipElement = document.getElementById(tooltipId);
    if (tooltipElement) {
      tooltipElement.innerHTML = `
          <div style="width: 200px; z-index: 99;">
            <h3>&lt;${formatString(point.topic_top_50)}&gt</h3>
            <h2>${point.title}</h2>
            <p>${point.id}</p>
            <p>${openingText}</p>
          </div>`;
    }
  };

  updateTooltipContent(point.id);

  return `
      <div id="${tooltipId}" style="width: 200px; z-index: 99;">
        <h3>&lt;${formatString(point.topic_top_50)}&gt</h3>
        <h2>${point.title}</h2>
        <p>${point.id}</p>
        <p>Loading...</p>
      </div>`;
};

export const handleClick = (point: DataPoint) => {
  const url = `https://en.wikipedia.org/wiki?curid=${point.id}`;
  console.log('point', point);
  window.open(url, '_blank');
};

export const getAllCategoricalFields = ({
  field,
  plot,
}: {
  field: string;
  plot?: ScatterPlot;
}): Array<string> => {
  return plot?._renderer?.aes?.dim(field).current.scale.domain() || [];
};

export const getAllCategoricalColors = ({
  field,
  plot,
}: {
  field: string;
  plot?: ScatterPlot;
}): string[] => {
  return plot?._renderer?.aes?.dim(field).current.scale.range() || [];
};

export const generateCategoricalFilter = ({
  field,
  selectedCategories,
}: {
  field: string;
  selectedCategories: string[];
}) => {
  if (!selectedCategories.length) return {};

  const categoryFilters = selectedCategories
    .map((value) => `${field} === "${value}"`)
    .join(' || ');

  return {
    field,
    lambda: `${field} => ${categoryFilters}`,
  };
};
