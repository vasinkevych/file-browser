import React, { useState } from "react";
import { RiFolder2Line, RiFolderOpenLine } from "react-icons/ri";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getSelectedItem, selectItem } from "../../side-menu/sideMenuSlice";
import { Editable } from "../../../components/editable/Editable";

const FolderIcon = ({ folderOpen }) =>
  folderOpen ? <RiFolderOpenLine /> : <RiFolder2Line />;

export function Folder({ folder, children }) {
  const { name, id } = folder;
  const selectedItem = useSelector(getSelectedItem);
  const isSelected = selectedItem === id;
  const dispatch = useDispatch();
  const [folderOpen, setFolderOpen] = useState(isSelected);
  const toggleFolder = (e) => {
    if (isSelected) {
      dispatch(selectItem(null));
    } else {
      dispatch(selectItem(id));
    }
    setFolderOpen(!isSelected);
  };

  return (
    <div className={styles.folder}>
      <Editable item={folder} isSelected={isSelected}>
        <div
          className={`${styles.name} ${isSelected ? styles.selected : ""}`}
          onClick={toggleFolder}
        >
          <FolderIcon folderOpen={folderOpen} />
          <span>{name}</span>
        </div>
      </Editable>
      {folderOpen && children}
    </div>
  );
}
