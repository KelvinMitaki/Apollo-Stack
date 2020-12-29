import React, { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import styles from "../../styles/profile.module.css";
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
          <div>
            <AiFillAlert />
            <p>Alerts</p>
          </div>
        </a>
      </Link>
      <Link href="/profile/favorites">
        <a>
          <div>
            <MdFavorite />
            <p>Favorites</p>
          </div>
        </a>
      </Link>
      <Link href="/profile/agent">
        <a>
          <div>
            <RiAdminFill />
            <p>Agent Zone</p>
          </div>
        </a>
      </Link>
      <div>
        <IoMdLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
