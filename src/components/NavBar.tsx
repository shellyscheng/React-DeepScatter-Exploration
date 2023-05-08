import Filters from './Filter';
import ScatterPlot from '../lib/deepscatter';
import PointSizeSlider from './PointSizeSlider';
import ColorSchemeSelector from './ColorSchemeSelector';
import { useState } from 'react';
import { DEFAULT_COLOR_SCHEME } from '../lib/chartConfig';
import '../styles/NavBar.css';

interface NavBarProps {
  updateCategoricalFilter: Function;
  updatePointSize: Function;
  updateColorScheme: Function;
  plotRef: React.MutableRefObject<ScatterPlot | undefined>;
}

export type ColorSchemeType =
  | 'set1'
  | 'set2'
  | 'tableau10'
  | 'dark2'
  | 'category10';

const NavBar = ({
  updateCategoricalFilter,
  updatePointSize,
  updateColorScheme,
  plotRef,
}: NavBarProps) => {
  const [selectedColorScheme, setSelectedColorScheme] =
    useState<ColorSchemeType>(DEFAULT_COLOR_SCHEME);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Wikipedia DeepScatter Explorer</div>
      <div className="navbar-menu">
        <div className="dropdown">
          <div className="navbar-menu-link">Adjust Point Size</div>
          <PointSizeSlider updatePointSize={updatePointSize} />
        </div>
        <div className="dropdown">
          <div className="navbar-menu-link">Adjust Color Scheme</div>
          <ColorSchemeSelector
            selectedColorScheme={selectedColorScheme}
            setSelectedColorScheme={setSelectedColorScheme}
            updateColorScheme={updateColorScheme}
          />
        </div>
        <div className="dropdown">
          <div className="navbar-menu-link">Filter by Category</div>
          <Filters
            plotRef={plotRef}
            selectedColorScheme={selectedColorScheme}
            updateCategoricalFilter={updateCategoricalFilter}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
