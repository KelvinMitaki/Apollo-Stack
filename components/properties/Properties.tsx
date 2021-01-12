import React from "react";
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
  plinthArea: number;
  bedrooms: number;
  bathrooms: number;
  parkingLots: number;
}
interface Props {
  properties: Properties[];
}
const Properties: React.FC<Props> = props => {
  return (
    <div className={styles.properties_prt}>
      <h3>Property</h3>
      <div className={styles.properties}>
        {props.properties.map(p => (
          <Property key={p._id} property={p} />
        ))}
      </div>
      <div className={styles.pagination}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </div>
  );
};

export default Properties;
