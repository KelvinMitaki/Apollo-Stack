import React from "react";
import styles from "../../../styles/Featured.module.css";
import { ImLocation } from "react-icons/im";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";

interface Props {
  property: FeaturedProp;
}
export interface FeaturedProp {
  images: string;
  type: string;
  category: string;
  agent: {
    firstName: string;
    lastName: string;
  };
  price: number;
  parkingLots: number;
  plinthArea: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  streetAddress: string;
}
const Card: React.FC<Props> = ({
  property: {
    images,
    type,
    category,
    agent: { firstName, lastName },
    price,
    parkingLots,
    plinthArea,
    bedrooms,
    bathrooms,
    location,
    streetAddress
  }
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <div
          style={{
            backgroundImage: `url(${images[0]})`
          }}
          className={styles.image}
        />
        <div className={styles.f_s}>
          <p>feature</p>
          <p>{type === "sale" ? "for sale" : "to rent"}</p>
        </div>
        <div className={styles.avatar}>
          <img src="/image-1.jpeg" alt="" />
          <h5>
            {firstName} {lastName}
          </h5>
        </div>
      </div>
      <div className={styles.card_body}>
        <h4>{category}</h4>
        <div>
          <ImLocation />
          <p>
            {streetAddress}, {location}
          </p>
        </div>
        <p>From Ksh {price.toLocaleString()}</p>
      </div>
      <div className={styles.card_footer}>
        <div>
          <BsArrowsMove size="3rem" />
          <p style={{ textTransform: "none" }}>
            {plinthArea?.toLocaleString()} m<sup>2</sup>{" "}
          </p>
        </div>
        <div>
          <FaBed />
          <p>{bedrooms.toLocaleString()}</p>
        </div>
        <div>
          <FaBath />
          <p>{bathrooms.toLocaleString()}</p>
        </div>
        <div>
          <FaCarAlt />
          <p>{parkingLots?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
