import { Range } from "rc-slider";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/home.module.css";

interface Props {
  className?: string;
  alternate?: boolean;
}

const RangeComponent: React.FC<Props> = props => {
  const [num, setNum] = useState({
    lowerBound: 20,
    upperBound: 18000000,
    value: [20, 18000000]
  });
  useEffect(() => {
    setNum({ ...num, lowerBound: num.value[0], upperBound: num.value[1] });
  }, num.value);

  return (
    <div className={styles.slider}>
      <div className={props.className ? styles[props.className] : ""}>
        <p>Price: </p>[<p>{num.lowerBound.toLocaleString()}</p> -{" "}
        <p>{num.upperBound.toLocaleString()}</p>
        ]Ksh
      </div>

      <Range
        min={20}
        max={100000000}
        defaultValue={num.value}
        allowCross={false}
        style={{
          alignItems: "baseline",
          ...(props.className && { width: "100%" })
        }}
        trackStyle={[{ backgroundColor: "rgba(1, 2, 78, 0.76)" }]}
        handleStyle={[
          {
            border: "1px solid rgba(1, 2, 78, 0.76)"
          },
          {
            border: "1px solid rgba(1, 2, 78, 0.76)"
          }
        ]}
        onChange={n => setNum({ ...num, value: n })}
        className={styles.range}
      />
    </div>
  );
};

export default RangeComponent;
