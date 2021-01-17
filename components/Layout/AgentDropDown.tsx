import Link from "next/link";
import React from "react";
import styles from "../../styles/agentDropDown.module.css";

interface Props {
  hover: boolean;
  agentDropDownRef: React.RefObject<HTMLDivElement>;
  content: { name: string; link: string }[];
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
      {props.content.map(ctnt => (
        <Link href={ctnt.link}>
          <a>
            <div>
              <p>{ctnt.name}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default AgentDropDown;
