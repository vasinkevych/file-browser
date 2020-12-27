import React from "react";
import { InlineCreate } from "../inline-create/InlineCreate";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "../../features/file-system/fileSystemSlice";
import { getSideMenu, stopEdit } from "../../features/side-menu/sideMenuSlice";

export const Editable = ({ children, item, isSelected }) => {
  const dispatch = useDispatch();
  const { edit, editedId } = useSelector(getSideMenu);
  const editable = edit && editedId === item.id;
  const onSave = (payload) => {
    dispatch(
      editItem({
        ...payload,
        id: item.id,
      })
    );
    dispatch(stopEdit());
  };

  const onCancel = () => {
    dispatch(stopEdit());
  };
  return (
    <React.Fragment>
      {editable && isSelected ? (
        <InlineCreate item={item} onSave={onSave} onCancel={onCancel} />
      ) : (
        children
      )}
    </React.Fragment>
  );
};
