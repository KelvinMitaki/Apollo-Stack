import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FiCheck } from "react-icons/fi";
import styles from "../../styles/listings.module.css";
import { ListingProperty } from "../listings/Listing";

interface Props {
  className?: string;
  checked: boolean;
  setCheckExpired: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        type: string;
      }[]
    >
  >;
  checkExpired: {
    _id: string;
    type: string;
  }[];
  property: ListingProperty;
}

const ExpiredListing: React.FC<Props> = props => {
  const [check, setCheck] = useState<boolean>(false);
  useEffect(() => {
    setCheck(props.checked);
  }, [props.checked]);
  useEffect(() => {
    check &&
      props.setCheckExpired([
        ...props.checkExpired,
        { _id: props.property._id, type: props.property.type }
      ]);
    !check &&
      props.checkExpired.find(pr => pr._id === props.property._id) &&
      props.setCheckExpired(
        props.checkExpired.filter(pr => pr._id !== props.property._id)
      );
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
            className={`${styles.BiCheck} ${
              !!props.checkExpired.find(pr => pr._id === property._id)
                ? styles.checked
                : ""
            }`}
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
      <td>{format(new Date(property.expiryDate), "dd/MM/yyyy")}</td>
      <td>{format(new Date(property.updatedAt), "dd/MM/yyyy")}</td>
    </tr>
  );
};

export default ExpiredListing;
