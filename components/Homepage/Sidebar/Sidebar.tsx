import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Redux } from "../../../interfaces/Redux";
import { ActionTypes } from "../../../redux/types/types";
import styles from "../../../styles/Layout.module.css";
import { SetToggleLogin, SetToggleNavbar } from "../../Layout/Layout";
import { ToggleLoginHeader } from "../../RegisterLogin/RegisterLoginModal";
import { BsArrowRight } from "react-icons/bs";
import AgentSidebar from "./AgentSidebar";
import {
  FETCH_CURRENT_USER,
  LOGOUT_USER
} from "../../../graphql/queries/queries";
import { useLazyQuery, useQuery } from "@apollo/client";

interface Props {
  toggleRef: React.RefObject<HTMLDivElement>;
}

const Sidebar: React.FC<Props> = props => {
  const { data } = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  const [logoutUser, { called }] = useLazyQuery(LOGOUT_USER, {
    onCompleted() {
      window.location.reload();
    }
  });
  const [agentSidebar, setAgentSidebar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toggleNavbar = useSelector(
    (state: Redux) => state.styling.toggleNavbar
  );
  return (
    <div
      className={`${styles.sidebar} ${
        toggleNavbar ? styles.sidebar_show : styles.sidebar_hide
      }`}
      ref={props.toggleRef}
    >
      <div className={styles.sidebar_header}>
        <h3>property domain</h3>
        <MdCancel
          size="3rem"
          onClick={() =>
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            })
          }
        />
      </div>
      <div
        className={`${styles.sidebar_body} ${
          agentSidebar ? styles.agentSidebar__show : ""
        }`}
      >
        {data.currentUser && data.currentUser.isAgent && (
          <>
            <AgentSidebar
              setAgentSidebar={setAgentSidebar}
              agentSidebar={agentSidebar}
            />
            <div
              className={styles.opts_item}
              onClick={() => setAgentSidebar(true)}
            >
              <div className={styles.toggle_agent}>
                <p>agent</p>
                <BsArrowRight size="3rem" />
              </div>
            </div>
          </>
        )}
        <div
          className={styles.opts_item}
          onClick={() => {
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            });
          }}
        >
          <Link href="/properties/123">
            <a>
              <p>for sale</p>
            </a>
          </Link>
        </div>
        <div
          className={styles.opts_item}
          onClick={() => {
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            });
          }}
        >
          <Link href="/properties/123">
            <a>
              <p>to rent</p>
            </a>
          </Link>
        </div>
        <div
          className={styles.opts_item}
          onClick={() => {
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            });
          }}
        >
          <Link href="/properties/123">
            <a>
              <p>developments</p>
            </a>
          </Link>
        </div>
        <div
          className={styles.opts_item}
          onClick={() => {
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: false
            });
          }}
        >
          <Link href="/properties/123">
            <a>
              <p>furnished</p>
            </a>
          </Link>
        </div>
        {!data.currentUser ? (
          <>
            <div
              className={styles.opts_item}
              onClick={() => {
                dispatch<SetToggleNavbar>({
                  type: ActionTypes.toggleNavbar,
                  payload: false
                });
                dispatch<SetToggleLogin>({
                  type: ActionTypes.toggleLogin,
                  payload: true
                });
                dispatch<ToggleLoginHeader>({
                  type: ActionTypes.toggleLoginHeader,
                  payload: "login"
                });
              }}
            >
              <p>login</p>
            </div>
            <div
              className={styles.opts_item}
              onClick={() => {
                dispatch<SetToggleNavbar>({
                  type: ActionTypes.toggleNavbar,
                  payload: false
                });
                dispatch<SetToggleLogin>({
                  type: ActionTypes.toggleLogin,
                  payload: true
                });
                dispatch<ToggleLoginHeader>({
                  type: ActionTypes.toggleLoginHeader,
                  payload: "register"
                });
              }}
            >
              <p>register</p>
            </div>
          </>
        ) : (
          <>
            <Link href="/profile/edit">
              <a
                onClick={() =>
                  dispatch<SetToggleNavbar>({
                    type: ActionTypes.toggleNavbar,
                    payload: false
                  })
                }
              >
                <div className={`${styles.opts_item} ${styles.profile}`}>
                  <p>profile</p>
                </div>
              </a>
            </Link>

            <div
              className={`${styles.opts_item} ${styles.profile}`}
              onClick={() => {
                document.cookie = `client_token=; Path=/; Expires=${new Date()}`;
                if (!called) {
                  logoutUser();
                }
              }}
            >
              <p>logout</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
