import { Range } from "rc-slider";
import React, { useState } from "react";

const Slider = () => {
  const [num, setNum] = useState({
    lowerBound: 20,
    upperBound: 40,
    value: [20, 40]
  });
  const onLowerBoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum({ ...num, lowerBound: parseFloat(e.target.value) });
  };
  const onUpperBoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum({ ...num, upperBound: parseFloat(e.target.value) });
  };
  return (
    <div>
      <label>lowerBound</label>
      <input type="number" onChange={onLowerBoundChange} />

      <label>upperBound</label>
      <input type="number" onChange={onUpperBoundChange} />
      <Range
        min={0}
        max={20000}
        defaultValue={[0, 18000]}
        allowCross={false}
        style={{ alignItems: "baseline" }}
      />
    </div>
  );
};

export default Slider;
