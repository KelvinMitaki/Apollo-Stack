import React from "react";
import styles from "../../../styles/Featured.module.css";
import Card from "./Card";
import Slider from "react-slick";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Listing from our agents</span>
        <h3>featured properties</h3>
        <div></div>
      </div>
      <Slider
        slidesToShow={3}
        slidesToScroll={1}
        autoplay
        autoplaySpeed={5000}
        dots
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </Slider>
    </div>
  );
};

export default Featured;
