import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import styles from "../../styles/listings.module.css";
import { ListingProperty } from "../listings/Listing";

interface Props {
  className?: string;
  checked: boolean;
  setCheckExpired: React.Dispatch<React.SetStateAction<boolean>>;
  property: ListingProperty;
}

const ExpiredListing: React.FC<Props> = props => {
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);
  useEffect(() => {
    props.setCheckExpired(check);
  }, [check]);
  const { property } = props;
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
      <td>{property.reference}</td>
      <td>{property._id}</td>
      <td>
        <div className={styles.img}>
          <div
            className={styles.bg_image}
            style={{ backgroundImage: `url(${property.images[0]})` }}
          ></div>
        </div>
      </td>
      <td>{property.category}</td>
      <td>{property.streetAddress}</td>
      <td>{property.price.toLocaleString()}</td>
      <td>{property.bedrooms.toLocaleString()}</td>
      <td>{property.bathrooms.toLocaleString()}</td>
      <td>{property.type}</td>
      <td>{new Date(property.expiryDate).toLocaleDateString()}</td>
      <td>{new Date(property.updatedAt).toLocaleDateString()}</td>
    </tr>
  );
};

export default ExpiredListing;
