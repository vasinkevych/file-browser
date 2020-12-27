import { configureStore } from "@reduxjs/toolkit";
import navigatorReducer from "../features/file-system/fileSystemSlice";
import sideMenuReducer from "../features/side-menu/sideMenuSlice";

export default configureStore({
  reducer: {
    navigator: navigatorReducer,
    sideMenu: sideMenuReducer,
  },
});
