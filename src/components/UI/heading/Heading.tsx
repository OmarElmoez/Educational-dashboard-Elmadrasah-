import React from "react";
import styles from "./heading.module.css";

const Heading = ({
  text,
  style,
}: {
  text: string;
  style?: React.CSSProperties;
}) => {
  return (
    <h3 className={styles.heading} style={style}>
      {text}
    </h3>
  );
};

export default Heading;
