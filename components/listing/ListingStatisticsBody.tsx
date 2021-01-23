import React from "react";
import styles from "../../styles/listingStatistics.module.css";

interface Props {
  className?: boolean;
}

const ListingStatisticsBody: React.FC<Props> = props => {
  return (
    <tr className={props.className ? styles.active : ""}>
      <td>9198712991827</td>
      <td>nairobi</td>
      <td>apartment</td>
      <td>rent</td>
    </tr>
  );
};

export default ListingStatisticsBody;
