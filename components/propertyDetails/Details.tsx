import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { PropertyDetails } from "../../pages/property/[id]";
import styles from "../../styles/propertyDetails.module.css";

const Details: React.FC<PropertyDetails> = props => {
  let slider1 = useRef(null);
  let slider2 = useRef(null);
  const [nav, setNav] = useState<{
    nav1: typeof slider1 | null;
    nav2: typeof slider2 | null;
  }>({ nav1: null, nav2: null });
  useEffect(() => {
    setNav({ nav1: slider1.current, nav2: slider2.current });
  }, []);
  return (
    <div className={styles.details}>
      <Slider ref={slider1} asNavFor={nav.nav2 as any} arrows={false}>
        {props.images.map((img, i) => (
          <div>
            <div
              style={{ backgroundImage: `url(${img})` }}
              className={styles.large_img}
              key={i}
            />
          </div>
        ))}
      </Slider>
      <Slider
        asNavFor={nav.nav1 as any}
        ref={slider2}
        slidesToShow={4}
        swipeToSlide
        focusOnSelect
        dots
        autoplay
        autoplaySpeed={5000}
        arrows={false}
      >
        {" "}
        {props.images.map((img, i) => (
          <div>
            <div
              style={{ backgroundImage: `url(${img})` }}
              className={styles.small_img}
              key={i}
            />
          </div>
        ))}
      </Slider>
      <div>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>{props.description}</p>
        </div>
        <div className={styles.table}>
          <div className={styles.table_title}>
            <h5>Overview</h5>
          </div>
          <div className={styles.table_body}>
            <div>
              <p>Price</p>
              <p>Ksh {props.price.toLocaleString()}</p>
            </div>
            <div>
              <p>Property Type</p>
              <p>{props.category}</p>
            </div>
            <div>
              <p>Year Built</p>
              <p>{new Date(props.createdAt).getFullYear()}</p>
            </div>
            <div>
              <p>Bathrooms</p>
              <p>{props.bathrooms.toLocaleString()}</p>
            </div>
            <div>
              <p>Rooms</p>
              <p>12</p>
            </div>
            <div>
              <p>Parking Lots</p>
              <p>{props.parkingLots.toLocaleString()}</p>
            </div>
            <div>
              <p>Lot Area</p>
              <p>
                {props.lotArea.toLocaleString()} m<sup>2</sup>
              </p>
            </div>
            <div>
              <p>Agent</p>
              <p>
                {props.agent.firstName} {props.agent.lastName}
              </p>
            </div>
            <div>
              <p>Listing Number</p>
              <p>{props._id}</p>
            </div>
            <div>
              <p>Contract Type</p>
              <p>{props.type}</p>
            </div>
            <div>
              <p>Beds</p>
              <p>{props.bedrooms.toLocaleString()}</p>
            </div>
            <div>
              <p>Garages</p>
              <p>2</p>
            </div>
            <div>
              <p>Garage Size</p>
              <p>200 sqft</p>
            </div>
            <div>
              <p>Plinth Area</p>
              <p>
                {props.plinthArea.toLocaleString()} m<sup>2</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
