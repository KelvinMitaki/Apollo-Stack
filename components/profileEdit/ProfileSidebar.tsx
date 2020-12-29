import React, { useEffect, useState } from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import styles from "../../styles/profile.module.css";
import Router from "next/router";
import { RiAdminFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

const ProfileSidebar = () => {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    setActive(Router.pathname);
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={active === "/profile/edit" ? styles.active : ""}>
        <FiEdit />
        <p>Edit Profile</p>
      </div>
      <div>
        <AiFillAlert />
        <p>Alerts</p>
      </div>
      <div>
        <MdFavorite />
        <p>Favorites</p>
      </div>
      <div>
        <RiAdminFill />
        <p>Agent Zone</p>
      </div>
      <div>
        <IoMdLogOut />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
