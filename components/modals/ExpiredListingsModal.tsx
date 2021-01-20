import { useMutation } from "@apollo/client";
import { UPDATE_EXPIRED_LISTINGS } from "../../graphql/mutations/mutations";
import React, { useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import { ActionTypes } from "../../redux/types/types";
import styles from "../../styles/ExpiredListingsModal.module.css";
import {
  EXPIRED_LISTINGS_COUNT,
  FETCH_EXPIRED_LISTINGS
} from "../../graphql/queries/queries";
import Loading from "../loading/Loading";

interface Props {
  content: string;
  checkExpired: {
    _id: string;
    type: string;
  }[];
}

export interface ExpiredListingsModal {
  type: ActionTypes.expiredListingsModal;
  payload: "expiry" | "mark" | "withdraw" | null;
}

const ExpiredListingsModal: React.FC<Props> = props => {
  const expiredListingsModal = useSelector(
    (state: Redux) => state.styling.expiredListingsModal
  );
  const dispatch = useDispatch();
  const dialogDiv = useRef<HTMLDivElement>(null);
  const [updateExpiredListings, { loading }] = useMutation(
    UPDATE_EXPIRED_LISTINGS,
    {
      variables: {
        values: props.checkExpired,
        ...(expiredListingsModal === "expiry" && { expiryDate: true }),
        ...(expiredListingsModal === "mark" && { mark: true }),
        ...(expiredListingsModal === "withdraw" && { withdraw: true })
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: FETCH_EXPIRED_LISTINGS, variables: { offset: 0, limit: 10 } },
        { query: EXPIRED_LISTINGS_COUNT }
      ]
    }
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: Event) => {
    // @ts-ignore
    if (dialogDiv.current && !dialogDiv.current.contains(e.target)) {
      dispatch<ExpiredListingsModal>({
        type: ActionTypes.expiredListingsModal,
        payload: null
      });
    }
  };
  return (
    <div
      className={`${styles.parent} ${
        !expiredListingsModal ? styles.prt_hide : ""
      }`}
    >
      {loading && <Loading />}
      <div className={styles.container} ref={dialogDiv}>
        <div className={styles.header}>
          <p>confirmation dialog</p>
          <p>
            <MdCancel
              size="2rem"
              onClick={() =>
                dispatch<ExpiredListingsModal>({
                  type: ActionTypes.expiredListingsModal,
                  payload: null
                })
              }
            />
          </p>
        </div>
        <div className={styles.body}>
          <p>{props.content}</p>
        </div>
        <div className={styles.footer}>
          <button
            onClick={async () => {
              await updateExpiredListings();
              dispatch<ExpiredListingsModal>({
                type: ActionTypes.expiredListingsModal,
                payload: null
              });
            }}
          >
            confirm
          </button>
          <button
            onClick={() =>
              dispatch<ExpiredListingsModal>({
                type: ActionTypes.expiredListingsModal,
                payload: null
              })
            }
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiredListingsModal;
