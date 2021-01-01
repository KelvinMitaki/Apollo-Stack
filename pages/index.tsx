import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import styles from "../styles/home.module.css";

const MyQuery = gql`
  query {
    users {
      _id
      fullName
      email
    }
  }
`;

const Home: React.FC = props => {
  const { data, loading } = useQuery(MyQuery);
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div className={`${styles.container}`}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: MyQuery });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  };
};

export default Home;
