import { NextPage } from "next";
import { initializeApollo } from "../apollo";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import { FEATURED_PROPERTIES } from "../graphql/queries/queries";
import styles from "../styles/home.module.css";

const Home: NextPage = props => {
  return (
    <div className={`${styles.container}`}>
      <Layout title="Home Page">
        <Header />
        <Featured />
      </Layout>
    </div>
  );
};
Home.getInitialProps = async ctx => {
  const apolloClient = initializeApollo();
  await apolloClient.query({ query: FEATURED_PROPERTIES });
  return {
    initialApolloState: apolloClient.cache.extract()
  };
};
export default Home;
