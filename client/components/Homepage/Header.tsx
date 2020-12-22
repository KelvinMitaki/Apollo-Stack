import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/home.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const [name, setName] = useState<string>("");
  const searchDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (searchDiv.current && !searchDiv.current.contains(e.target)) {
      setName("");
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.search}>
        <div className={styles.search_head}>
          <div>
            <AiOutlineSearch size="3rem" />
            <p>Find your home</p>
          </div>
          <div>
            <BsHouseFill size="3rem" />
            <p>House for sell</p>
          </div>
        </div>
        <div className={styles.search_body}>
          <div className={styles.upper}>
            <div
              ref={searchDiv}
              className={name === "forSale" ? styles.open : styles.close}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                setName("forSale")
              }
            >
              <p>For Sale</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <input type="text" />
            <div
              ref={searchDiv}
              className={name === "price" ? styles.open : styles.close}
              onClick={e => setName("price")}
            >
              <p>Price</p>
              <IoIosArrowDown size="2rem" />
            </div>
          </div>
          <div className={styles.lower}>
            <div
              className={name === "category" ? styles.open : styles.close}
              onClick={e => setName("category")}
            >
              <p>category</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <div
              ref={searchDiv}
              className={name === "bedrooms" ? styles.open : styles.close}
              onClick={e => setName("bedrooms")}
            >
              <p>Bedrooms</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <div
              ref={searchDiv}
              className={name === "bathrooms" ? styles.open : styles.close}
              onClick={e => setName("bathrooms")}
            >
              <p>Bathrooms</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
