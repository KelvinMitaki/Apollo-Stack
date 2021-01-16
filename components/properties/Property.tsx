import Link from "next/link";
import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { FaBath, FaBed, FaCarAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import styles from "../../styles/properties.module.css";
import { Properties } from "./Properties";

interface Props {
  property: Properties;
}

const Property: React.FC<Props> = props => {
  const formatDescription = (desc: string): string => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 400) {
        return `${desc.slice(0, 100)}...`;
      }
      if (window.innerWidth < 700) {
        return `${desc.slice(0, 150)}...`;
      }
      return `${desc.slice(0, 200)}...`;
    }
    return `${desc.slice(0, 200)}...`;
  };
  const { property } = props;
  return (
    <Link href={`/property/${property._id}`}>
      <a>
        <div className={styles.property}>
          <div
            style={{
              backgroundImage: `url(${property.images[0]})`
            }}
            className={styles.bg_image}
          ></div>
          <div>
            {property.type === "sale" ? (
              <p className={styles.fs_tr}>for sale</p>
            ) : (
              <p className={styles.fs_tr}>to rent</p>
            )}
            <p>
              starting from: <span>Ksh {property.price.toLocaleString()}</span>
            </p>
            <div className={styles.location}>
              <ImLocation />
              <p>
                {property.streetAddress}, {property.location}
              </p>
            </div>
            <div className={styles.description}>
              {formatDescription(property.description)}
            </div>
            <div className={styles.p_footer}>
              <div>
                <BsArrowsMove size="2.5rem" />
                {property.plinthArea ? (
                  <p>
                    {property.plinthArea.toLocaleString()} m<sup>2</sup>{" "}
                  </p>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <FaBed size="2.5rem" />
                <p>{property.bedrooms.toLocaleString()} Bed Room</p>
              </div>
              <div>
                <FaBath size="2.5rem" />
                <p>{property.bathrooms.toLocaleString()} Baths Bed</p>
              </div>
              <div>
                <FaCarAlt size="2.5rem" />
                {property.parkingLots ? (
                  <p>
                    {property.parkingLots.toLocaleString()} Parking{" "}
                    {property.parkingLots > 1 ? "Lots" : "Lot"}
                  </p>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Property;
