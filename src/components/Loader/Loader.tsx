import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return <div className={styles.spinner} role="status" />;
};

export default Loader;
