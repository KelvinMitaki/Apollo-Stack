import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/types/types";
import { Redux } from "../../interfaces/Redux";
import { ToggleLoginHeader } from "../RegisterLogin/RegisterLoginModal";
import { SetToggleNavbar, SetToggleLogin } from "./Layout";
import AgentDropDown from "./AgentDropDown";
import { useQuery } from "@apollo/client";
import { FETCH_CURRENT_USER } from "../../graphql/queries/queries";

interface Props {
  toggleRef: React.RefObject<HTMLDivElement>;
}

const LayoutHeader: React.FC<Props> = props => {
  const { data } = useQuery(FETCH_CURRENT_USER, {
    fetchPolicy: "cache-only"
  });
  const [hover, setHover] = useState<boolean>(false);
  const [saleHover, setSaleHover] = useState<boolean>(false);
  const [rentHover, setRentHover] = useState<boolean>(false);
  const agentDropDownRef = useRef<HTMLDivElement>(null);
  const saleDropDownRef = useRef<HTMLDivElement>(null);
  const rentDropDownRef = useRef<HTMLDivElement>(null);
  const toggleNavbar = useSelector(
    (state: Redux) => state.styling.toggleNavbar
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("mouseover", onHover);
    return () => {
      document.removeEventListener("mouseover", onHover);
    };
  }, []);
  const onHover = (e: Event) => {
    if (
      agentDropDownRef.current &&
      // @ts-ignore
      !agentDropDownRef.current.contains(e.target)
    ) {
      setHover(false);
    }
    if (
      saleDropDownRef.current &&
      // @ts-ignore
      !saleDropDownRef.current.contains(e.target)
    ) {
      setSaleHover(false);
    }
    if (
      rentDropDownRef.current &&
      // @ts-ignore
      !rentDropDownRef.current.contains(e.target)
    ) {
      setRentHover(false);
    }
  };
  const { toggleRef } = props;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo_prt}>
          <div className={styles.logo}>
            <Link href="/">
              <a>
                <p>property domain</p>
              </a>
            </Link>
          </div>
        </div>
        <div
          className={`${styles.opts} ${
            data.currentUser ? styles.currentUser : ""
          } ${
            data.currentUser && data.currentUser.isAgent ? styles.isAgent : ""
          }`}
        >
          {data.currentUser && data.currentUser.isAgent && (
            <div
              className={styles.opts_item}
              ref={agentDropDownRef}
              onMouseOver={() => setHover(true)}
            >
              <p>agent</p>
              <AgentDropDown
                hover={hover}
                agentDropDownRef={agentDropDownRef}
                content={[
                  { name: "listings", link: "/listings" },
                  { name: "create a new listing", link: "/listing/new" },
                  { name: "expired listings", link: "/expired" },
                  { name: "leads", link: "/leads" },
                  { name: "agency statistics", link: "/agency/statistics" },
                  { name: "listing statistics", link: "/listing/statistics" },
                  { name: "profile", link: "/profile/edit" }
                ]}
              />
            </div>
          )}
          <Link href="/properties/sale">
            <a>
              <div className={styles.opts_item}>
                <p>for sale</p>
              </div>
            </a>
          </Link>
          <Link href="/properties/rent">
            <a>
              <div className={styles.opts_item}>
                <p>to rent</p>
              </div>
            </a>
          </Link>
          {/* <Link href="/properties/123">
            <a>
              <div className={styles.opts_item}>
                <p>developments</p>
              </div>
            </a>
          </Link> */}
          <Link href="/properties/furnished">
            <a>
              <div className={styles.opts_item}>
                <p>furnished</p>
              </div>
            </a>
          </Link>{" "}
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
            <Link href="/profile/edit">
              <a>
                <div className={styles.opts_item}>
                  <p>profile</p>
                </div>
              </a>
            </Link>
          )}
        </div>
        <div
          className={styles.sidebar_toggle}
          onClick={() => {
            dispatch<SetToggleNavbar>({
              type: ActionTypes.toggleNavbar,
              payload: !toggleNavbar
            });
          }}
          ref={toggleRef}
        >
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
