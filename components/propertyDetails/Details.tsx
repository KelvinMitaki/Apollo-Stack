import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import styles from "../../styles/propertyDetails.module.css";

const Details = () => {
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
    <div>
      <Slider ref={slider1} asNavFor={nav.nav2 as any} arrows={false}>
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.large_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.large_img}
          />
        </div>
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
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-1.jpeg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-2.jpg)" }}
            className={styles.small_img}
          />
        </div>
        <div>
          <div
            style={{ backgroundImage: "url(/image-3.jpg)" }}
            className={styles.small_img}
          />
        </div>
      </Slider>
      <div>
        <div>
          <h4>Description</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            cumque. Accusamus ex laudantium inventore aliquid, at autem eveniet
            consequatur incidunt totam mollitia, in rem similique dignissimos
            non modi dolorum id nisi aliquam temporibus nostrum. Totam velit
            mollitia natus aut nam sapiente minima reiciendis! Temporibus
            inventore numquam molestias delectus repudiandae magnam.
          </p>
        </div>
        <div className={styles.table}>
          <div className={styles.table_title}>
            <h5>Overview</h5>
          </div>
          <div className={styles.table_body}>
            <div>
              <p>Price</p>
              <p>Ksh 2,000,000</p>
            </div>
            <div>
              <p>Property Type</p>
              <p>Appartment</p>
            </div>
            <div>
              <p>Year Built</p>
              <p>2020</p>
            </div>
            <div>
              <p>Bathrooms</p>
              <p>3</p>
            </div>
            <div>
              <p>Rooms</p>
              <p>12</p>
            </div>
            <div>
              <p>Parking Lots</p>
              <p>3</p>
            </div>
            <div>
              <p>Lot Area</p>
              <p>200 sqft</p>
            </div>
            <div>
              <p>Agent</p>
              <p>John Doe</p>
            </div>
            <div>
              <p>Listing Number</p>
              <p>12345678</p>
            </div>
            <div>
              <p>Contract Type</p>
              <p>Sale</p>
            </div>
            <div>
              <p>Beds</p>
              <p>4</p>
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
              <p>Home Area</p>
              <p>1200 sqft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
