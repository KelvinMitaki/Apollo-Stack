import Link from "next/link";
import React from "react";
import styles from "../../styles/listings.module.css";
import { ListingProperty } from "./Listing";

const MobileListing: React.FC<ListingProperty> = props => {
  return (
    <div className={styles.MobileListing}>
      <div className={styles.header}>
        <div>
          <p>list no:</p>
          <p>{props._id}</p>
        </div>
        <div>
          <p>reference:</p>
          <p>{props.reference}</p>
        </div>
        <div>
          <p>status:</p>
          <p>{props.status}</p>
        </div>
      </div>
      <div className={styles.mb_body}>
        <div
          className={styles.mb_img}
          style={{ backgroundImage: `url(${props.images[0]})` }}
        ></div>
        <div className={styles.content}>
          <div>
            <p>{props.type === "rent" ? "to rent" : "for sale"}:</p>
            <p>{props.category}</p>
          </div>
          <div>
            <p>price:</p>
            <p>ksh {props.price.toLocaleString()}</p>
          </div>
          <div>
            <p>address:</p>
            <p>{props.streetAddress}</p>
          </div>
          <div>
            <p>bedrooms:</p>
            <p>{props.bedrooms}</p>
          </div>
          <div>
            <p>bathrooms:</p>
            <p>{props.bathrooms}</p>
          </div>
        </div>
      </div>
      <Link href={`/listing/edit/${props._id}`}>
        <a>
          <div className={styles.btn}>
            <button>edit</button>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default MobileListing;
