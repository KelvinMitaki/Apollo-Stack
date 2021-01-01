import React from "react";
import styles from "../../styles/listings.module.css";

interface Props {
  className?: string;
}

const Listing: React.FC<Props> = props => {
  return (
    <tr className={`${styles.listing} ${props.className ? styles.active : ""}`}>
      <td>123</td>

      <td>12373625681269798</td>

      <td>
        <div className={styles.img}>
          <div
            className={styles.bg_image}
            style={{ backgroundImage: "url(/image-3.jpg)" }}
          ></div>
        </div>
      </td>

      <td>townhouse</td>

      <td>Ongata Rongai, Nairobi</td>

      <td>32,000,000</td>

      <td>rent</td>

      <td>expired</td>

      <td>31/12/2020</td>
    </tr>
  );
};

export default Listing;
