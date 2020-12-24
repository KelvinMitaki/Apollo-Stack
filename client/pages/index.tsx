import { useEffect, useRef, useState } from "react";
import Featured from "../components/Homepage/Featured/Featured";
import Footer from "../components/Homepage/Footer/Footer";
import Header from "../components/Homepage/Header/Header";
import Layout from "../components/Layout/Layout";
import { StylingContext } from "../Context/StylingContext";
import styles from "../styles/home.module.css";

export default function Home() {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleOutsideClick = (e: Event) => {
    // @ts-ignore
    if (toggleRef.current && !toggleRef.current.contains(e.target)) {
      setToggle(false);
    }
  };
  const setSidebarToggle = (tgl: boolean) => {
    setToggle(tgl);
  };
  return (
    <div className={styles.container}>
      <StylingContext.Provider
        value={{ toggle, setToggle: setSidebarToggle, toggleRef }}
      >
        <Layout title="Home Page">
          <Header />
          <Featured />
        </Layout>
      </StylingContext.Provider>
    </div>
  );
}
