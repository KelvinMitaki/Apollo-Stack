import { useQuery } from "@apollo/client";
import React, { useLayoutEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { PROPERTY_STATISTICS } from "../../graphql/queries/queries";
import styles from "../../styles/singleListing.module.css";

interface Props {
  variables: {
    _id: string | string[] | undefined;
  };
}

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
const SingleListingGraphs: React.FC<Props> = props => {
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
  const { data } = useQuery(PROPERTY_STATISTICS, {
    variables: props.variables,
    fetchPolicy: "cache-only"
  });
  const sortMonths = (month: number, determinant: "leads" | "views") => {
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    const d = (data.propertyStatistics[determinant] as {
      month: string;
      count: number;
    }[]).find(d => d.month === months[date.getMonth()]);
    return d ? d : { month: months[date.getMonth()], count: 0 };
  };
  return (
    <>
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
    </>
  );
};

export default SingleListingGraphs;
