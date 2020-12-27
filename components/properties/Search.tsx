import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/properties.module.css";
import Dropdown from "../Homepage/Header/Dropdown";

const Search = () => {
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
        title="Bedrooms"
        setName={setName}
        className="d_search"
      />
    </div>
  );
};

export default Search;
