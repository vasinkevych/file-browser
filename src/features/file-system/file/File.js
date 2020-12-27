import React from "react";
import { FileIcon } from "./FileIcons";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, getSelectedItem } from "../../side-menu/sideMenuSlice";
import { Editable } from "../../../components/editable/Editable";

export function File({ file }) {
  const { id, name } = file;
  const selectedItem = useSelector(getSelectedItem);
  const dispatch = useDispatch();
  const isSelected = selectedItem === id;
  const toggleFile = (e) => {
    dispatch(selectItem(id));
  };

  const fileExt =
    name.substring(name.lastIndexOf(".") + 1, name.length) || name;

  return (
    <Editable item={file} isSelected={isSelected}>
      <div
        onClick={toggleFile}
        className={isSelected ? styles.selected : styles.file}
      >
        <FileIcon type={fileExt} />
        <span>{name}</span>
      </div>
    </Editable>
  );
}
