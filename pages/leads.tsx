import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../apollo";
import Layout from "../components/Layout/Layout";
import Lead from "../components/Leads/Lead";
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
  const { data } = useQuery(FETCH_LEADS, {
    variables: { offset: 0, limit: 10 },
    fetchPolicy: "cache-only"
  });
  return (
    <Layout title="Leads">
      <div className={styles.container}>
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
