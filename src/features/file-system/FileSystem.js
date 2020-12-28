import React from "react";
import { File } from "./file/File";
import { Folder } from "./folder/Folder";
import { useDispatch } from "react-redux";
import { create, stopInline } from "../../features/file-system/fileSystemSlice";
import { InlineCreate } from "../../components/inline-create/InlineCreate";
import { INLINE_CREATE_ID } from "../../constants/app";
import { useFilters } from "../../hooks/useFilters";
import { selectItem } from "../side-menu/sideMenuSlice";

export function FileSystem({ structure, path }) {
  const [filterState] = useFilters();
  const dispatch = useDispatch();
  const showItem = (updated) => !filterState.date || updated > filterState.date;

  const renderItem = (item, index) => {
    const { type, nested, id, updated } = item;
    const nextLevelPath = path ? [path, index] : [index];

    switch (type) {
      case "folder":
        if (showItem(updated)) {
          return ((
            <Folder key={`${id}-folder`} folder={item}>
              <FileSystem
                key={`${id}-fs`}
                structure={nested}
                path={[...nextLevelPath, "nested"]}
              />
            </Folder>
          )
          );
        } else {
          dispatch(selectItem(null));
          return null;
        }

      case "file":
        if (showItem(updated) && !filterState.showFolderOnly) {
          return (
            <File key={id} file={item} />
          );
        } else {
          dispatch(selectItem(null));
          return null;
        }

      case INLINE_CREATE_ID:
        const onSave = (payload) => {
          dispatch(create(payload));
          dispatch(stopInline());
        };
        const onCancel = () => {
          dispatch(stopInline());
        };
        return (
          <InlineCreate
            key={id}
            onSave={onSave}
            onCancel={onCancel}
            item={item}
          />
        );

      default:
        return null;
    }
  };

  return <div>{structure.map(renderItem)}</div>;
}
