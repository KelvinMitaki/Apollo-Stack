import React from "react";
import { AiFillAlert } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";

const ProfileSidebar = () => {
  return (
    <div>
      <div>
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
    </div>
  );
};

export default ProfileSidebar;
