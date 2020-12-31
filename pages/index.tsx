import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import styles from "../styles/home.module.css";

const MyQuery = gql`
  query {
    users {
      email
      _id
      fullName
    }
  }
`;

export default function Home() {
  const { loading, data } = useQuery(MyQuery);
  if (loading) return <div>Loading...</div>;
  return (
    <div className={`${styles.container}`}>
      {/* <Layout title="Home Page">
        <Header />
        <Featured />
      </Layout> */}
      <pre style={{ fontSize: "2rem" }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: MyQuery });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
};
