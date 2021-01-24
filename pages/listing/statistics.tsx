import { useLazyQuery, useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import ListingStatisticsBody from "../../components/listing/ListingStatisticsBody";
import { ListingProperty } from "../../components/listings/Listing";
import {
  AGENT_PROPERTY_COUNT,
  FETCH_AGENT_PROPERTIES
} from "../../graphql/queries/queries";
import styles from "../../styles/listingStatistics.module.css";

const statistics: NextPage = () => {
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

  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = Math.ceil(countData.data.agentPropertiesCount.count / 10);
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
    <Layout title="Listing Statistics">
      <div className={styles.container}>
        <div className={styles.prt}>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>list no</th>
                <th>street address</th>
                <th>category</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {(data.fetchAgentProperties as ListingProperty[]).map(
                (pro, i) => (
                  <ListingStatisticsBody
                    property={pro}
                    key={pro._id}
                    className={i % 2 === 0}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

statistics.getInitialProps = async ctx => {
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

export default statistics;
