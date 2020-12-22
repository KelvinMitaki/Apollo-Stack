import Layout from "../components/Layout";
import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Layout title="Home Page" />
      <div className={styles.header}>
        <div>Hello World</div>
      </div>
    </div>
  );
}
