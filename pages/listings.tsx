import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../apollo";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing, { ListingProperty } from "../components/listings/Listing";
import MobileListing from "../components/listings/MobileListing";
import { FETCH_AGENT_PROPERTIES } from "../graphql/queries/queries";
import withAgent from "../HOCs/withAgent";
import styles from "../styles/listings.module.css";

const listings: NextPage = () => {
  const { data } = useQuery(FETCH_AGENT_PROPERTIES, {
    fetchPolicy: "cache-only"
  });
  return (
    <Layout title="Listings">
      <div className={styles.container}>
        <HouseFilter alternate={false} btnContent="Search" width="100%" agent />
        <div style={{ width: "100%", overflowX: "scroll" }}>
          <table className={styles.table} cellSpacing="0">
            <thead>
              <tr className={styles.header}>
                <th>
                  <p>reference</p>
                </th>
                <th>
                  <p>list no</p>
                </th>
                <th>
                  <p>thumbnail</p>
                </th>
                <th>
                  <p>category</p>
                </th>
                <th>
                  <p>address</p>
                </th>
                <th>
                  <p>price in ksh</p>
                </th>
                <th>
                  <p>bedrooms</p>
                </th>
                <th>
                  <p>bathrooms</p>
                </th>
                <th>
                  <p>type</p>
                </th>
                <th>
                  <p>status</p>
                </th>
                <th>
                  <p>modified</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {(data.fetchAgentProperties as ListingProperty[]).map(
                (prop, i) => (
                  <Listing
                    key={prop._id}
                    {...prop}
                    className={`${i % 2 === 0 ? "active" : ""}`}
                  />
                )
              )}
            </tbody>
          </table>
          {(data.fetchAgentProperties as ListingProperty[]).map(prop => (
            <MobileListing key={prop._id} {...prop} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

listings.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    const res = await apolloClient.query({
      query: FETCH_AGENT_PROPERTIES,
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    return {
      initialApolloState: apolloClient.cache.extract()
    };
  } catch (error) {
    if (ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }
  }
};

export default withAgent(listings);
