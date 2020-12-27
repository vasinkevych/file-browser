import React from "react";
import styles from "./styles.module.css";

export const BreadcrumbItem = ({ item, onClick }) => {
  return (
    <span className={styles.bcItem} onClick={() => onClick(item.id)}>
      {item.name} {item.type === "folder" && <span>/</span>}
    </span>
  );
};
