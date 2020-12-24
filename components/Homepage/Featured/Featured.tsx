import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../../../styles/Featured.module.css";
import Card from "./Card";
import Slider from "react-slick";

const Featured = () => {
  const [num, setNum] = useState<number | null>(null);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      window.addEventListener("resize", resize);
      resize();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }, []);
  }
  const resize = () => {
    if (window.innerWidth < 600 && num !== 2) {
      setNum(1);
    }
    if (window.innerWidth < 1000 && window.innerWidth > 600 && num !== 2) {
      setNum(2);
    }
    if (window.innerWidth > 1000 && num !== 3) {
      setNum(3);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Listing from our agents</span>
        <h3>featured properties</h3>
        <div></div>
      </div>
      <Slider
        slidesToShow={num || 3}
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
