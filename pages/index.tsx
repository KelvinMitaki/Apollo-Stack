import { gql, useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo";
import Featured from "../components/Homepage/Featured/Featured";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import styles from "../styles/home.module.css";

const Home: React.FC = props => {
  console.log(props);
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
