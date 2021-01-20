import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import styles from "../../styles/listings.module.css";

interface Props {
  className?: string;
  checked: boolean;
  setCheckExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpiredListing: React.FC<Props> = props => {
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);
  useEffect(() => {
    props.setCheckExpired(check);
  }, [check]);
  return (
    <tr
      className={`${styles.listing} ${
        props.className ? styles[props.className] : ""
      }`}
    >
      <td>
        <span className={styles.icon}>
          <p
            className={`${styles.BiCheck} ${check ? styles.checked : ""}`}
            onClick={() => setCheck(ck => !ck)}
          >
            <FiCheck />
          </p>
        </span>
      </td>
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
