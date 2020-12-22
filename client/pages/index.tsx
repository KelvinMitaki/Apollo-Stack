import Layout from "../components/Layout";
import { AiOutlineSearch } from "react-icons/ai";
import { BsHouseFill } from "react-icons/bs";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout title="Home Page" />
      <div className={styles.header}>
        <div className={styles.search}>
          <div className={styles.search_head}>
            <div>
              <AiOutlineSearch size="3rem" />
              <p>Find your home</p>
            </div>
            <div>
              <BsHouseFill size="3rem" />
              <p>House for sell</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
