import React, { useState } from "react";
import styles from "../../styles/home.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const [name, setName] = useState<string>("");
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
            <div>
              <p>For Sale</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <input type="text" />
            <div>
              <p>Price</p>
              <IoIosArrowDown size="2rem" />
            </div>
          </div>
          <div className={styles.lower}>
            <div onClick={e => console.log("focused")}>
              <p>category</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <div>
              <p>Bedrooms</p>
              <IoIosArrowDown size="2rem" />
            </div>
            <div>
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
