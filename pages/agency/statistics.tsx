import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useLayoutEffect, useState } from "react";
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
  const [num, setNum] = useState<number>(750);
  if (typeof window !== "undefined") {
    useLayoutEffect(() => {
      window.addEventListener("resize", resize);
      resize();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }, []);
  }
  const resize = () => {
    if (window.innerWidth < 768 && num !== window.innerWidth) {
      setNum(window.innerWidth);
    }
    if (window.innerWidth < 505 && num !== window.innerWidth) {
      setNum(window.innerWidth - 50);
    }
  };
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
    const d = (data.viewsAndLeadsCount.views as {
      month: string;
      count: number;
    }[]).find(d => d.month === month);
    return d ? d.count.toLocaleString() : "-";
  };
  const genLeads = (month: string) => {
    const d = (data.viewsAndLeadsCount.leads as {
      month: string;
      count: number;
    }[]).find(d => d.month === month);
    return d ? d.count.toLocaleString() : "-";
  };
  const sortMonths = (month: number, determinant: "leads" | "views") => {
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    const d = (data.viewsAndLeadsCount[determinant] as {
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
        <div className={styles.views_data}>
          <h4>Views</h4>
          <AreaChart
            width={num}
            height={250}
            data={[
              sortMonths(6, "views"),
              sortMonths(5, "views"),
              sortMonths(4, "views"),
              sortMonths(3, "views"),
              sortMonths(2, "views"),
              sortMonths(1, "views"),
              sortMonths(0, "views")
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
        </div>
        <div className={styles.leads_data}>
          <h4>Leads</h4>
          <BarChart
            width={num}
            height={250}
            data={[
              sortMonths(6, "leads"),
              sortMonths(5, "leads"),
              sortMonths(4, "leads"),
              sortMonths(3, "leads"),
              sortMonths(2, "leads"),
              sortMonths(1, "leads"),
              sortMonths(0, "leads")
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
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
