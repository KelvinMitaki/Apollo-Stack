import React, { useEffect, useRef, useState } from "react";
import { AiFillAlert, AiOutlineSearch } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../../styles/home.module.css";
import Dropdown from "./Dropdown";

interface Props {
  alternate: boolean;
  btnContent: string;
  width: string | "fit-content";
  agent?: boolean;
  bedrooms: number[];
  bathrooms: number[];
  categories: { name: string; subCats?: boolean }[];
}

const HouseFilter: React.FC<Props> = props => {
  const [name, setName] = useState<string>("");
  const [openSub, setOpenSub] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [focus, setFocus] = useState<"min" | "max" | null>(null);
  const [input, setInput] = useState<{ min: string; max: string }>({
    min: "",
    max: ""
  });
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
    <div
      className={`${styles.search} ${
        props.alternate ? styles.search_alternate : ""
      }`}
      style={{
        width: props.width,
        ...(props.agent && {
          border: "1px solid #bebdbd"
          // borderBottom: "none"
        })
      }}
    >
      {props.alternate ? (
        <div className={styles.alternate}>
          <AiFillAlert size="3rem" />
          <p>Add Alerts</p>
        </div>
      ) : (
        <div
          className={styles.search_head}
          style={{ ...(props.agent && { display: "none" }) }}
        >
          <div>
            <AiOutlineSearch size="3rem" />
            <p>Find your home</p>
          </div>
          <div>
            <BsHouseFill size="3rem" />
            <p></p>
          </div>
        </div>
      )}
      <div className={styles.search_body}>
        <div className={styles.upper}>
          <Dropdown
            name={name}
            searchDiv={searchDiv}
            setName={setName}
            determinant={selection || "forSale"}
            title={selection || "For Sale"}
            selections={["To Rent"]}
            setSelection={setSelection}
          />
          <input type="text" placeholder="Search for a City, Town or Surbub" />
          <div
            className={`${styles.min} ${
              focus === "min" || input.min.length !== 0 ? styles.focused : ""
            }`}
          >
            <label htmlFor="min">min price</label>
            <input
              type="number"
              onBlur={() => setFocus(null)}
              onFocus={() => setFocus("min")}
              name="min"
              id="min"
              onChange={e =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              value={input.min}
            />
          </div>
          <div
            className={`${styles.max} ${
              focus === "max" || input.max.length !== 0 ? styles.focused : ""
            }`}
          >
            <label htmlFor="max">max price</label>
            <input
              type="number"
              name="max"
              id="max"
              onBlur={() => setFocus(null)}
              onFocus={() => setFocus("max")}
              onChange={e =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              value={input.max}
            />
          </div>
        </div>
        <div className={styles.lower}>
          <div
            className={name === "category" ? styles.open : styles.close}
            onClick={e => setName("category")}
          >
            <p>category</p>
            <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
            <div className={styles.dropdown}>
              {props.categories.map(cat => (
                <div
                  className={`${cat.subCats ? styles.dropdown_2 : ""} ${
                    openSub === cat.name ? styles.openSub : styles.closeSub
                  }`}
                  onClick={() => cat.subCats && setOpenSub(cat.name)}
                  key={cat.name}
                >
                  <div className={!cat.subCats ? styles.no_sub : ""}>
                    <p>{cat.name}</p>
                    {cat.subCats && <IoIosArrowDown size="2rem" />}
                  </div>
                  {cat.subCats && (
                    <div className={styles.subcats}>
                      <span>furnished</span>
                      <span>unfurnished</span>
                    </div>
                  )}
                </div>
              ))}
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
              {props.bedrooms.map(num => (
                <p className={styles.select} key={num}>
                  {num}+ {num > 1 ? "Bedrooms" : "Bedroom"}{" "}
                </p>
              ))}
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
              {props.bathrooms.map(num => (
                <p className={styles.select} key={num}>
                  {num}+ {num > 1 ? "bathrooms" : "bathroom"}
                </p>
              ))}
            </div>
          </div>
          <button>{props.btnContent}</button>
        </div>
      </div>
    </div>
  );
};

export default HouseFilter;
