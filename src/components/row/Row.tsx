import React from "react";
import styles from "./row.module.css";

const { row } = styles;

const Row = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className={row}>{children}</section>;
};

export default Row;
