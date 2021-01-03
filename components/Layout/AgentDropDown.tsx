import Link from "next/link";
import React from "react";
import styles from "../../styles/agentDropDown.module.css";

interface Props {
  hover: boolean;
  agentDropDownRef: React.RefObject<HTMLDivElement>;
}

const AgentDropDown: React.FC<Props> = props => {
  return (
    <div
      className={`${styles.container} ${
        props.hover ? styles.container__show : ""
      }`}
      ref={props.agentDropDownRef}
    >
      <div className={styles.layer}></div>
      <Link href="/listings">
        <a>
          <div>
            <p>listings</p>
          </div>
        </a>
      </Link>
      <div>
        <p>create a new listing</p>
      </div>
      <Link href="/expired">
        <a>
          <div>
            <p>expired listings</p>
          </div>
        </a>
      </Link>
      <div>
        <p>leads</p>
      </div>
      <div>
        <p>agents</p>
      </div>
      <div>
        <p>agency statistics</p>
      </div>
      <div>
        <p>listing statistics</p>
      </div>
      <div>
        <p>profile</p>
      </div>
    </div>
  );
};

export default AgentDropDown;
