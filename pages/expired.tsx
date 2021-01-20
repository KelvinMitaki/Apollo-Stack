import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { initializeApollo } from "../apollo";
import ExpiredListing from "../components/Expired/ExpiredListing";
import ExpiredMobileListing from "../components/Expired/ExpiredMobileListing";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import { ListingProperty } from "../components/listings/Listing";
import {
  EXPIRED_LISTINGS_COUNT,
  FETCH_EXPIRED_LISTINGS
} from "../graphql/queries/queries";
import withAgent from "../HOCs/withAgent";
import styles from "../styles/listings.module.css";

const expired: NextPage = () => {
  const [check, setCheck] = useState<boolean>(false);
  const [checkExpired, setCheckExpired] = useState<boolean>(false);
  const { data } = useQuery(FETCH_EXPIRED_LISTINGS, {
    fetchPolicy: "cache-only"
  });
  const countData = useQuery(EXPIRED_LISTINGS_COUNT, {
    fetchPolicy: "cache-only"
  });
  console.log(data);

  return (
    <Layout title="Expired Listings">
      <div className={styles.container}>
        <div className={styles.action_btns}>
          <button disabled={!checkExpired}>extend expiry date</button>
          <button disabled={!checkExpired}>mark as sold / rented</button>
          <button disabled={!checkExpired}>withdraw listings</button>
        </div>
        <HouseFilter
          bathrooms={[1, 2, 3, 4, 5]}
          bedrooms={[1, 2, 3, 4, 5]}
          categories={[
            { name: "apartment", subCats: true },
            { name: "house", subCats: true },
            { name: "townhouse", subCats: true },
            { name: "vacant land" },
            { name: "farm" },
            { name: "commercial" },
            { name: "industrial" }
          ]}
          alternate={false}
          btnContent="Search"
          width="100%"
          agent
          component="expired"
        />
        <div style={{ width: "100%" }}>
          <table className={styles.exp_table} cellSpacing="0">
            <thead>
              <tr className={styles.header}>
                <th>
                  <span className={styles.icon}>
                    <p
                      className={`${styles.BiCheck} ${
                        check ? styles.checked : ""
                      }`}
                      onClick={() => setCheck(ck => !ck)}
                    >
                      <FiCheck />
                    </p>
                  </span>
                </th>
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
                  <p>expiry date</p>
                </th>
                <th>
                  <p>modified</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {(data.fetchExpiredListings as ListingProperty[])
                .filter((l, i, s) => s.findIndex(pr => pr._id === l._id) === i)
                .map((prop, i) => (
                  <ExpiredListing
                    key={i}
                    className={`${i % 2 === 0 ? "active" : ""}`}
                    checked={check}
                    setCheckExpired={setCheckExpired}
                  />
                ))}
            </tbody>
          </table>
          {(data.fetchExpiredListings as ListingProperty[])
            .filter((l, i, s) => s.findIndex(pr => pr._id === l._id) === i)
            .map((prop, i) => (
              <ExpiredMobileListing key={i} />
            ))}
        </div>
      </div>
    </Layout>
  );
};
expired.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: FETCH_EXPIRED_LISTINGS,
      variables: { offset: 0, limit: 10 },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    await apolloClient.query({
      query: EXPIRED_LISTINGS_COUNT,
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
export default withAgent(expired);
