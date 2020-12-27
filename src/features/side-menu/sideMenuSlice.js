import { createSlice } from "@reduxjs/toolkit";

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState: {
    edit: false,
    selectedItem: null,
  },

  reducers: {
    startEdit: (state, action) => {
      state.edit = true;
      state.editedId = action.payload;
    },

    stopEdit: (state) => {
      state.edit = false;
      state.edit = false;
    },
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { stopEdit, startEdit, selectItem } = sideMenuSlice.actions;

export const getSelectedItem = (state) => state.sideMenu.selectedItem;
export const getSideMenu = (state) => state.sideMenu;

export default sideMenuSlice.reducer;
