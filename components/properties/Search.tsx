import { LazyQueryResult, QueryLazyOptions } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FetchType } from "../../pages/properties/[property]";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/properties.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import Loading from "../loading/Loading";

interface Props {
  loading: boolean;
  args: LazyQueryResult<any, Record<string, any>>;
  searchProperty: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
  fetchPropertiesCount: (
    options?: QueryLazyOptions<Record<string, any>> | undefined
  ) => void;
}

const Search: React.FC<Props> = props => {
  const { loading, args, searchProperty, fetchPropertiesCount } = props;
  const [name, setName] = useState<string>("");
  const [selected, setSelected] = useState<string>("buy");
  const [citySelection, setCitySelection] = useState<string>("");
  const [bedroomSelection, setBedroomSelection] = useState<string>("");
  const [bathroomSelection, setBathroomSelection] = useState<string>("");
  const [focus, setFocus] = useState<"min" | "max" | null>(null);
  const [input, setInput] = useState<{ min: string; max: string }>({
    min: "",
    max: ""
  });
  const dispatch = useDispatch();
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
  const onSubmit = async () => {
    const search = {} as {
      bedrooms: number;
      bathrooms: number;
      minPrice: number;
      maxPrice: number;
      location: string;
      type: string;
    };
    if (bedroomSelection) {
      search.bedrooms = parseInt(bedroomSelection.split("+ ")[0]);
    }
    if (bathroomSelection) {
      search.bathrooms = parseInt(bathroomSelection.split("+ ")[0]);
    }
    if (input.min) {
      search.minPrice = parseInt(input.min);
    }
    if (input.max) {
      search.maxPrice = parseInt(input.max);
    }
    if (selected) {
      search.type = selected;
    }
    if (citySelection) {
      search.location = citySelection;
    }
    if (
      search.maxPrice &&
      search.minPrice &&
      search.minPrice > search.maxPrice
    ) {
      const greaterPrice = search.minPrice;
      search.minPrice = search.maxPrice;
      search.maxPrice = greaterPrice;
    }
    if (search.type === "buy") {
      search.type = "sale";
    }
    if (search.type === "sell") {
      search.type = "rent";
    }
    fetchPropertiesCount({ variables: search });
    searchProperty({ variables: { ...search, offset: 0, limit: 10 } });
  };
  return (
    <div>
      {(loading || args.loading) && <Loading />}
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
            determinant={citySelection || "location"}
            name={name}
            searchDiv={searchDiv}
            title={citySelection || "Location"}
            setName={setName}
            className="d_search"
            setSelection={setCitySelection}
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
            determinant={bedroomSelection || "bedrooms"}
            name={name}
            searchDiv={searchDiv}
            title={bedroomSelection || "No of Bedrooms"}
            setName={setName}
            className="d_search"
            setSelection={setBedroomSelection}
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
            determinant={bathroomSelection || "bathrooms"}
            name={name}
            searchDiv={searchDiv}
            title={bathroomSelection || "No of Bathrooms"}
            setName={setName}
            className="d_search"
            setSelection={setBathroomSelection}
          />
        </div>
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
        <button
          className={styles.property_btn}
          type="submit"
          onClick={() => {
            dispatch<FetchType>({
              type: ActionTypes.fetchType,
              payload: "sidebar"
            });
            onSubmit();
          }}
        >
          Search Property
        </button>
      </div>
    </div>
  );
};

export default Search;
