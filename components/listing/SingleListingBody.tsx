import React from "react";
import styles from "../../styles/singleListing.module.css";

interface Props {
  active: boolean;
}

const SingleListingBody: React.FC<Props> = props => {
  return (
    <tr className={`${props.active ? styles.active : ""} ${styles.msg_row}`}>
      <td>16/12/2020 21:16:33</td>
      <td>john doe</td>
      <td className={styles.email}>john@gmail.com</td>
      <td>0712345678</td>
      <td className={styles.msg}>
        Please contact me regarding web reference 2028
      </td>
    </tr>
  );
};

export default SingleListingBody;
