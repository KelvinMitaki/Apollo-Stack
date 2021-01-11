import React from "react";
import styles from "../../styles/listings.module.css";
import Router from "next/router";

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
      <td>{props.status}</td>
      <td>{new Date(props.updatedAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default Listing;
