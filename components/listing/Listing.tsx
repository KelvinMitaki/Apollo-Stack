import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { HeaderType, PropertyFormValues } from "../../pages/listing/new";
import styles from "../../styles/listingEdit.module.css";
import Dropdown from "../Homepage/Header/Dropdown";
import Input from "../RegisterLogin/Input";

type Option = "sale" | "rent";
interface Props extends InjectedFormProps<PropertyFormValues> {
  active: HeaderType;
}
const Listing: React.FC<Props> = props => {
  const [name, setName] = useState<string>("");
  const [option, setOption] = useState<Option>("sale");
  const searchDiv = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (Router.pathname.includes("edit")) {
      setEdit(true);
    } else {
      setEdit(false);
    }
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
      className={`${styles.Listing} ${
        props.active === "listing" ? styles.active_header : ""
      }`}
    >
      <div>
        {!edit && (
          <div>
            <div
              className={`${styles.option} ${
                option === "sale" ? styles.active_rb : ""
              }`}
              onClick={() => setOption("sale")}
            >
              <div>
                <span></span>
              </div>
              <p>for sale</p>
            </div>
            <div
              className={`${styles.option} ${
                option === "rent" ? styles.active_rb : ""
              }`}
              onClick={() => setOption("rent")}
            >
              <div>
                <span></span>
              </div>
              <p>to rent</p>
            </div>
          </div>
        )}
        {edit && (
          <div>
            <Field
              component={Input}
              label="List No"
              type="text"
              name="listNo"
              disabled
            />
          </div>
        )}
        <div>
          <Field
            component={Input}
            label="Reference"
            type="text"
            name="reference"
          />
        </div>
        <div style={{ cursor: "pointer", width: "90%" }}>
          <Dropdown
            selections={[
              "apartment ",
              "house ",
              "townhouse",
              "vacant land",
              "farm",
              "commercial",
              "industrial"
            ]}
            determinant="category"
            name={name}
            searchDiv={searchDiv}
            title="Category"
            setName={setName}
            className="d_search"
          />
        </div>
        <div>
          <Field
            component={Input}
            label="Location"
            type="text"
            name="location"
          />
        </div>
        <div>
          <Field
            component={Input}
            label="Street Address"
            type="text"
            name="streetAddress"
          />
        </div>
      </div>
    </div>
  );
};

export default Listing;
