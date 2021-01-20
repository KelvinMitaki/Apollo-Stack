import { QueryLazyOptions } from "@apollo/client";
import Router from "next/router";
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
  component: "header" | "expired" | "listings" | "alerts";
  setFilter?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number | boolean;
    }>
  >;
  fetchAgentProperties?: (
    options?:
      | QueryLazyOptions<{
          offset: number;
          limit: number;
        }>
      | undefined
  ) => void;
  agentPropertyCount?: (
    options?:
      | QueryLazyOptions<{
          [key: string]: string | number | boolean;
        }>
      | undefined
  ) => void;
  fetchExpiredListings?: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
  expiredListingsCount?: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
  offset?: number;
  limit?: number;
}

const HouseFilter: React.FC<Props> = props => {
  const [name, setName] = useState<string>("");
  const [openSub, setOpenSub] = useState<string>("");
  const [selection, setSelection] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bedroom, setBedroom] = useState<string>("");
  const [bathroom, setBathroom] = useState<string>("");
  const [category, setCategory] = useState<string>("");
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
  const onSubmit = () => {
    const search = {} as {
      bedrooms: number;
      bathrooms: number;
      minPrice: number;
      maxPrice: number;
      location: string;
      category: string;
      type: string;
      furnished: boolean;
    };
    if (bedroom) {
      search.bedrooms = parseInt(bedroom.split("+ ")[0]);
    }
    if (bathroom) {
      search.bathrooms = parseInt(bathroom.split("+ ")[0]);
    }
    if (category && !category.includes("FUR")) {
      search.category = category.toLowerCase();
    }
    if (category && category.split(" ")[1] === "FUR") {
      search.category = category.split(": ")[0].toLowerCase();
      search.furnished = true;
    }
    if (category && category.split(" ")[1] === "UNFUR") {
      search.category = category.split(": ")[0].toLowerCase();
      search.furnished = false;
    }
    if (input.min) {
      search.minPrice = parseInt(input.min);
    }
    if (input.max) {
      search.maxPrice = parseInt(input.max);
    }
    if (selection && selection.toLowerCase().includes("sale")) {
      search.type = "sale";
    }

    if (selection && selection.toLowerCase().includes("rent")) {
      search.type = "rent";
    }
    if (location) {
      search.location = location.toLowerCase();
    }
    if (
      search.minPrice &&
      search.maxPrice &&
      search.minPrice > search.maxPrice
    ) {
      const greaterPrice = search.minPrice;
      search.minPrice = search.maxPrice;
      search.maxPrice = greaterPrice;
    }
    let query = "";
    for (let prop in search) {
      query = query.includes("?")
        ? // @ts-ignore
          `${query}${prop}=${search[prop]}&`
        : // @ts-ignore
          `${query}?${prop}=${search[prop]}&`;
    }
    if (query[query.length - 1] === "&") {
      query = query.slice(0, -1);
    }
    if (search.type && props.component === "header") {
      Router.push(`/properties/${search.type}${query}`);
    }
    if (
      search.type &&
      props.component === "listings" &&
      props.setFilter &&
      props.fetchAgentProperties &&
      props.agentPropertyCount
    ) {
      props.setFilter(search);
      props.agentPropertyCount();
      props.fetchAgentProperties();
    }
    if (
      search.type &&
      props.component === "expired" &&
      props.fetchExpiredListings &&
      props.expiredListingsCount &&
      typeof props.offset === "number" &&
      typeof props.limit === "number"
    ) {
      props.fetchExpiredListings({
        variables: { ...search, offset: props.offset, limit: props.limit }
      });
      props.expiredListingsCount({ variables: search });
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
            title={selection || "Type"}
            selections={["For Sale", "To Rent"]}
            setSelection={setSelection}
          />
          <input
            type="text"
            placeholder="Search for a City, Town or Surbub"
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
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
          <div className={name === "category" ? styles.open : styles.close}>
            <div
              onClick={e => setName("category")}
              style={{ height: "100%", width: "100%" }}
            >
              <p>{category || "category"}</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
            </div>
            <div className={styles.dropdown}>
              {props.categories.map(cat => (
                <div
                  className={`${cat.subCats ? styles.dropdown_2 : ""} ${
                    openSub === cat.name ? styles.openSub : styles.closeSub
                  }`}
                  onClick={() => {
                    cat.subCats && setOpenSub(cat.name);
                    if (!cat.subCats) {
                      setCategory(cat.name);
                    }
                  }}
                  key={cat.name}
                >
                  <div
                    className={!cat.subCats ? styles.no_sub : ""}
                    onClick={() => cat.subCats && setName("category")}
                  >
                    <p>{cat.name}</p>
                    {cat.subCats && <IoIosArrowDown size="2rem" />}
                  </div>
                  {cat.subCats && (
                    <div className={styles.subcats}>
                      <span onClick={() => setCategory(`${cat.name}: FUR`)}>
                        furnished
                      </span>
                      <span onClick={() => setCategory(`${cat.name}: UNFUR`)}>
                        unfurnished
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={name === "bedrooms" ? styles.open : styles.close}>
            <div
              onClick={e => setName("bedrooms")}
              style={{ height: "100%", width: "100%" }}
            >
              <p>{bedroom || "Bedrooms"}</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
            </div>
            <div className={styles.dropdown}>
              {props.bedrooms.map(num => (
                <p
                  className={styles.select}
                  key={num}
                  onClick={() => {
                    setBedroom(`${num}+ ${num > 1 ? "Bedrooms" : "Bedroom"}`);
                    setName("");
                  }}
                >
                  {num}+ {num > 1 ? "Bedrooms" : "Bedroom"}{" "}
                </p>
              ))}
            </div>
          </div>
          <div className={name === "bathrooms" ? styles.open : styles.close}>
            <div
              onClick={e => setName("bathrooms")}
              style={{ height: "100%", width: "100%" }}
            >
              <p>{bathroom || "Bathrooms"}</p>
              <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
            </div>
            <div className={styles.dropdown}>
              {props.bathrooms.map(num => (
                <p
                  className={styles.select}
                  key={num}
                  onClick={() => {
                    setBathroom(
                      `${num}+ ${num > 1 ? "bathrooms" : "bathroom"}`
                    );
                    setName("");
                  }}
                >
                  {num}+ {num > 1 ? "bathrooms" : "bathroom"}
                </p>
              ))}
            </div>
          </div>
          <button onClick={onSubmit}>{props.btnContent}</button>
        </div>
      </div>
    </div>
  );
};

export default HouseFilter;
