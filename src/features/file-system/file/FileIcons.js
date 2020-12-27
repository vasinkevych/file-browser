import React from "react";
import { RiFilePdfLine, RiFileExcel2Line, RiFile2Line } from "react-icons/ri";
import { DiJavascript1, DiHtml5 } from "react-icons/di";
import { VscJson } from "react-icons/vsc";

export function FileIcon({ type }) {
  switch (type) {
    case "pdf":
      return <RiFilePdfLine />;
    case "excel":
      return <RiFileExcel2Line />;
    case "js":
      return <DiJavascript1 />;
    case "html":
      return <DiHtml5 />;
    case "json":
      return <VscJson />;
    default:
      return <RiFile2Line />;
  }
}
