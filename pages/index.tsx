import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import { FETCH_CURRENT_USER } from "../graphql/queries/queries";
import styles from "../styles/home.module.css";

const Home: React.FC = props => {
  // const { data } = useQuery(FETCH_CURRENT_USER, { fetchPolicy: "cache-only" });
  // console.log(data);
  return (
    <div className={`${styles.container}`}>
      <Layout title="Home Page">
        <Header />
        <Featured />
      </Layout>
    </div>
  );
};

export default Home;
