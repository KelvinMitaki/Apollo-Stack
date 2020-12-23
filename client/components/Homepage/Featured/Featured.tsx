import React from "react";
import styles from "../../../styles/Featured.module.css";
import { ImLocation } from "react-icons/im";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";

const Featured = () => {
  return (
    <div className={styles.container}>
      <p>Listing from our agents</p>
      <h3>featured properties</h3>
      <div></div>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <img src="/image-2" alt="" />
          <p>feature</p>
          <p>for sale</p>
          <img src="/image-1" alt="" />
          <h5>Kelvin Mitaki</h5>
        </div>
        <div className={styles.card_body}>
          <h4>french villa</h4>
          <div>
            <ImLocation />
            180 New Stret, Nairobi, KE
          </div>
          <p>From 20,000,000</p>
        </div>
        <div className={styles.card_footer}>
          <div>
            <BsArrowsMove />
            <p>780 sqft</p>
          </div>
          <div>
            <FaBed />
            <p>4</p>
          </div>
          <div>
            <FaBath />
            <p>3</p>
          </div>
          <div>
            <FaCarAlt />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
