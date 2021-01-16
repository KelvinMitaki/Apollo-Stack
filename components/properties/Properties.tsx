import {
  ApolloQueryResult,
  DocumentNode,
  FetchMoreOptions,
  FetchMoreQueryOptions,
  OperationVariables,
  TypedDocumentNode
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/properties.module.css";
import Pagination from "./Pagination";
import Property from "./Property";
export interface Properties {
  _id: string;
  images: string[];
  type: "sale" | "rent";
  price: number;
  streetAddress: string;
  location: string;
  description: string;
  plinthArea?: number;
  bedrooms: number;
  bathrooms: number;
  parkingLots?: number;
}
interface Props {
  properties: Properties[];
  count: number;
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
  scrollDiv: React.RefObject<HTMLDivElement>;
}
const Properties: React.FC<Props> = props => {
  const [selectedNum, setSelectedNum] = useState<number>(1);
  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = Math.ceil(props.count / 10);
  if (selectedNum > 3) {
    nums = [
      selectedNum - 2,
      selectedNum - 1,
      selectedNum,
      selectedNum + 1,
      selectedNum + 2
    ];
  }
  if (selectedNum === lastPage) {
    nums = [
      selectedNum - 5,
      selectedNum - 4,
      selectedNum - 3,
      selectedNum - 2,
      selectedNum - 1,
      selectedNum
    ];
  }
  if (nums.find(num => num < 1)) {
    nums = nums.filter(num => num > 0);
  }
  return (
    <div className={styles.properties_prt}>
      <div ref={props.scrollDiv}></div>
      <h3>Property</h3>
      <div className={styles.properties}>
        {props.properties.map(p => (
          <Property key={p._id} property={p} />
        ))}
      </div>
      <Pagination
        selectedNum={selectedNum}
        setSelectedNum={setSelectedNum}
        setSkip={props.setSkip}
        lastPage={lastPage}
        fetchMore={props.fetchMore}
        nums={nums}
        properties={props.properties}
        setLimit={props.setLimit}
      />
    </div>
  );
};

export default Properties;
