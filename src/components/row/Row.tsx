import React from "react";
import styles from "./row.module.css";

const { row } = styles;

const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return <section className={row} style={style}>{children}</section>;
};

export default Row;
