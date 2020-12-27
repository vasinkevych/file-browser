import React from "react";
import { IconContext } from "react-icons";
import "./App.css";
import { FileBrowser } from "./app/file-browser/FileBrowser";
import { colors, baseGridSize } from "./constants/styles";

function App() {
  return (
    <div className="App">
      <IconContext.Provider
        value={{ color: colors.grey900, size: `${baseGridSize * 2.5}px` }}
      >
        <FileBrowser />
      </IconContext.Provider>
    </div>
  );
}

export default App;
