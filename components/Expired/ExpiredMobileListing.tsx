import Link from "next/link";
import React from "react";
import styles from "../../styles/listings.module.css";
import { ListingProperty } from "../listings/Listing";
interface Props {
  property: ListingProperty;
}
const ExpiredMobileListing: React.FC<Props> = ({ property }) => {
  return (
    <div className={styles.MobileListing}>
      <div className={styles.header}>
        <div>
          <p>list no:</p>
          <p>{property._id}</p>
        </div>
        <div>
          <p>reference:</p>
          <p>{property.reference}</p>
        </div>
        <div>
          <p>expiry date:</p>
          <p>{new Date(property.expiryDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={styles.mb_body}>
        <div
          className={styles.mb_img}
          style={{ backgroundImage: `url(${property.images[0]})` }}
        ></div>
        <div className={styles.content}>
          <div>
            {property.type === "rent" ? <p>to rent:</p> : <p>for sale:</p>}
            <p>{property.category}</p>
          </div>
          <div>
            <p>price:</p>
            <p>ksh {property.price.toLocaleString()}</p>
          </div>
          <div>
            <p>address:</p>
            <p>{property.streetAddress}</p>
          </div>
          <div>
            <p>bedrooms:</p>
            <p>{property.bedrooms.toLocaleString()}</p>
          </div>
          <div>
            <p>bathrooms:</p>
            <p>{property.bathrooms.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <Link href={`/listing/edit/${property._id}`}>
        <a>
          <div className={styles.btn}>
            <button>edit</button>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ExpiredMobileListing;
