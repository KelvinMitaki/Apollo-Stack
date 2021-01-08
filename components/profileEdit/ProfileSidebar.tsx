import React, { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import styles from "../../styles/edit.module.css";
import Router from "next/router";
import { RiAdminFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";
import { LOGOUT_USER } from "../../graphql/queries/queries";
import { useLazyQuery } from "@apollo/client";

const ProfileSidebar = () => {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    setActive(Router.pathname);
  }, []);
  const [logoutUser, { called }] = useLazyQuery(LOGOUT_USER, {
    onCompleted() {
      window.location.reload();
    }
  });
  return (
    <div className={styles.sidebar}>
      <Link href="/profile/edit">
        <a>
          <div className={active === "/profile/edit" ? styles.active : ""}>
            <FiEdit />
            <p>Edit Profile</p>
          </div>
        </a>
      </Link>
      <Link href="/profile/alerts">
        <a>
          <div className={active === "/profile/alerts" ? styles.active : ""}>
            <AiFillAlert />
            <p>Alerts</p>
          </div>
        </a>
      </Link>
      <Link href="/profile/favorites">
        <a>
          <div className={active === "/profile/favorites" ? styles.active : ""}>
            <MdFavorite />
            <p>Favorites</p>
          </div>
        </a>
      </Link>
      <Link href="/profile/agent">
        <a>
          <div className={active === "/profile/agent" ? styles.active : ""}>
            <RiAdminFill />
            <p>Agent Zone</p>
          </div>
        </a>
      </Link>
      <div
        onClick={() => {
          if (process.env.NODE_ENV === "production") {
            document.cookie = `token=; Path=/; Expires=${new Date()}`;
          }
          if (!called) {
            logoutUser();
          }
        }}
      >
        <IoMdLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
