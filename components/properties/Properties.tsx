import React, { useEffect, useState } from "react";
import styles from "../../styles/properties.module.css";
import Property from "./Property";
export interface Properties {
  _id: string;
  images: string[];
  type: "sale" | "rent";
  price: number;
  streetAddress: string;
  location: string;
  description: string;
  plinthArea?: number;
  bedrooms: number;
  bathrooms: number;
  parkingLots?: number;
}
interface Props {
  properties: Properties[];
  count: number;
}
const Properties: React.FC<Props> = props => {
  const [selectedNum, setSelectedNum] = useState<number>(1);
  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = 200 / 10;
  if (selectedNum > 3) {
    nums = [
      selectedNum - 2,
      selectedNum - 1,
      selectedNum,
      selectedNum + 1,
      selectedNum + 2
    ];
  }
  if (selectedNum === lastPage) {
    nums = [
      selectedNum - 5,
      selectedNum - 4,
      selectedNum - 3,
      selectedNum - 2,
      selectedNum - 1,
      selectedNum
    ];
  }
  return (
    <div className={styles.properties_prt}>
      <h3>Property</h3>
      <div className={styles.properties}>
        {props.properties.map(p => (
          <Property key={p._id} property={p} />
        ))}
      </div>
      <div className={styles.pagination}>
        {selectedNum > 3 && (
          <>
            <p
              className={selectedNum === 1 ? styles.active : ""}
              onClick={() => setSelectedNum(1)}
            >
              1
            </p>
            <span>...</span>
          </>
        )}
        {nums
          .filter(n => n <= lastPage)
          .map(n => (
            <p
              className={selectedNum === n ? styles.active : ""}
              key={n}
              onClick={() => setSelectedNum(n)}
            >
              {n}
            </p>
          ))}
        {selectedNum !== lastPage && !nums.find(n => n === lastPage) && (
          <>
            <span>...</span>{" "}
            <p
              className={selectedNum === lastPage ? styles.active : ""}
              onClick={() => setSelectedNum(lastPage)}
            >
              {lastPage}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
