import Link from "next/link";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../redux/types/types";
import styles from "../../../styles/Layout.module.css";
import { SetToggleNavbar } from "../../Layout/Layout";

interface Props {
  setAgentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  agentSidebar: boolean;
}

const AgentSidebar: React.FC<Props> = props => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${styles.AgentSidebar} ${
        props.agentSidebar ? styles.agentSidebar__show : ""
      }`}
    >
      <div onClick={() => props.setAgentSidebar(false)}>
        <div className={styles.BsArrowLeft}>
          <BsArrowLeft size="3rem" />
          <p>back</p>
        </div>
      </div>
      <Link href="/listings">
        <a>
          <div
            onClick={() => {
              dispatch<SetToggleNavbar>({
                type: ActionTypes.toggleNavbar,
                payload: false
              });
            }}
          >
            <p>listings</p>
          </div>
        </a>
      </Link>
      <Link href="/listing/new">
        <a>
          <div
            onClick={() => {
              dispatch<SetToggleNavbar>({
                type: ActionTypes.toggleNavbar,
                payload: false
              });
            }}
          >
            <p>create a new listing</p>
          </div>
        </a>
      </Link>
      <Link href="/expired">
        <a>
          <div
            onClick={() => {
              dispatch<SetToggleNavbar>({
                type: ActionTypes.toggleNavbar,
                payload: false
              });
            }}
          >
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
          <div
            onClick={() => {
              dispatch<SetToggleNavbar>({
                type: ActionTypes.toggleNavbar,
                payload: false
              });
            }}
          >
            <p>profile</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default AgentSidebar;
