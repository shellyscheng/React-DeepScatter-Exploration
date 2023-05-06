import { fetchOpeningText } from './fetchOpeningText';
import ScatterPlot from '../lib/deepscatter';

export interface DataPoint {
  x: number;
  y: number;
  title: string;
  id: number;
  topic_top_50: string;
  topic_top_100: string;
}

export function formatString(str: string): string {
  // Replace underscores with spaces
  str = str.replace(/_/g, ' ');
  // Capitalize the first letter of each word
  str = str.replace(/\b\w/g, (match) => match.toUpperCase());
  return str;
}

// process tooltip to the right format for the chart
export const handleTooltip = (point: DataPoint): string => {
  const tooltipId = `tooltip-${point.id}`;

  const updateTooltipContent = async (id: number) => {
    const openingText = await fetchOpeningText(id);
    const tooltipElement = document.getElementById(tooltipId);
    if (tooltipElement) {
      tooltipElement.innerHTML = `
          <div class="tooltip-content">
            <h3>&lt;${formatString(point.topic_top_50)}&gt</h3>
            <a href="https://en.wikipedia.org/wiki?curid=${
              point.id
            }" target="_blank">
            <h2>${point.title}</h2>
            </a>
            <p>${openingText}</p>
          </div>`;
    }
  };

  updateTooltipContent(point.id);

  return `
      <div id="${tooltipId}" class="tooltip-content"">
        <h3>&lt;${formatString(point.topic_top_50)}&gt</h3>
        <a href="https://en.wikipedia.org/wiki?curid=${
          point.id
        }" target="_blank">
          <h2>${point.title}</h2>
        </a>
        <div class="spinner"></div>
      </div>`;
};

// open wikipedia page in new tab when clicking on a point
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
}): string[] => {
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

// create the categorical filter for the plot
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
