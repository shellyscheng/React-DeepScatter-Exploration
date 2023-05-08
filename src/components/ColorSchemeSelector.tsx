import { ColorSchemeType } from './NavBar';
import '../styles/ColorSchemeSelector.css';

const ColorSchemeSelector = ({
  selectedColorScheme,
  setSelectedColorScheme,
  updateColorScheme,
}: {
  selectedColorScheme: string;
  setSelectedColorScheme: React.Dispatch<React.SetStateAction<ColorSchemeType>>;
  updateColorScheme: Function;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newColorScheme = event.target.value;
    setSelectedColorScheme(newColorScheme as ColorSchemeType);
    updateColorScheme({ colorScheme: newColorScheme });
  };

  return (
    <div className="dropdown-content color-scheme-div">
      <select
        value={selectedColorScheme}
        onChange={handleChange}
        className="color-scheme-selector"
        size={5}
      >
        <option value="set1">Set 1</option>
        <option value="set2">Set 2</option>
        <option value="tableau10">Tableau 10</option>
        <option value="dark2">Dark 2</option>
        <option value="category10">Category 10</option>
      </select>
    </div>
  );
};

export default ColorSchemeSelector;
