import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../../apollo";
import Layout from "../../../components/Layout/Layout";
import SingleListingBody from "../../../components/listing/SingleListingBody";
import { PROPERTY_STATISTICS } from "../../../graphql/queries/queries";
import withAgent from "../../../HOCs/withAgent";
import styles from "../../../styles/singleListing.module.css";

interface Props {
  variables: { _id: string | string[] | undefined };
}

const singleListing: NextPage<Props> = props => {
  const { data } = useQuery(PROPERTY_STATISTICS, {
    variables: props.variables,
    fetchPolicy: "cache-only"
  });
  console.log(data);
  console.log(props.variables);
  const messages = [];
  for (let i = 0; i < 10; i++) {
    messages.push(<SingleListingBody key={i} active={i % 2 === 0} />);
  }
  return (
    <Layout title="Lavington, Nairobi">
      <div className={styles.container}>
        <div>views graph</div>
        <div>leads graph</div>
        <div className={styles.prt}>
          <p>contact form messages</p>
          <table cellSpacing="0">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col width="30%" />
            </colgroup>
            <thead>
              <tr>
                <th>date</th>
                <th>name</th>
                <th>email address</th>
                <th>contact number</th>
                <th>message</th>
              </tr>
            </thead>
            <tbody>{messages}</tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

singleListing.getInitialProps = async ctx => {
  try {
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: PROPERTY_STATISTICS,
      variables: { _id: ctx.query.listingId },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    return {
      initialApolloState: apolloClient.cache.extract(),
      variables: { _id: ctx.query.listingId }
    };
  } catch (error) {
    console.log(error);
    if (ctx.res) {
      ctx.res.writeHead(301, { Location: "/" });
      ctx.res.end();
    }
    return {
      variables: { _id: ctx.query.listingId }
    };
  }
};

export default withAgent(singleListing);
