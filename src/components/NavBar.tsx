import '../styles/NavBar.css';
import Filters from './Filter';
import ScatterPlot from '../lib/deepscatter';

interface NavBarProps {
  colorField: string;
  updateCategoricalFilter: Function;
  plotRef: React.MutableRefObject<ScatterPlot | undefined>;
}

const NavBar = ({
  colorField,
  updateCategoricalFilter,
  plotRef,
}: NavBarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Wikipedia DeepScatter Explorer</div>
      <div className={`navbar-menu`}>
        <div className="dropdown">
          <div className="navbar-menu-link">Filter by Category</div>
          <Filters
            plotRef={plotRef}
            colorField={colorField}
            updateCategoricalFilter={updateCategoricalFilter}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
