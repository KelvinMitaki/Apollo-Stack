import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/home.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import RangeComponent from "./RangeComponent";
import Dropdown from "./Dropdown";

const Header = () => {
  const [name, setName] = useState<string>("");
  const [openSub, setOpenSub] = useState<string>("");
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
            <Dropdown
              name={name}
              searchDiv={searchDiv}
              setName={setName}
              determinant="forSale"
              title="For Sale"
              selections={["For Rent"]}
            />
            <input
              type="text"
              placeholder="Search for a City, Town or Surbub"
            />
            <RangeComponent />
          </div>
          <div className={styles.lower}>
            <div
              className={name === "category" ? styles.open : styles.close}
              onClick={e => setName("category")}
            >
              <p>category</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
              <div className={styles.dropdown}>
                <div
                  className={`${styles.dropdown_2} ${
                    openSub === "Apartment" ? styles.openSub : styles.closeSub
                  }`}
                  onClick={() => setOpenSub("Apartment")}
                >
                  <div>
                    <p>Apartment</p>
                    <IoIosArrowDown size="2rem" />
                  </div>
                  <div className={styles.subcats}>
                    <span>furnished</span>
                    <span>unfurnished</span>
                  </div>
                </div>
                <div
                  className={`${styles.dropdown_2} ${
                    openSub === "House" ? styles.openSub : styles.closeSub
                  }`}
                  onClick={() => setOpenSub("House")}
                >
                  <div>
                    <p>House</p>
                    <IoIosArrowDown size="2rem" />
                  </div>
                  <div className={styles.subcats}>
                    <span>furnished</span>
                    <span>unfurnished</span>
                  </div>
                </div>
                <div
                  className={`${styles.dropdown_2} ${
                    openSub === "Townhouse" ? styles.openSub : styles.closeSub
                  }`}
                  onClick={() => setOpenSub("Townhouse")}
                >
                  <div>
                    <p>Townhouse</p>
                    <IoIosArrowDown size="2rem" />
                  </div>
                  <div className={styles.subcats}>
                    <span>furnished</span>
                    <span>unfurnished</span>
                  </div>
                </div>
                <div className={styles.select}>
                  <p>Vacant Land</p>
                </div>
                <div className={styles.select}>
                  <p>Farm</p>
                </div>
                <div className={styles.select}>
                  <p>Commercial</p>
                </div>
                <div className={styles.select}>
                  <p>industrial</p>
                </div>
              </div>
            </div>
            <div
              ref={searchDiv}
              className={name === "bedrooms" ? styles.open : styles.close}
              onClick={e => setName("bedrooms")}
            >
              <p>Bedrooms</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
              <div className={styles.dropdown}>
                <p className={styles.select}>1+ Bedroom</p>
                <p className={styles.select}>2+ Bedrooms</p>
                <p className={styles.select}>3+ Bedrooms</p>
                <p className={styles.select}>4+ Bedrooms</p>
                <p className={styles.select}>5+ Bedrooms</p>
              </div>
            </div>
            <div
              ref={searchDiv}
              className={name === "bathrooms" ? styles.open : styles.close}
              onClick={e => setName("bathrooms")}
            >
              <p>Bathrooms</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
              <div className={styles.dropdown}>
                <p className={styles.select}>1+ bathroom</p>
                <p className={styles.select}>2+ bathrooms</p>
                <p className={styles.select}>3+ bathrooms</p>
                <p className={styles.select}>4+ bathrooms</p>
                <p className={styles.select}>5+ bathrooms</p>
              </div>
            </div>
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
