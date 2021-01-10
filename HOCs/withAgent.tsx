import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import Router from "next/router";
import React from "react";
import { FETCH_CURRENT_USER } from "../graphql/queries/queries";

const withAgent = (WrappedComponent: NextPage) => {
  const HocComponent: NextPage = props => {
    const { data } = useQuery(FETCH_CURRENT_USER, {
      onError(err) {
        console.log("withauth", err);
      },
      fetchPolicy: "cache-only"
    });
    if (typeof window !== "undefined") {
      if (data.currentUser && data.currentUser.isAgent) {
        return <WrappedComponent {...props} />;
      }
      Router.replace("/");
      return <></>;
    }

    return null;
  };
  return HocComponent;
};

export default withAgent;
