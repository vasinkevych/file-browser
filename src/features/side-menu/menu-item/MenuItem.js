import React from "react";
import styles from "./styles.module.css";

export const MenuItem = ({ onItemClick, title, disabled }) => {
  const classes = disabled ? "disabled" : "menuItem";
  return (
    <li className={styles[classes]} onClick={onItemClick}>
      {title}
    </li>
  );
};
