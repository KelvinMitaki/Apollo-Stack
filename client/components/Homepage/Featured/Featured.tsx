import React from "react";
import styles from "../../../styles/Featured.module.css";
import { ImLocation } from "react-icons/im";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Listing from our agents</span>
        <h3>featured properties</h3>
        <div></div>
      </div>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <div
            style={{
              backgroundImage: "url(/image-2.jpg)"
            }}
            className={styles.image}
          />
          <div className={styles.f_s}>
            <p>feature</p>
            <p>for sale</p>
          </div>
          <div className={styles.avatar}>
            <img src="/image-1.jpeg" alt="" />
            <h5>Kelvin Mitaki</h5>
          </div>
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
            <BsArrowsMove size="3rem" />
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
