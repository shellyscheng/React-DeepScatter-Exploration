import { ChangeEvent, useState } from 'react';
import { initialPrefs } from '../lib/chartConfig';

const PointSizeSlider = ({
  updatePointSize,
}: {
  updatePointSize: Function;
}) => {
  const [value, setValue] = useState<number>(initialPrefs.point_size);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(event.target.value));
    updatePointSize({ pointSize: Number(event.target.value) });
  };

  return (
    <div className="dropdown-content slider-div">
      <input
        className="range-slider"
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={handleChange}
      />
      Value: {value}
    </div>
  );
};

export default PointSizeSlider;
