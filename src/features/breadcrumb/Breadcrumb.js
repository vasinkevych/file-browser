import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAncestors } from "../file-system/fileSystemSlice";
import { getSelectedItem, selectItem } from "../side-menu/sideMenuSlice";
import { BreadcrumbItem } from "./breadcrumb-item/BreadcrumbItem";
import styles from "./styles.module.css";

export const Breadcrumb = () => {
  const dispatch = useDispatch();
  const selectedId = useSelector(getSelectedItem);
  const ancestors = useSelector(getAncestors(selectedId));

  const breadcrumbClickHandler = (id) => {
    dispatch(selectItem(id));
  };

  return (
    <div>
      {" "}
      <span className={styles.navItem}> Navigation: </span>
      {ancestors.map((el) => (
        <BreadcrumbItem item={el} onClick={breadcrumbClickHandler} />
      ))}
    </div>
  );
};
