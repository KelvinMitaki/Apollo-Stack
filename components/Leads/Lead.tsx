import React from "react";
import styles from "../../styles/leads.module.css";

interface Props {
  className?: string;
}

const Lead: React.FC<Props> = props => {
  return (
    <tr
      className={`${styles.table_body} ${props.className ? styles.active : ""}`}
    >
      <td>16/12/2020 21:16:33</td>
      <td className={styles.link}>91729871298747869817</td>
      <td>Ongata Rongai, Kajiado</td>
      <td>john doe</td>
      <td className={styles.email}>john@gmail.com</td>
      <td>0712345678</td>
      <td className={styles.message}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit
        libero earum similique nam consequatur ut. Aspernatur adipisci ullam
        officiis at optio sapiente tempora repellendus! Mollitia ex sunt eos
        velit.
      </td>
    </tr>
  );
};

export default Lead;
