import React from "react";
import styles from "../../styles/listings.module.css";
import Router from "next/router";

interface Props {
  className?: string;
}

const ExpiredListing: React.FC<Props> = props => {
  return (
    <tr
      className={`${styles.listing} ${
        props.className ? styles[props.className] : ""
      }`}
      onClick={() => Router.push("/listing/edit/123")}
    >
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
      <td>3</td>
      <td>2</td>
      <td>rent</td>
      <td>3/3/2021</td>
      <td>31/12/2020</td>
    </tr>
  );
};

export default ExpiredListing;
