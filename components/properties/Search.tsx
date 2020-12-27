import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/properties.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import RangeComponent from "../Homepage/Header/RangeComponent";

const Search = () => {
  const [name, setName] = useState<string>("");
  const [selected, setSelected] = useState<string>("buy");
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
    <div>
      <div className={styles.search}>
        <h3>Search Property</h3>
        <div className={styles.buyRent}>
          <p
            onClick={() => setSelected("buy")}
            className={selected === "buy" ? styles.selected : ""}
          >
            buy
          </p>
          <p
            onClick={() => setSelected("sell")}
            className={selected === "sell" ? styles.selected : ""}
          >
            rent
          </p>
        </div>
        <div className={styles.upper}>
          <Dropdown
            selections={["Nairobi", "Mombasa", "Nakuru", "Kisumu", "Eldoret"]}
            determinant="location"
            name={name}
            searchDiv={searchDiv}
            title="Location"
            setName={setName}
            className="d_search"
          />
        </div>
        <div className={styles.upper}>
          <Dropdown
            selections={[
              "1+ Bedroom",
              "2+ Bedrooms",
              "3+ Bedrooms",
              "4+ Bedrooms",
              "5+ Bedrooms"
            ]}
            determinant="bedrooms"
            name={name}
            searchDiv={searchDiv}
            title="No of Bedrooms"
            setName={setName}
            className="d_search"
          />
        </div>
        <div className={styles.upper}>
          <Dropdown
            selections={[
              "1+ Bathroom",
              "2+ Bathrooms",
              "3+ Bathrooms",
              "4+ Bathrooms",
              "5+ Bathrooms"
            ]}
            determinant="bathrooms"
            name={name}
            searchDiv={searchDiv}
            title="No of Bathrooms"
            setName={setName}
            className="d_search"
          />
        </div>
        <RangeComponent className="properties" />
        <button className={styles.property_btn}>Search Property</button>
      </div>
    </div>
  );
};

export default Search;
