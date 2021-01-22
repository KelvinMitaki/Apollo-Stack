import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../apollo";
import Layout from "../../components/Layout/Layout";
import { FETCH_VIEWS_AND_LEADS_COUNT } from "../../graphql/queries/queries";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  AreaChart,
  Area
} from "recharts";
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
  const sortMonths = (month: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    const d = (data.countViewsAndLeadsCount.leads as {
      month: string;
      count: number;
    }[]).find(d => d.month === months[date.getMonth()]);
    return d ? d : { month: months[date.getMonth()], count: 0 };
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
        <AreaChart
          width={730}
          height={250}
          data={[
            sortMonths(6),
            sortMonths(5),
            sortMonths(4),
            sortMonths(3),
            sortMonths(2),
            sortMonths(1),
            sortMonths(0)
          ]}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
        <BarChart
          width={730}
          height={250}
          data={[
            sortMonths(6),
            sortMonths(5),
            sortMonths(4),
            sortMonths(3),
            sortMonths(2),
            sortMonths(1),
            sortMonths(0)
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
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
