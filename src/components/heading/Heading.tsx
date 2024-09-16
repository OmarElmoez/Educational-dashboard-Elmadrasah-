import styles from "./heading.module.css";

const Heading = ({ text }: { text: string }) => {
  return <div className={styles.heading}>{text}</div>;
};

export default Heading;
