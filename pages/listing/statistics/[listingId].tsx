import { NextPage } from "next";
import React from "react";
import { initializeApollo } from "../../../apollo";
import Layout from "../../../components/Layout/Layout";
import ContactFormMessages from "../../../components/listing/ContactFormMessages";
import SingleListingGraphs from "../../../components/listing/SingleListingGraphs";
import {
  PROPERTY_STATISTICS,
  PROPERTY_STATISTICS_MESSAGES,
  PROPERTY_STATISTICS_MESSAGES_COUNT
} from "../../../graphql/queries/queries";
import withAgent from "../../../HOCs/withAgent";
import styles from "../../../styles/singleListing.module.css";

interface Props {
  variables: { _id: string | string[] | undefined };
}

const singleListing: NextPage<Props> = props => {
  return (
    <Layout title="Lavington, Nairobi">
      <div className={styles.container}>
        <SingleListingGraphs variables={props.variables} />
        <ContactFormMessages />
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
    await apolloClient.query({
      query: PROPERTY_STATISTICS_MESSAGES,
      variables: { _id: ctx.query.listingId, offset: 0, limit: 10 },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    await apolloClient.query({
      query: PROPERTY_STATISTICS_MESSAGES_COUNT,
      variables: { _id: ctx.query.listingId },
      context: {
        headers: {
          cookie: ctx.req?.headers.cookie
        }
      }
    });
    return {
      initialApolloState: apolloClient.cache.extract(),
      variables: { _id: ctx.query.listingId, offset: 0, limit: 10 }
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
