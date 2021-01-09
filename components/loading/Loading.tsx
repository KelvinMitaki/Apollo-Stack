import React from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/loading.module.css";
import { SetToggleLogin } from "../Layout/Layout";

const Loading = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.container}
      onClick={() =>
        dispatch<SetToggleLogin>({
          type: ActionTypes.toggleLogin,
          payload: true
        })
      }
    ></div>
  );
};

export default Loading;
