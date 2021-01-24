import Router from "next/router";
import React from "react";
import styles from "../../styles/listingStatistics.module.css";
import { ListingProperty } from "../listings/Listing";

interface Props {
  className?: boolean;
  property: ListingProperty;
}

const ListingStatisticsBody: React.FC<Props> = props => {
  const {
    property: { _id, streetAddress, type, category }
  } = props;
  return (
    <tr
      className={props.className ? styles.active : ""}
      onClick={() => Router.push("/listing/statistics/123")}
    >
      <td>{_id}</td>
      <td>{streetAddress}</td>
      <td>{category}</td>
      <td>{type}</td>
    </tr>
  );
};

export default ListingStatisticsBody;
