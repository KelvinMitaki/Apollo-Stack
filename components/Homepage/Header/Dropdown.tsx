import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../../styles/home.module.css";

interface Props {
  searchDiv: React.RefObject<HTMLDivElement>;
  name: string;
  setName: (value: React.SetStateAction<string>) => void;
}

const Dropdown: React.FC<Props> = props => {
  const { searchDiv, setName, name } = props;
  return (
    <div>
      <div
        ref={searchDiv}
        className={name === "forSale" ? styles.open : styles.close}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          setName("forSale")
        }
      >
        <p>For Sale</p>
        <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
        <div className={styles.dropdown}>
          <p className={styles.select}>For Rent</p>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
