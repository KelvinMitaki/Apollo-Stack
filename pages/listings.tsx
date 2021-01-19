import { useLazyQuery, useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { initializeApollo } from "../apollo";
import HouseFilter from "../components/Homepage/Header/HouseFilter";
import Layout from "../components/Layout/Layout";
import Listing, { ListingProperty } from "../components/listings/Listing";
import MobileListing from "../components/listings/MobileListing";
import Loading from "../components/loading/Loading";
import Pagination from "../components/properties/Pagination";
import {
  AGENT_PROPERTY_COUNT,
  FETCH_AGENT_PROPERTIES
} from "../graphql/queries/queries";
import withAgent from "../HOCs/withAgent";
import styles from "../styles/listings.module.css";

const listings: NextPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [filter, setFilter] = useState<{
    [key: string]: string | number | boolean;
  }>({});
  const [selectedNum, setSelectedNum] = useState<number>(1);
  const scrollDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [limit, skip]);
  const { data, fetchMore, loading } = useQuery(FETCH_AGENT_PROPERTIES, {
    fetchPolicy: "cache-only",
    variables: { offset: skip, limit },
    notifyOnNetworkStatusChange: true,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  const countData = useQuery(AGENT_PROPERTY_COUNT, {
    fetchPolicy: "cache-only"
  });
  const [fetchAgentProperties, args] = useLazyQuery(FETCH_AGENT_PROPERTIES, {
    fetchPolicy: "network-only",
    variables: { offset: skip, limit, ...filter },
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  const [agentPropertyCount, args1] = useLazyQuery(AGENT_PROPERTY_COUNT, {
    fetchPolicy: "network-only",
    variables: filter,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });

  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = Math.ceil(
    args1.data
      ? args1.data.agentPropertiesCount.count / 10
      : countData.data.agentPropertiesCount.count / 10
  );
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
    <Layout title="Listings">
      {loading && <Loading />}
      <div className={styles.container}>
        <div ref={scrollDiv}></div>
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
          component="listings"
          setFilter={setFilter}
          fetchAgentProperties={fetchAgentProperties}
          agentPropertyCount={agentPropertyCount}
        />
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
              {(data.fetchAgentProperties as ListingProperty[])
                .filter((p, i, s) => s.findIndex(pr => pr._id === p._id) === i)
                .map((prop, i) => (
                  <Listing
                    key={prop._id}
                    {...prop}
                    className={`${i % 2 === 0 ? "active" : ""}`}
                  />
                ))}
            </tbody>
          </table>
          {(data.fetchAgentProperties as ListingProperty[])
            .filter((p, i, s) => s.findIndex(pr => pr._id === p._id) === i)
            .map(prop => (
              <MobileListing key={prop._id} {...prop} />
            ))}
        </div>
        <Pagination
          setLimit={setLimit}
          nums={nums}
          lastPage={lastPage}
          fetchMore={fetchMore}
          properties={data.fetchAgentProperties}
          selectedNum={selectedNum}
          setSelectedNum={setSelectedNum}
          setSkip={setSkip}
        />
      </div>
    </Layout>
  );
};

listings.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: FETCH_AGENT_PROPERTIES,
      variables: { offset: 0, limit: 10 },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    await apolloClient.query({
      query: AGENT_PROPERTY_COUNT,
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
