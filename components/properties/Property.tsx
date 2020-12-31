import Link from "next/link";
import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import styles from "../../styles/properties.module.css";

const Property = () => {
  return (
    <Link href="/property/123">
      <a>
        <div className={styles.property}>
          <div
            style={{
              backgroundImage: "url(/image-2.jpg)"
            }}
            className={styles.bg_image}
          ></div>
          <div>
            <p className={styles.fs_tr}>for sale</p>
            <p>
              starting from: <span>Ksh 3,000,000</span>
            </p>
            <div className={styles.location}>
              <ImLocation />
              <p>25th avenue, Ongata Rongai, Nairobi</p>
            </div>
            <div className={styles.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              unde repudiandae enim. Blanditiis voluptate beatae nulla. Quis
              ipsa molestias quaerat libero, at quasi ipsam nesciunt nisi eum
              odio tempore eveniet!
            </div>
            <div className={styles.p_footer}>
              <div>
                <BsArrowsMove size="2.5rem" />
                <p>780 sqft</p>
              </div>
              <div>
                <FaBed size="2.5rem" />
                <p>4 Bed Room</p>
              </div>
              <div>
                <FaBath size="2.5rem" />
                <p>3 Baths Bed</p>
              </div>
              <div>
                <FaCarAlt size="2.5rem" />
                <p>2 Garages</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Property;
