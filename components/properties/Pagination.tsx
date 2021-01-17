import React from "react";
import {
  ApolloQueryResult,
  DocumentNode,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  OperationVariables,
  TypedDocumentNode
} from "@apollo/client";
import styles from "../../styles/properties.module.css";
import { Properties } from "./Properties";

interface Props {
  fetchMore: (<K extends keyof OperationVariables>(
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, K, any> &
      FetchMoreOptions<any, OperationVariables>
  ) => Promise<ApolloQueryResult<any>>) &
    (<any2, OperationVariables2, K extends keyof OperationVariables2>(
      fetchMoreOptions: {
        query?: DocumentNode | TypedDocumentNode<any, OperationVariables>;
      } & FetchMoreQueryOptions<OperationVariables2, K, any> &
        FetchMoreOptions<any2, OperationVariables2>
    ) => Promise<ApolloQueryResult<any2>>);
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  selectedNum: number;
  properties: Properties[];
  setSelectedNum: React.Dispatch<React.SetStateAction<number>>;
  nums: number[];
  lastPage: number;
}

const Pagination: React.FC<Props> = props => {
  const { selectedNum, setSelectedNum, nums, lastPage } = props;
  return (
    <div className={styles.pagination}>
      {selectedNum > 3 && !nums.find(num => num === 1) && (
        <>
          <p
            className={selectedNum === 1 ? styles.active : ""}
            onClick={async () => {
              setSelectedNum(1);
              await props.fetchMore({
                variables: {
                  offset: 0,
                  limit: 10
                }
              });
              props.setLimit(10);
              props.setSkip(0);
            }}
          >
            1
          </p>
          <span>...</span>
        </>
      )}
      {nums
        .filter(n => n <= lastPage)
        .map(n => (
          <p
            className={selectedNum === n ? styles.active : ""}
            key={n}
            onClick={async () => {
              setSelectedNum(n);
              await props.fetchMore({
                variables: {
                  offset: (n - 1) * 10,
                  limit: 10
                }
              });
              props.setLimit(10);
              props.setSkip((n - 1) * 10);
            }}
          >
            {n}
          </p>
        ))}
      {selectedNum !== lastPage &&
        !nums.find(n => n === lastPage) &&
        lastPage !== 0 && (
          <>
            <span>...</span>{" "}
            <p
              className={selectedNum === lastPage ? styles.active : ""}
              onClick={async () => {
                setSelectedNum(lastPage);
                await props.fetchMore({
                  variables: {
                    offset: (lastPage - 1) * 10,
                    limit: 10
                  }
                });
                props.setLimit(10);
                props.setSkip((lastPage - 1) * 10);
              }}
            >
              {lastPage}
            </p>
          </>
        )}
    </div>
  );
};

export default Pagination;
