import React from "react";
import { FetchedLead } from "../../pages/leads";
import styles from "../../styles/leads.module.css";
import { format } from "date-fns";
import Link from "next/link";
interface Props {
  className?: string;
  lead: FetchedLead;
}

const Lead: React.FC<Props> = props => {
  const formatPhoneNumber = (phoneNumber: number): string => {
    if (phoneNumber.toString().length === 8) {
      return `+2547${phoneNumber}`;
    }
    if (phoneNumber.toString().length === 9) {
      return `+254${phoneNumber}`;
    }
    return phoneNumber.toString();
  };
  const { lead } = props;
  return (
    <tr
      className={`${styles.table_body} ${props.className ? styles.active : ""}`}
    >
      <td style={{ textTransform: "none" }}>
        {format(new Date(lead.createdAt), "dd/MM/yyyy 'at' HH:mm")}
      </td>
      <td className={styles.link}>
        <Link href={`/property/${lead.property._id}`}>
          <a target="_blank">{lead.property._id}</a>
        </Link>
      </td>
      <td>{lead.property.streetAddress}</td>
      <td>{lead.fullName}</td>
      <td className={styles.email}>{lead.email}</td>
      <td>{formatPhoneNumber(parseInt(lead.phoneNumber))}</td>
      <td className={styles.message}>{lead.message}</td>
    </tr>
  );
};

export default Lead;
