import React, { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import styles from "../../styles/edit.module.css";
import Router from "next/router";
import { RiAdminFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import Link from "next/link";

const ProfileSidebar = () => {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    setActive(Router.pathname);
  }, []);

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
          document.cookie = `token=; Path=/; Expires=${new Date()}`;
          window.location.reload();
        }}
      >
        <IoMdLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
