import Link from "next/link";
import React from "react";
import styles from "../../../styles/Layout.module.css";

interface Props {
  setAgentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  agentSidebar: boolean;
}

const AgentSidebar: React.FC<Props> = props => {
  return (
    <div className={styles.AgentSidebar}>
      <Link href="/listings">
        <a>
          <div>
            <p>listings</p>
          </div>
        </a>
      </Link>
      <Link href="/listing/new">
        <a>
          <div>
            <p>create a new listing</p>
          </div>
        </a>
      </Link>
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
      <Link href="/profile/edit">
        <a>
          <div>
            <p>profile</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default AgentSidebar;
