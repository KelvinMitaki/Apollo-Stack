import { useLazyQuery, useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useState } from "react";
import { initializeApollo } from "../apollo";
import Layout from "../components/Layout/Layout";
import Lead from "../components/Leads/Lead";
import Loading from "../components/loading/Loading";
import Pagination from "../components/properties/Pagination";
import { FETCH_LEADS, FETCH_LEADS_COUNT } from "../graphql/queries/queries";
import withAgent from "../HOCs/withAgent";
import styles from "../styles/leads.module.css";

export interface FetchedLead {
  createdAt: string;
  property: {
    _id: string;
    streetAddress: string;
  };
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const leads: NextPage = () => {
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [selectedNum, setSelectedNum] = useState<number>(1);
  const { data, loading, fetchMore } = useQuery(FETCH_LEADS, {
    variables: { offset: skip, limit },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-only"
  });
  const countData = useQuery(FETCH_LEADS_COUNT, { fetchPolicy: "cache-only" });

  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = Math.ceil(countData.data.fetchLeadsCount.count / 10);
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
    <Layout title="Leads">
      <div className={styles.container}>
        {loading && <Loading />}
        <div className={styles.inner}>
          <table cellSpacing="0">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col style={{ width: "30%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <p>lead time</p>
                </th>
                <th>
                  <p>list no</p>
                </th>
                <th>
                  <p>address</p>
                </th>
                <th>
                  <p>contact person</p>
                </th>
                <th>
                  <p>email</p>
                </th>
                <th>
                  <p>phone number</p>
                </th>
                <th>
                  <p>message</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {(data.fetchLeads as FetchedLead[]).map((lead, i) => (
                <Lead
                  key={i}
                  className={`${i % 2 === 0 ? "active" : ""}`}
                  lead={lead}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            setLimit={setLimit}
            fetchMore={fetchMore}
            lastPage={lastPage}
            nums={nums}
            properties={data.fetchLeads}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            setSkip={setSkip}
          />
        </div>
      </div>
    </Layout>
  );
};

leads.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: FETCH_LEADS,
      variables: { offset: 0, limit: 10 },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    await apolloClient.query({
      query: FETCH_LEADS_COUNT,
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

export default withAgent(leads);
