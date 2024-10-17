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
    <div className={styles.heading} style={style}>
      {text}
    </div>
  );
};

export default Heading;
