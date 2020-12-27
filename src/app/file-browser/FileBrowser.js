import React from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { FileSystem } from "../../features/file-system/FileSystem";
import { SideMenu } from "../../features/side-menu/SideMenu";
import { getFs } from "../../features/file-system/fileSystemSlice";
import { ProvideFilters } from "../../hooks/useFilters";
import { Filters } from "../../features/filters/Filters";

export const FileBrowser = () => {
  const fs = useSelector(getFs);

  return (
    <ProvideFilters>
      <div className={styles.fileBrowser}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}></div>
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
