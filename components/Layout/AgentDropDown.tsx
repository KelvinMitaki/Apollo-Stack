import React from "react";
import styles from "../../styles/agentDropDown.module.css";

const AgentDropDown = () => {
  return (
    <div className={styles.container}>
      <div>
        <p>listings</p>
      </div>
      <div>
        <p>create a new listing</p>
      </div>
      <div>
        <p>expired listings</p>
      </div>
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
