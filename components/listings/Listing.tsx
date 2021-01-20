import React from "react";
import styles from "../../styles/listings.module.css";
import Router from "next/router";
import { format } from "date-fns";

interface Props {
  className?: string;
}

export interface ListingProperty {
  _id: string;
  reference: number;
  streetAddress: string;
  category: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: string;
  updatedAt: Date;
  images: string[];
  expiryDate: string;
}

const Listing: React.FC<Props & ListingProperty> = props => {
  return (
    <tr
      className={`${styles.listing} ${props.className ? styles.active : ""}`}
      onClick={() => Router.push(`/listing/edit/${props._id}`)}
    >
      <td>{props.reference}</td>
      <td>{props._id}</td>
      <td>
        <div className={styles.img}>
          <div
            className={styles.bg_image}
            style={{ backgroundImage: `url(${props.images[0]})` }}
          ></div>
        </div>
      </td>
      <td>{props.category}</td>
      <td>{props.streetAddress}</td>
      <td>{props.price.toLocaleString()}</td>
      <td>{props.bedrooms}</td>
      <td>{props.bathrooms}</td>
      <td>{props.type}</td>
      <td>
        {new Date(props.expiryDate) > new Date() ? props.status : "expired"}
      </td>
      <td>{format(new Date(props.updatedAt), "dd/MM/yyyy")}</td>
    </tr>
  );
};

export default Listing;
