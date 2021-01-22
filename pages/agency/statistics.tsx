import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import { FETCH_VIEWS_AND_LEADS_COUNT } from "../../graphql/queries/queries";
import styles from "../../styles/agencyStatistics.module.css";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const getMonth = (month: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - month);
  return months[d.getMonth()];
};
const statistics: NextPage = () => {
  const { data } = useQuery(FETCH_VIEWS_AND_LEADS_COUNT, {
    fetchPolicy: "cache-only"
  });
  const sixth = getMonth(6);
  const fifth = getMonth(5);
  const forth = getMonth(4);
  const third = getMonth(3);
  const second = getMonth(2);
  const first = getMonth(1);
  const current = getMonth(0);
  const genViews = (month: string) => {
    const d = (data.countViewsAndLeadsCount.views as {
      month: string;
      count: number;
    }[]).find(d => d.month === month);
    return d ? d.count.toLocaleString() : "-";
  };
  const genLeads = (month: string) => {
    const d = (data.countViewsAndLeadsCount.leads as {
      month: string;
      count: number;
    }[]).find(d => d.month === month);
    return d ? d.count.toLocaleString() : "-";
  };
  return (
    <Layout title="Agency Statistics">
      <div className={styles.container}>
        <table cellSpacing="0">
          <thead>
            <tr className={styles.active}>
              <th></th>
              <th>{getMonth(6)}</th>
              <th>{getMonth(5)}</th>
              <th>{getMonth(4)}</th>
              <th>{getMonth(3)}</th>
              <th>{getMonth(2)}</th>
              <th>{getMonth(1)}</th>
              <th>{getMonth(0)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.views}>Views</td>
              <td>{genViews(sixth)}</td>
              <td>{genViews(fifth)}</td>
              <td>{genViews(forth)}</td>
              <td>{genViews(third)}</td>
              <td>{genViews(second)}</td>
              <td>{genViews(first)}</td>
              <td>{genViews(current)}</td>
            </tr>
            <tr className={styles.active}>
              <td className={styles.leads}>Leads</td>
              <td>{genLeads(sixth)}</td>
              <td>{genLeads(fifth)}</td>
              <td>{genLeads(forth)}</td>
              <td>{genLeads(third)}</td>
              <td>{genLeads(second)}</td>
              <td>{genLeads(first)}</td>
              <td>{genLeads(current)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

statistics.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: FETCH_VIEWS_AND_LEADS_COUNT,
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
