import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { INLINE_CREATE_ID } from "../../constants/app";
import {
  getFlatFs,
  getInlineCreate,
  startInline,
  deleteItem,
} from "../file-system/fileSystemSlice";
import { MenuItem } from "./menu-item/MenuItem";
import { startEdit, getSelectedItem, selectItem } from "./sideMenuSlice";
import styles from "./styles.module.css";

export function SideMenu() {
  const dispatch = useDispatch();
  const selectedId = useSelector(getSelectedItem);
  const inlineCreate = useSelector(getInlineCreate);
  const fs = useSelector(getFlatFs);
  const getParentId = () => {
    if (!selectedId) return "root";
    const selectItem = fs.find((el) => el.id === selectedId);
    return selectItem.type === "folder" ? selectedId : selectItem.parent;
  };

  const menuItems = [
    {
      title: "Create file",
      disabled: !!inlineCreate,
      onItemClick: () => {
        if (!inlineCreate) {
          dispatch(
            startInline({
              id: INLINE_CREATE_ID,
              type: INLINE_CREATE_ID,
              createdType: "file",
              parent: getParentId(),
            })
          );
        }
      },
    },
    {
      title: "Create folder",
      disabled: !!inlineCreate,
      onItemClick: (e) => {
        if (!inlineCreate) {
          dispatch(
            startInline({
              id: INLINE_CREATE_ID,
              type: INLINE_CREATE_ID,
              createdType: "folder",
              parent: getParentId(),
            })
          );
        }
      },
    },
    {
      title: "Rename",
      disabled: !inlineCreate && !selectedId,
      onItemClick: (e) => {
        if (!inlineCreate && selectedId) {
          dispatch(startEdit(selectedId));
        }
      },
    },
    {
      title: "Delete",
      disabled: !inlineCreate && !selectedId,
      onItemClick: (e) => {
        if (!inlineCreate && selectedId) {
          dispatch(deleteItem(selectedId));
          dispatch(selectItem(null));
        }
      },
    },
  ];
  return (
    <aside>
      <ul className={styles.menu}>
        {menuItems.map((el) => (
          <MenuItem
            key={el.title}
            title={el.title}
            onItemClick={el.onItemClick}
            disabled={el.disabled}
          />
        ))}
      </ul>
    </aside>
  );
}
