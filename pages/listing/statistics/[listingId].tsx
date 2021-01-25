import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import React, { useState } from "react";
import { initializeApollo } from "../../../apollo";
import Layout from "../../../components/Layout/Layout";
import ContactFormMessages from "../../../components/listing/ContactFormMessages";
import SingleListingGraphs from "../../../components/listing/SingleListingGraphs";
import Loading from "../../../components/loading/Loading";
import Pagination from "../../../components/properties/Pagination";
import {
  PROPERTY_STATISTICS,
  PROPERTY_STATISTICS_MESSAGES,
  PROPERTY_STATISTICS_MESSAGES_COUNT
} from "../../../graphql/queries/queries";
import withAgent from "../../../HOCs/withAgent";
import styles from "../../../styles/singleListing.module.css";

interface Props {
  variables: { _id: string | string[] | undefined; offset: 0; limit: 10 };
}

const singleListing: NextPage<Props> = props => {
  const [limit, setLimit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [selectedNum, setSelectedNum] = useState<number>(1);
  const { data, fetchMore, loading } = useQuery(PROPERTY_STATISTICS_MESSAGES, {
    fetchPolicy: "cache-only",
    variables: { ...props.variables, offset: skip, limit },
    notifyOnNetworkStatusChange: true,
    onError(err) {
      console.log(err);
      console.log(err.graphQLErrors);
      console.log(err.message);
    }
  });
  const countData = useQuery(PROPERTY_STATISTICS_MESSAGES_COUNT, {
    fetchPolicy: "cache-only",
    variables: props.variables
  });
  let nums = [1, 2, 3, 4, 5, 6];
  const lastPage = Math.ceil(
    countData.data.propertyStatisticsMessagesCount.count / 10
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
    <Layout title="Listing Statistics">
      <div className={styles.container}>
        {loading && <Loading />}
        <SingleListingGraphs variables={props.variables} />
        <ContactFormMessages
          contactFormMessages={data.propertyStatisticsMessages}
        />
        <div className={styles.pagination}>
          <Pagination
            setLimit={setLimit}
            nums={nums}
            lastPage={lastPage}
            fetchMore={fetchMore}
            properties={data.propertyStatisticsMessages}
            selectedNum={selectedNum}
            setSelectedNum={setSelectedNum}
            setSkip={setSkip}
          />
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
      variables: { _id: ctx.query.listingId, offset: 0, limit: 10 }
    };
  }
};

export default withAgent(singleListing);
