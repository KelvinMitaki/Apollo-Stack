import React from "react";
import styles from "../../styles/singleListing.module.css";

interface Props {
  active: boolean;
}

const SingleListingBody: React.FC<Props> = props => {
  return (
    <tr className={`${props.active ? styles.active : ""}`}>
      <td>16/12/2020 21:16:33</td>
      <td>john doe</td>
      <td>john@gmail.com</td>
      <td>0712345678</td>
      <td>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae modi
        laborum beatae accusantium laudantium veniam necessitatibus eaque odio
        et distinctio enim doloribus molestias, vero libero illo adipisci
        ratione tempora quasi?
      </td>
    </tr>
  );
};

export default SingleListingBody;
