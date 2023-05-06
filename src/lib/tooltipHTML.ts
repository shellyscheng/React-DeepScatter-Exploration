import { DataPoint } from "../Types";
import { fetchOpeningText } from "./fetchOpeningText";

export const tooltipHTML = (point: DataPoint): string => {
    const tooltipId = `tooltip-${point.id}`;
  
    const updateTooltipContent = async (id: number) => {
      const openingText = await fetchOpeningText(id);
      const tooltipElement = document.getElementById(tooltipId);
      if (tooltipElement) {
        tooltipElement.innerHTML = `
          <div style="width: 200px; z-index: 99;">
            <h1>${point.title}</h1>
            <p>${openingText}</p>
          </div>`;
      }
    };
  
    updateTooltipContent(point.id);
  
    return `
      <div id="${tooltipId}" style="width: 200px; z-index: 99;">
        <h1>${point.title}</h1>
        <p>Loading...</p>
      </div>`;
  };