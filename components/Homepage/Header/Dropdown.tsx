import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../../styles/home.module.css";

interface Props {
  searchDiv: React.RefObject<HTMLDivElement>;
  name: string;
  setName: (value: React.SetStateAction<string>) => void;
  determinant: string;
  title: string;
  selections: string[];
  className?: string;
}

const Dropdown: React.FC<Props> = props => {
  const {
    searchDiv,
    setName,
    name,
    determinant,
    title,
    selections,
    className
  } = props;

  return (
    <div
      ref={searchDiv}
      className={`${name === determinant ? styles.open : styles.close} ${
        className ? styles[className] : ""
      }`}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        setName(determinant)
      }
    >
      <p>{title}</p>
      <IoIosArrowDown size="2rem" className={styles.IoIosArrowDown} />
      <div className={styles.dropdown}>
        {selections.map(slctn => (
          <p key={slctn} className={styles.select}>
            {slctn}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
