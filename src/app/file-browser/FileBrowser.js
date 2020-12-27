import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { FileSystem } from "../../features/file-system/FileSystem";
import { SideMenu } from "../../features/side-menu/SideMenu";
import { getFsTree } from "../../features/file-system/fileSystemSlice";
import { ProvideFilters } from "../../hooks/useFilters";
import { Filters } from "../../features/filters/Filters";
import { Breadcrumb } from "../../features/breadcrumb/Breadcrumb";

export const FileBrowser = () => {
  const fs = useSelector(getFsTree);

  return (
    <ProvideFilters>
      <div className={styles.fileBrowser}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Breadcrumb />
          </div>
          <div className={styles.filters}>
            <Filters />
          </div>
        </div>
        <div className={styles.sideMenu}>
          <SideMenu />
        </div>
        <div className={styles.mainSection}>
          <FileSystem structure={fs} />
        </div>
      </div>
    </ProvideFilters>
  );
};
