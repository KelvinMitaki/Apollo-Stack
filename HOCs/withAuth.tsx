import { useQuery } from "@apollo/client";
import React from "react";
import { FETCH_CURRENT_USER } from "../graphql/queries/queries";
import Router from "next/router";
import { NextPage } from "next";

const withAuth = (WrappedComponent: NextPage) => {
  const HocComponent: NextPage = (props: any): JSX.Element => {
    const { data } = useQuery(FETCH_CURRENT_USER, {
      onError(err) {
        console.log("withauth", err);
      }
    });
    if (typeof window !== "undefined") {
      if (data.currentUser) {
        return <WrappedComponent {...props} />;
      }
      Router.replace("/");
      return <></>;
    }
    return <></>;
  };
  return HocComponent;
};

export default withAuth;
